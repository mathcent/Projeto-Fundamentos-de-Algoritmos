import shelve
from datetime import datetime
def save_history(cc, value, tariff, operation):
    now =  datetime.now().strftime('%d/%m/%Y %H:%M:%S') #Formata a hora atual
    history = 'Data: %s  %s %.2f   Tarifa: %.2f  Saldo: %.2f' % (now, operation, value, tariff, cc['balance']) #Monta a string do histórico
    cc['history'].append(history) #Adiciona essa transação à lista de transações da conta.
    return cc
