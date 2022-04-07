export default class Produtcs {
    constructor() {
        this.id = 1;
        this.arrProd = []; // Lista de produtos
    }
    // Retorna o produto digitado,
    // ou falso se input vazio
    read() {
        let prodInput = document.getElementById('prod-input');
        let info = prodInput.value;
        if (this.validate(info)) {
            return info;
        };
        return false
    }
    // Retorna true se input não-vazio
    validate(input) {
        if (input) {
            return true
        };
    }
    // Insere o produto na lista de produtos,
    // imprime no navegador
    insertProduct() {
        let prod = this.read();
        // Se input não-vazio...
        if (prod) {
            let arrLength = this.arrProd.length;
            this.arrProd.push({
                nome: prod, 
                id: arrLength + 1,
                status: false,
                price: 0
            });
            this.insertList()
            let prodInput = document.getElementById('prod-input');
            prodInput.value = '';
        };
    }
    // Cria elementos da tabela,
    // insere produtos e imprime no navegador
    insertList() {
        // Seleciona corpo da tabela
        let tbody = document.getElementById('t-corpo');
        tbody.innerHTML ='';
        // Imprime uma linha para cada produto,
        // checkbox | nome do produto |img deletar
        this.arrProd.forEach(item => {
            // Cria 1 linha com 3 células
            let tr = tbody.insertRow();
            tr.style.rowHeight
            let tr_select = tr.insertCell();
            tr_select.style.width = '30px';
            let tr_prod = tr.insertCell();
            tr_prod.style.minWidth = '80px';
            let tr_action = tr.insertCell();
            tr_action.style.width = '10px';
            tr_action.style.textAlign = 'center';
            // Cria um input type=checkbox,
            // atribui mesmo id do produto,
            // insere na primeira coluna
            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('class', 'check');
            // O nome 'check-id' serve para diferenciar do id da img,
            // na função deletar(id)
            checkBox.setAttribute('id', `check-${item.id}`); 
            tr_select.appendChild(checkBox);
            checkBox.checked = item.status;
            checkBox.onchange = () => this.insertValue(item.id);
            tr_prod.innerText = item.nome; 
            // Cria um elemento imagem com mesmo id do produto,
            // atribui função deletar a prop. onclick
            let delElement = document.createElement('p');
            delElement.style.border = '1px solid #FFFFFF'
            delElement.setAttribute('class', 'del-btn');
            delElement.setAttribute('id', `${item.id}`);
            delElement.innerHTML = 'x';
            delElement.onclick = () => this.delete(item.id);
            tr_action.appendChild(delElement);

            // let imgElement = document.createElement('img'); 
            // imgElement.setAttribute('class', 'del-btn');
            // imgElement.setAttribute('id', `${item.id}`);
            // imgElement.src = './deleteicon.png';
            // imgElement.onclick = () => this.delete(item.id);
            // tr_action.appendChild(imgElement);
            });
        this.saveJSON();
        this.writeTotal();
    }
     // Deleta o elemento selecionado
    delete(id) {
        // Redefine a lista de produtos com os não removidos
        let novoArr = this.arrProd.filter(item => item.id !== id);
        this.arrProd = novoArr;
        // Redefine os id's dos produtos que restaram: 1, 2, 3,...
        for (let index = 0; index < this.arrProd.length; index++) {
            const element = this.arrProd[index];
            element.id = index + 1;
        }
        this.insertList();
    }
    // Deleta todos os item de uma vez,
    // Esvazia lista de produtos
    cleanList() {
        this.arrProd = [];
        let tbody = document.getElementById('t-corpo');
        tbody.innerHTML ='';
        this.writeTotal();
    }
    // Solicita valor para checked
    // retorna ao status false e price=0 se unchecked
    insertValue(id) {
        let checkBox = document.getElementById(`check-${id}`);
        this.arrProd.forEach(item => {
            if (item.id == id) {
                // Se checkbox checked...
                if (checkBox.checked) {
                    let price = 0;
                    let value;
                    // Enquanto não for um número no formato "000.00",
                    // pede ao usuário que digite o valor
                    do {
                        if (isNaN(price)) {
                            alert('- Não utilize separador de milhar "."\n- Utilize "," para decimais');
                        };
                        value = prompt('Valor:');
                        if (value !== null) {
                            price = Number(value.replace(',', '.'));
                            item.status = checkBox.checked;
                        };
                        // Se o usuário cancelar o prompt...
                        if (value == '' || value == null) {
                            item.status = false;
                            price = 0;
                            break; 
                        };
                    } while (isNaN(price) || price === 0);
                    item.price = price;
                } // Se checkbox unchecked...
                else {
                    item.price = 0;
                    item.status = false;
                };
            };
        });
        this.insertList();
        // this.writeTotal();
        // this.saveJSON();
    }
    // Imprime o valor total da compra
    // no formato moeda brasileira
    writeTotal() {
        let total = this.arrProd.reduce((acc, item) => acc + item.price, 0);
        let par = document.getElementById('price-par');
        par.innerHTML = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }
    //Salva lista de produtos no localStorage
    // ou limpa localStorage se lista vazia
    saveJSON() {
        let cond = this.arrProd.length > 0 ? localStorage.setItem('lastSale', JSON.stringify(this.arrProd)): localStorage.clear();
    }
    // Insere localStorage quando a página reaberta ou atualizada
    initialize() {
        let lastList = localStorage.getItem('lastSale');
        if (lastList !== null) {
            this.arrProd = JSON.parse(lastList);
            this.insertList();
        };
    }
    // Remove os itens checked
    removeChecked() {
        let statusFalse = this.arrProd.filter(item => item.status == false);
        this.arrProd = statusFalse;
        // Redefine os id's dos produtos que restaram: 1, 2, 3,...
        for (let index = 0; index < this.arrProd.length; index++) {
            const element = this.arrProd[index];
            element.id = index + 1;
        }
        this.insertList();
    }
}