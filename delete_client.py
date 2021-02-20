import shelve
def delete_client():
    d = shelve.open('accounts')
    cpf = input('Digite o seu CPF sem pontos e traços.\n')
    if cpf in d:
        del d[cpf]
        d.close()
        print('A conta foi finalizada com sucesso!\n')
    else:
        d.close()
        print('CPF inválido ou não cadastrado!\n')