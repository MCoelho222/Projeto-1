export default class Produtos {
    constructor() {
        this.id = 0;
        this.arrProd = [];
    }
    // Lê os dados no input e retorna seu valor
    lerDados() {
        let prodInput = document.getElementById('prod-input'); // Seleciona o input do usuário
        let info = prodInput.value;
        if (this.validaInput(info)) {
            return info;
        }
        return false
    }
    // Verifica se há algo no input e caso seja uma string retorna true
    validaInput(input) {
        if (input) {
            return true
        }
    }
    // Insere o produto digitado em this.arrProd e na lista de produtos no arquivo html
    insereProduto() {
        let prod = this.lerDados(); // O produto
        // Insere produto na lista se houver um input válido
        if (prod) {
            this.id += 1; // Incrementa a variável id em 1 unidade
            this.arrProd.push({nome: prod, id: this.id}); // Insere o produto com id no array this.arrProd
            this.insereLista()
            let prodInput = document.getElementById('prod-input');
            prodInput.value = ''; // Limpa o input
        }
    }
    insereLista() {
        
        let tbody = document.getElementById('t-corpo'); // Seleciona o corpo da tabela/lista de produtos
        tbody.innerHTML ='' // limpa a lista impressa no navegador
        // Percorre o arrProd e imprime todos os produtos na lista
        this.arrProd.forEach(item => {
            let tr = tbody.insertRow(); // Insere uma linha na lista de produtos
            let tr_select = tr.insertCell(); // Insere uma célula na linha
            let tr_prod = tr.insertCell(); // Insere uma célula na linha
            let tr_action = tr.insertCell(); // Insere uma célula na linha
            
            let checkBox = document.createElement('input'); // Cria um input para o checkbox
            checkBox.setAttribute('type', 'checkbox'); // Atribui o tipo checkbox ao input
            checkBox.setAttribute('class', 'check'); // Atribui o tipo checkbox ao input
            checkBox.setAttribute('id', `check-${item.id}`); // Atribui o tipo checkbox ao input
            tr_select.appendChild(checkBox); // Insere a checkbox na coluna select

            tr_prod.innerText = item.nome; // Imprime produto na coluna de produtos
            
            let imgElement = document.createElement('img'); // Cria elemento imagem para deletar
            imgElement.setAttribute('class', 'del-btn');
            imgElement.setAttribute('id', `${item.id}`);
            imgElement.src = './deleteicon.png'
            imgElement.onclick = () => this.deletar(item.id);

            tr_action.appendChild(imgElement);
            })
    }
     // Deleta os elementos checado
    deletar(id) {
        let chkBox = document.getElementById(`check-${id}`);
        //console.log(chkBox.id) // Cria um input para o checkbox
        //console.log(chkBox.id)
        //console.log(this.id)
        if (chkBox.checked) {
            console.log('OI')
            this.id -= 1;
            let novoArr = this.arrProd.filter(item => item.id !== id);
            console.log(novoArr)
            this.arrProd = novoArr;
            this.insereLista()
            //console.log(chkBox.value)

        }
    }
}