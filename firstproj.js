import Produtcs from './produtos.js';

 // Cria uma nova instância da classe Produtos
 const prods = new Produtcs();

let addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => prods.insertProduct());

let resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => prods.cleanList());

prods.initialize()
