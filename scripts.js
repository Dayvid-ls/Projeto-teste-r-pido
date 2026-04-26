const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []


function adicionarNovaTarefa() {
     const textoDigitado = input.value.trim()

    if (textoDigitado === '') {

        input.classList.add('erro')
        setTimeout(() => {
            input.classList.remove('erro')
        }, 2000)
        return
    }

    input.classList.remove('erro')

    minhaListaDeItens.push({
        tarefa: textoDigitado,
        concluida: false
    })

    input.value = ''
    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = ''


    minhaListaDeItens.forEach((item, posicao) => {
             novaLi = novaLi + `

             <li class="task ${item.concluida ? 'done' : ''}">
                <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="tarefa-para-lixo" onclick="deletarItem(${posicao})">
            </li>` 
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1)

        mostrarTarefas()
    }

function recarregarTarefas(){
        const tarefasDoLocalStorage = localStorage.getItem('lista')
       if (tarefasDoLocalStorage){
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

        mostrarTarefas()
    }
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa()
    }
})

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)