import shelve
from history import save_history #função que salva o histórico das transações
def deposit():
    d = shelve.open('accounts')
    cpf = input('Digite o CPF sem pontos ou traços\n')
    #O programa tentará prosseguir, considerando o CPF digitado.
    try:
        cc = d[cpf]
        value = tryDeposit()
        cc['balance'] += value
        #Chama a função de salvar o histórico da transação
        cc = save_history(cc, value, 0, '+')
        #Atualiza o cliente no shelve
        d[cpf] = cc
        print('Valor depositado com sucesso!\n')
        d.close()
    #O progama entrará nessa exceção caso o CPF seja inválido, pois não encontrará a key correspondente dentro do objeto d
    except:
        print('CPF inválido!\n')
        d.close()
        deposit()


def tryDeposit():
    value = int(input('Digite o valor a ser depositado\n'))
    if value < 0:
        print('Valores negativos não são permitidos')
        return tryDeposit()

    return value