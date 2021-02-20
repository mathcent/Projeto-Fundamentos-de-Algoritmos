import shelve
from history import save_history #função que salva o histórico das transações
def new_client():
    client = {} #Cria o objeto da conta
    client['cpf'] = input('Digite o seu CPF sem pontos e traços.\n')
    #Esse if valida o CPF através de uma função
    if isRegistered(client['cpf']):
        print('CPF já cadastrado!')
        return
    
    client['name'] = input('Digite o seu nome completo, por favor.\n')
    client['type'] = selectAccountType()
    client['balance'] = int(input('Digite o valor inicial da sua conta, sem pontos ou vírgulas.\n'))
    client['pw'] = validatePw()
    client['history'] = []
    
    #Esta linha é usada para salvar o histórico da primeira transação da conta
    client = save_history(client, client['balance'], 0, '+')
    d = shelve.open('accounts')
    #Cria a conta dentro do shelve, utilizando o CPF como key
    d[client['cpf']] = client
    print('Conta cadastrada com sucesso!\n')
    d.close() #Fecha o shelve

#Essa função valida o tamanho mínimo da senha
def validatePw():
    pw = input('Digite uma senha (No mínimo 4 caracteres).\n')
    if len(pw) < 3:
        input('A senha deve conter no mínimo 4 caracteres\n')
        validatePw()
    else:
        return pw

#Função para selecionar o tipo de aconta.
def selectAccountType():
    type = int(input('Selecione o tipo de conta:\n\n1 - Salário (Taxa de débito é 5% sobre o valor | Não possui cheque especial\n2 - Comum (Taxa de débito é 3% sobre o valor | Cheque especial de até R$500\n3 - Plus (Taxa de débito de 1% sobre o valor | Cheque especial de até R$5000\n'))
    if isValidAccountType(type):
        return type
    else:
        print("Opção Inválida\n")
        selectAccountType()

#Essa função verifica no shelve se já existe o CPF digitado
def isRegistered(cpf):
    d = shelve.open('accounts')
    if cpf in d:
        d.close()
        return True
    else:
        d.close()
        return False

#Valida a opção de conta escolhida
def isValidAccountType(type):
    if type > 3 or type < 1:
        return False
    else:
        return True