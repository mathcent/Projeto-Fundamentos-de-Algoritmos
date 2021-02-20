from tkinter import *
from tkinter import Menu
from tkinter import messagebox

janela = Tk()
janela.title("Cronometro de Pomodoro")
janela.geometry('500x300')

tarefa=[]
x=0
s=25
m=0
con=0
def vai():
    global s
    global m
    global new_item
    global con
    s+=-1
    seg['text']=s
    mim['text']=m
    self_job=janela.after(1000, vai)
    if s==0 and m!=0:
        s=60
        m=m-1
        mim['text']=m
    elif s==0 and m==0 or con==2:
        if self_job is not None:
            janela.after_cancel(self_job)
            self_job=None
            con=1
            
        if s==0 and m==0:
            s=10
            m=0
            show()
            resposta=entrada.get()
            tarefa.append("RESPOSTA:")
            tarefa.append(resposta)
            tarefa.append("\n")
            print(tarefa)
        
        
def show():
    res=messagebox.showinfo('Aviso','O tempo acabou!')
        
    
def para():
    global con
    con=2
    
    
    

menu= Menu(janela)

tx = Label(janela, text="Tarefa:",font=("Arial Bold",25))
tx.place(x=250,y=50,anchor=CENTER)

mim= Label(janela, text="25",font=("Arial Bold",40))
seg= Label(janela, text="00",font=("Arial Bold",40))
ponto= Label(janela, text=":",font=("Arial Bold",40))

mim.place(x=200,y=200,anchor=CENTER)
seg.place(x=290,y=200,anchor=CENTER)
ponto.place(x=250,y=200,anchor=CENTER)

inicio= Button(janela , text="Iniciar",command=vai)
pausa = Button(janela , text="Pausa",command=para)

inicio.place(x=250,y=150,anchor=CENTER)
pausa.place(x=250,y=250,anchor=CENTER)

entrada= Entry(janela,width=25,font=("Arial Bold",20))
entrada.place(x=250,y=100,anchor=CENTER)

def click():
    janela = Tk()
    janela.title("Tarefas")
    janela.geometry('500x300')
    tx = Label(janela, text="",font=("Arial Bold",25))
    tx.place(x=250,y=150,anchor=CENTER)
    x=0
    tx['text']=tarefa
    
    
     

    
new_item = Menu(menu)
new_item = Menu(menu , tearoff=0)
menu.add_cascade(label='Tarefas Completas',menu=new_item)

new_item.add_command(label="tarefas",command=click)
janela.config(menu=menu)
janela.mainloop()