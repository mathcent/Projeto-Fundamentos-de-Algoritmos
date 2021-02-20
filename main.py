#Instanciando as funções do programa
from new_client import  new_client
from delete_client import  delete_client
from debit import debit
from deposit import deposit
from balance import balance
from extract import extract

#Função de menu
def show_menu():
    selected_option = int(input('Selecione uma opção:\n\n1 - Novo Cliente\n2 - Apagar Cliente\n3 - Debitar\n4 - Depositar\n5 - Saldo\n6 - Extrato\n0 - Sair\n'))
    if selected_option == 0:
        print('Sessão encerrada!\n')
        return False
    if selected_option == 1:
        new_client()
    if selected_option == 2:
        delete_client()
    if selected_option == 3:
        debit()
    if selected_option == 4:
        deposit()
    if selected_option == 5:
        balance()
    if selected_option == 6:
        extract()

#O programa ficará rodando enquanto o usuário não selecionar a opção 0
while True:
    show_menu()