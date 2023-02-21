let form = document.getElementById("novoItem") 
let lista = document.getElementById("lista")
let itens = JSON.parse(localStorage.getItem("itens")) || []   

itens.forEach( (element) => {    
    criaElemento(element)
} )     

form.addEventListener("submit", (event) => {   
    event.preventDefault()            

    let nome = event.target.elements['nome']
    let quantidade = event.target.elements['quantidade']

    let existe = itens.find(element => element.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }    

    if(existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual);

        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = "";
    quantidade.value = "";
    nome.focus();
})

function criaElemento(item) {  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = parseInt(item.quantidade);
}

function botaoDeleta(id) {
    let elementoBotao = document.createElement("button");
    elementoBotao.classList.add("apagar");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();
    
    itens.splice(itens.findIndex(element => element.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}