import Produtcs from './produtos.js';

 // Cria uma nova instância da classe Produtos
 const prods = new Produtcs();

// Seleciona botão "inserir"
let addBtn = document.getElementById('add-btn');
// Adiciona evento no botão "inserir"
addBtn.addEventListener('click', () => prods.insertProduct());
// Seleciona botão "Limpar"
let resetBtn = document.getElementById('reset-btn');
// Adiciona evento no botão "Limpar"
resetBtn.addEventListener('click', () => prods.cleanList());
// Seleciona botão "Remover comprados" 
let rmvChecked = document.getElementById('rmv-checked');
// Adiciona evento no botão "Remover comprados"
rmvChecked.addEventListener('click', () => prods.removeChecked());
// Seleciona a div do modal
let modal = document.getElementById("myModal");
// Função que chama função para fechar modal
function windowClose(event) {
    if (event.target == modal) {
        prods.closeModal();
    };
}
// Fechar modal clicando na janela do navegador
window.addEventListener('click', windowClose);
// Seleciona botão de fechar modal
let span = document.getElementsByClassName("close")[0];
// Atribui função de fechar modal ao botão de fechar modal
span.addEventListener('click', () => prods.closeModal());
// Seleciona o input do produto
let prodInput = document.getElementById('prod-input');
// Atribui ao input a função de inserir produto com tecla ENTER 
prodInput.addEventListener('keyup', function(event) {
    if (event.key == 'Enter') {
        prods.insertProduct();
    }
})
// Seleciona o input de valor do produto
let inputValBtn = document.getElementById('prod-val');
// Atribui ao input a função de fechar o modal com tecla ENTER
inputValBtn.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        prods.closeModal()
    }
})
// Carrega localStorage ao recarregar página
prods.initialize();