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
        // Se input não-vazio
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
        let modalInput = document.getElementById('prod-val');
        modalInput.onchange = () => this.insertValue();
        // Seleciona corpo da tabela
        let tbody = document.getElementById('t-corpo');
        tbody.innerHTML ='';
        // Imprime uma linha para cada produto,
        // checkbox | nome do produto |img deletar
        this.arrProd.forEach(item => {
            
            // Cria 1 linha com 3 células
            let tr = tbody.insertRow();
            let tr_select = tr.insertCell();
            tr_select.style.width = '30px';
            let tr_prod = tr.insertCell();
            tr_prod.id = `td-${item.id}`;
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
            checkBox.onchange = () => this.modal();
            // Se checkbox unchecked, escreve nome do produto normal
            if (!item.status) {
                let prodNome = document.createElement('p');
                prodNome.id = `nome-${item.id}`;
                prodNome.innerHTML = item.nome;
                tr_prod.appendChild(prodNome);
            };
            // Se checkbox checked, escreve nome do produto tachado
            if (item.status) {
                let prodNome = document.createElement('s');
                prodNome.id = `nome-${item.id}`;
                prodNome.innerHTML = item.nome;
                tr_prod.appendChild(prodNome);
            };
            // Cria um elemento imagem com mesmo id do produto,
            // atribui função deletar a prop. onclick
            let delElement = document.createElement('p');
            delElement.style.border = '1px solid #FFFFFF'
            delElement.setAttribute('class', 'del-btn');
            delElement.setAttribute('id', `${item.id}`);
            delElement.innerHTML = 'x';
            delElement.onclick = () => this.delete(item.id);
            tr_action.appendChild(delElement);
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
        // Recerrega produtos na tela
        this.insertList();
    }
    // Deleta todos os item de uma vez,
    // Esvazia lista de produtos
    cleanList() {
        this.arrProd = [];
        let tbody = document.getElementById('t-corpo');
        tbody.innerHTML =''; // Apaga lista da tela
        this.writeTotal(); // Imprime total=0,00
    }
    // Pega o valor do input de valor
    // Insere o valor na propriedade price objeto
    // Recarrega a lista na tela
    insertValue() {
        let modalValue = document.getElementById('prod-val');
        for (let i = 0; i < this.arrProd.length; i++) {
            const element = this.arrProd[i];
            let checkBox = document.getElementById(`check-${i + 1}`);
            console.log(checkBox.checked);
            if (element.status && element.price == 0) {
                element.price = Number(modalValue.value.replace(',', '.'));
                if (isNaN(element.price)) {
                    alert('- Utilize apenas números sem separador de milhar ".";\n- Utilize "," para centavos.')
                    modalValue.value =''
                    element.price = 0;
                    this.modal();
                }; 
            };
        };
        this.insertList();
    }
    // Imprime o valor total da compra
    // no formato moeda brasileira
    writeTotal() {
        let checkedItens = this.arrProd.filter(item => item.status == true);
        let total = checkedItens.reduce((acc, item) => acc + item.price, 0);
        //let total = this.arrProd.reduce((acc, item) => acc + item.price, 0);
        let par = document.getElementById('price-par');
        par.innerHTML = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }
    // Salva lista de produtos no localStorage
    // ou limpa localStorage se lista vazia
    saveJSON() {
        let jsonFile = JSON.stringify(this.arrProd);
        let cond = this.arrProd.length > 0 ? localStorage.setItem('lastSale', JSON.stringify(this.arrProd)): localStorage.clear();
    }
    // Insere localStorage quando página reaberta ou atualizada
    initialize() {
        let lastList = localStorage.getItem('lastSale');
        if (lastList !== null) {
            this.arrProd = JSON.parse(lastList);
        } else {
            this.arrProd = [];
        }
        this.insertList();
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
    // Solicita um input do valor do produto
    modal() {
        let modal = document.getElementById("myModal");
        // Itera o array de produtos
        for (let i = 0; i < this.arrProd.length; i++) {
            const element = this.arrProd[i];
            let checkBox = document.getElementById(`check-${i + 1}`);
            // Se checked e valor zerado
            if (checkBox.checked && element.price == 0) {
                element.status = true;
                modal.style.display = "block";
            }
            // Se unchecked e valor != 0
            // Reseta status=false e price=0
            if (!checkBox.checked && element.price != 0) {
                element.status = false;
                element.price = 0;
                // Recarrega produtos na tela
                this.insertList();
            };
        };
    }
    // Fecha o modal
    closeModal() {
        let modal = document.getElementById("myModal");
        let modalValue = document.getElementById('prod-val');
        // Itera o array de produtos
        for (let i = 0; i < this.arrProd.length; i++) {
            const element = this.arrProd[i];
            let checkBox = document.getElementById(`check-${i + 1}`);
            // Se deu check mas não inseriu valor, reseta status=false
            if (checkBox.checked && element.price == 0) {
                element.status = false;
            };
        };
        // Reseta o input de valor
        modalValue.value = '';
        // Fecha modal
        modal.style.display = "none";
        // Recarrega produtos na tela
        this.insertList();
    };

}