export default class Produtcs {
    constructor() {
        this.id = 1;
        this.arrProd = [];
        this.total = 0;
    }
    // Retorna o produto digitado,
    // ou falso se nada foi digitado
    read() {
        let prodInput = document.getElementById('prod-input');
        // input do usuário 
        let info = prodInput.value;
        if (this.validate(info)) {
            return info;
        };
        return false
    }
    // Retorna true se houver algo no input
    validate(input) {
        if (input) {
            return true
        };
    }
    // Insere o produto em this.arrProd,
    // imprime no navegador
    insertProduct() {
        // O produto digitado
        let prod = this.read();
        // Se houver um input válido
        if (prod) {
            // Insere objeto em this.arrProd
            this.arrProd.push({
                nome: prod, 
                id: this.id, 
                status: false,
                price: 0
            });
            // Cria elementos da tabela e Imprime no navegador
            this.insertList() 
            let prodInput = document.getElementById('prod-input');
            // Limpa o input
            prodInput.value = '';
            this.id += 1;
        };
    }
    // Cria elementos da tabela,
    // insere produtos e imprime no navegador
    insertList() {
        // Corpo da tabela
        let tbody = document.getElementById('t-corpo');
        tbody.innerHTML ='';
        // Imprime uma linha para cada produto:
        // checkbox; nome do produto; img deletar
        this.arrProd.forEach(item => {
            // Cria 1 linha com 3 células
            let tr = tbody.insertRow();
            let tr_select = tr.insertCell();
            let tr_prod = tr.insertCell();
            let tr_action = tr.insertCell();
            
            // Cria um input type=checkbox,
            // atribui mesmo id do produto,
            // insere na primeira coluna
            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('class', 'check');
            // O nome check-id serve para diferenciar do id da img,
            // na função deletar(id)
            checkBox.setAttribute('id', `check-${item.id}`); 
            tr_select.appendChild(checkBox);
            checkBox.checked = item.status;
            checkBox.onchange = () => this.insertValue(item.id);
            
            // Imprime nome do produto na segunda coluna
            tr_prod.innerText = item.nome; 
            
            // Cria um elemento imagem com mesmo id do produto,
            // atribui função deletar a prop. onclick
            let imgElement = document.createElement('img'); 
            imgElement.setAttribute('class', 'del-btn');
            imgElement.setAttribute('id', `${item.id}`);
            imgElement.src = './deleteicon.png'
            imgElement.onclick = () => this.delete(item.id);
            // Insere a imagem na terceira coluna
            tr_action.appendChild(imgElement);
            });
        this.saveJSON();
        let total = this.arrProd.reduce((acc, item) => acc + item.price, 0)
        this.writeTotal(total);
    }
     // Deleta o elemento selecionado
    delete(id) {
        this.id = 1;
        // Define novo array com os produtos não selecionados
        this.total -= this.arrProd.filter(item => item.id == id)[0].price;
        let novoArr = this.arrProd.filter(item => item.id !== id);
        this.arrProd = novoArr;
        // Redefine os id's dos produtos que restaram: 1, 2, 3,...
        this.arrProd.forEach(item => {
            item.id = this.id;
            this.id += 1;
        });
        //this.writeTotal(this.total);
        this.insertList();
        //console.log(this.arrProd)
    }
    // Deleta todos os item de uma vez,
    // redefine status incial
    cleanList() {
        this.id = 1;
        this.total= 0;
        this.arrProd = [];
        let tbody = document.getElementById('t-corpo');
        tbody.innerHTML ='';
        this.writeTotal(this.total);
    }
    // Pede o preço quando checkbox está checked;
    // redefine preço e status quando unchecked
    insertValue(id) {
        let checkBox = document.getElementById(`check-${id}`);
        // Seleciona o elemento por id,
        this.arrProd.forEach(item => {
            if (item.id == id) {
                // Se a checkbox foi checada,
                // pede para usuário digitar o valor do item
                if (checkBox.checked) {
                    let price = 0;
                    let value
                    // Enquanto não for um número no formato "000.00",
                    // pede ao usuário que digite o valor
                    while (isNaN(price) || price === 0) {
                        value = prompt('Valor:(\n . = sperador decimal)');
                        price = Number(value);
                        item.status = checkBox.checked;
                        // Se o usuário cancelar o prompt...
                        if (value == null) {
                            item.status = false;
                            price = 0;
                            //this.insertList();
                            break; 
                        };
                    };
                    item.price = price;
                    this.insertList()
                    // this.total += item.price;
                    // this.writeTotal(this.total);
                    this.saveJSON()
                } // Se a checkbox foi deschecada...
                else {
                    this.total -= item.price;
                    item.price = 0;
                    item.status = false;
                    this.insertList();
                    //this.writeTotal(this.total);
                    this.saveJSON();
                };
            };
        });
    }
    // Imprime o valor total da compra no navegador,
    // no formato moeda brasileira
    writeTotal(total) {
        let par = document.getElementById('price-par');
        par.innerHTML = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }
    //Salva no localStorage
    saveJSON() {
        let list = this.arrProd.filter(item => item.price != 0);
        localStorage.setItem('lastSale', JSON.stringify(list))
    }
    initialize() {
        
        let lastList = localStorage.getItem('lastSale');
        if (lastList !== null) {
            this.arrProd = JSON.parse(lastList);
            this.insertList();
        }
    }
}