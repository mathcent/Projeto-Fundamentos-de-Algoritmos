//variáveis do jogo
var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 3, velocidade = 3, estadoAtual, record, img,

estados = {
  jogar: 0,
  jogando: 1,
  perdeu: 2
},
//detirmanando a cor e formato do chao
chao = {
  y: 550,
  altura: 50,
  cor: "#006400",
  //funçao para que o chão mantenha esses atributos
  desenha: function () {
    ctx.fillStyle = this.cor;
    ctx.fillRect(0, this.y, LARGURA, this.altura);
  }
},

bloco = {
  //determinando a cor e altura do bloco que sera usado para o jogo
  x: 50,
  y: 0,
  altura: 50,
  largura: 50,
  cor: "#d8b98c",
  //determinando o movimento do bloco
  gravidade: 1,
  velocidade: 0,
  forcaDoPulo: 20,
  qntPulos: 0,
  //iniciar contador de pontos
  score: 0,
  //funçao responsavel por fazer o bloco ter gravidade
  atualiza: function () {
    this.velocidade += this.gravidade;
    this.y += this.velocidade;
    //função 'if' para impedir que o bloco passe do chão
    if (this.y > chao.y - this.altura) {
      this.y = chao.y - this.altura;
      this.qntPulos = 0;
    }
  },
  //função para recomeçar o jogo e atulizar o score
  reset: function() {
    this.velocidade=0;
    this.y=0;
    //aqui é dado um valor para o recorde , caso o score atual for maior
    if (this.score > record){
      localStorage.setItem("record", this.score);
      record = this.score;
    }
    //o score é resetado para que se inicie outro jogo
    this.score=0;
  },
  //função que permite o bloco pular , com um limite
  pula: function() {
    if (this.qntPulos < maxPulos) {
      this.velocidade = -this.forcaDoPulo;
      this.qntPulos++;
    }
  },
  //função responsavel para desenhar o bloco
  desenha: function () {
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);
  }
},
//função geradora de obstaculos
obstaculos = {
  //os obstaculos são criados com 5 opções de cores
  _obs: [],
  cores: ["#FF00FF", "#800080", "#4B0082\t", "#8A2BE2", "#7B68EE"],
  tempoInsere: 0,
  //essa função cria obstaculos de tamanhos aleatorios em tempos aleatorios
  insere: function () {
    this._obs.push({
      x: LARGURA,
      //porem a largura sempre sera a mesma
      largura: 50,
      altura: 30 + Math.floor(120 * Math.random()),
      cor: this.cores[Math.floor(5 * Math.random())]
    });
    //aqui é definida a velocidade dos obstaculos
    this.tempoInsere = 90 + Math.floor(21 * Math.random());
  },
  //funçao para colocar os obstaculos na tela
  atualiza: function() {
    //quando o tempoInsere for 0 sera chamado outro obstaculo
    if (this.tempoInsere == 0)
      this.insere();
    //caso não seja 0 , ele ira decrecer ate se tornar 0 onde surgira um novo obstaculo
    else
      this.tempoInsere--;

    //'for' que fara os obstaculos irem da direita para esquerda
    for (var i = 0, tam = this._obs.length; i < tam; i++) {
      var obs = this._obs[i];

      obs.x -= velocidade;

      //caso o obstaculo encoste no bloco o estadoAtual mudara para 'perdeu' e sera levado a tela de record
      if (bloco.x < obs.x + obs.largura && bloco.x + bloco.largura >= obs.x && bloco.y + bloco.altura >= chao.y - obs.altura) {
        estadoAtual = estados.perdeu;
      }
      //sempre que um obstaculo passar pelo bloco o score aumentara em 1
      else if (obs.x == 0) {
        bloco.score++;
      }
      //casa o obstaculo chegue no fim do canvas , ele é removido
      else if (obs.x <= -obs.largura) {
        this._obs.splice(i, 1);
        tam--;
        i--;
      }
    }
  },

  limpa: function() {
    this._obs = [];
  },
  //cria blocos
  desenha: function() {
    for (var i = 0, tam = this._obs.length; i < tam; i++) {
      var obs = this._obs[i];
      ctx.fillStyle = obs.cor;
      ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
    }
  }
};
//funçao para determinar quando o jogador clicou na tela
function clique(event) {
if (estadoAtual == estados.jogando)
  bloco.pula();


//para iniciar o jogo devera ser clicado no botao preto 'Clique Aqui !'
else if (estadoAtual == estados.jogar) {
  estadoAtual = estados.jogando;
}
//quando perder o jogo exibira o score e o record atual , e tambem retirara tudo da tela
else if (estadoAtual == estados.perdeu) {
  estadoAtual = estados.jogar;
  obstaculos.limpa();
  bloco.reset()

}
}
//onde o jogo ira ficar em looping até que seja comitido um erro
function main() {
//para saber a altura e a largura da janela do usuario
ALTURA = window.innerHeight;
LARGURA = window.innerWidth;
//caso a janela seja muito pequena sera estabelecido um limite
if (LARGURA >= 500) {
  LARGURA = 600;
  ALTURA = 600;
}
//o canvans sera criado baseado na altura do usuario ou no limite estabelecido
canvas = document.createElement("canvas");
canvas.width = LARGURA;
canvas.height = ALTURA;
//e tambem é colocado uma borda preta para facilitar a vizualizaçao
canvas.style.border = "1px solid #000";
//definimos a dimenção do canvas
ctx = canvas.getContext("2d");
//inserindo o canvans no 'body'
document.body.appendChild(canvas);
//para que sempre que o mouse for clicado sera chamada a funçao 'clique'
document.addEventListener("mousedown", clique);
//define que o jogo esta na tela de inicio
estadoAtual = estados.jogar;
//pega o valor do record , caso ele exista
record = localStorage.getItem("record");
//se não existir , valera 0
if (record == null){
  record = 0;
}
//a funçao roda é chamada para manter o jogo em looping
roda();
}
//onde o jogo ira ficar em looping até que seja comitido um erro
function roda() {
atualiza();
desenha();
//para manter o looping chamamos a propria funçao
window.requestAnimationFrame(roda);
}
//atualiza o status dos blocos
function atualiza() {
frames++;

bloco.atualiza();
//caso o jogador não tenha cometido nenhum erro o jogo ira chamar novos obstaculos
if (estadoAtual == estados.jogando)
  obstaculos.atualiza();

}
//funçao que desenha os blocos , chao e o personagem
function desenha() {
//para prencher_todo o canvans com desenhos
ctx.fillStyle = "#00008B";
ctx.fillRect(0, 0, LARGURA, ALTURA);
//definições da escrita utilizada no jogo
ctx.fillStyle = "#fff";
ctx.font = "50px Arial";
ctx.fillText(bloco.score, 30, 68);
//'if' para caso o jogo não tenha começado , onde sera mostrado o botão 'Clique Aqui! '
//porem não é necessario clicar no botão , basta clicar em qualquer area do canvas
if (estadoAtual == estados.jogar) {
  ctx.fillStyle = "black";
  ctx.fillRect(LARGURA / 2 -150, ALTURA / 2 - 50, 300, 100);
  ctx.fillStyle = "#fff";
  ctx.fillText("Clique Aqui !", 155, 310);


}
//caso o jogador ja tenho cometido um erro , aparecera um botao em vermelho com o seu score
else if (estadoAtual == estados.perdeu) {
  ctx.fillStyle = "red";
  ctx.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);

  //movendo o valor do record para o quadrado de derrota
  ctx.save();
  ctx.translate(LARGURA/2 , ALTURA/2);
  ctx.fillStyle = "#fff";
  //caso o score atual for maior que o record , sera exibida a mensagem "Novo Record!"
  if (bloco.score > record)
    ctx.fillText("Novo Record!", -150,-65);
  //dependendo da quantidade de digitos sera neccessario um espaçamento diferente
  //caso o record tenha 1 digito
  else if (record < 10)
    ctx.fillText("Record " + record, -99, -65);

  //caso o recorde tenha 2 digitos
  else if (record >= 10 && record < 100)
    ctx.fillText("Record " + record, -112,-65);
  //caso o record tenha 3 ou mais digitos
  else
    ctx.fillText("Record " + record, -125, 65);
  //caso o record tenha 1 digito
  if (bloco.score < 10)

    ctx.fillText(bloco.score, -13, 19);
  //caso o record tenha 2 digitos
  else if (bloco.score >= 10 && bloco.score < 100)
    ctx.fillText(bloco.score, -26, 19 );
  //caso o record tenha 3 ou mais digitos
  else
    ctx.fillText(bloco.score, -39, 19);


  ctx.restore();

}
//enquanto o jogador não cometa nenhum erro sera reiniciado este 'if'
else if (estadoAtual == estados.jogando)
  obstaculos.desenha();
//por fim , é chamado o 'chao' e o 'bloco' para comporem o jogo
chao.desenha();
bloco.desenha();

}


//inicializa o jogo chamando a funçao principal
main();