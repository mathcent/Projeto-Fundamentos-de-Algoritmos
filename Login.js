function login() {
var nome = document.getElementById("nome").value;
var senha = document.getElementById("senha").value;
if (nome == "bacon" && senha == "cafe") {
  alert("Login realizado com sucesso, acesse a página 2 para ler as instruçoes do jogo");
  window.location="Pag2.html"
}
else { 
  alert("Login inválido");
}
}

