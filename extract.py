import shelve
def extract():
    d = shelve.open('accounts')
    cpf = input('Digite o CPF sem pontos ou traços\n')
    account_types = ['', 'Salário', 'Comum', 'Plus']
    #O programa tentará prosseguir, considerando o CPF digitado.
    try:
        if d[cpf]['pw'] == input('Digite sua senha\n'): 
            print('\nNome: %s\nCPF: %s\nConta: %s\n' % (d[cpf]['name'], d[cpf]['cpf'], account_types[d[cpf]['type']]))
            for transaction in d[cpf]['history']:
                print(transaction)
            d.close()
        else:
            print('Senha inválida!')
            d.close()
            extract()
    #O progama entrará nessa exceção caso o CPF seja inválido, pois não encontrará a key correspondente dentro do objeto d
    except:
        print('CPF inválido!')
        d.close()
        extract()