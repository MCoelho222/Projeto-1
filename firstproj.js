import Produtos from './produtos.js';

 // Cria uma nova instância da classe Produtos
 const prods = new Produtos();

// function addProd() {
//     return prods.insereProduto();
     // Seleciona o botão deadicionar produto
     // Insere função no botão adicionar
//};
let addBtn = document.getElementById('add-prod');
addBtn.addEventListener('click', () => prods.insereProduto());

//let resetBtn = document.getElementById('reset-btn'); // Seleciona o botão de resetar lista

//console.log(typeof('jfjnv'))