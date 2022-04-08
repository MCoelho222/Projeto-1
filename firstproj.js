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
// Carrega localStorage ao recarregar página
prods.initialize();
