
# Descrição do Projeto

Lista de compras onde o usuário entra com um nome de produto e insere na lista. A lista é apresentada na tela do navegador e o usuário tem as opções de selecionar ou deletar o item. Ao selecionar, ele pode entrar com o valor do produto que é então somado ao valor total das compras. Adicionalmente, o usuário pode limpar a lista ou remover apenas os selecionados (comprados).

# Arquivos

> * firstproj.html
> * firstproj.js
> * produtos.js
> * firstproj.css
> * favicon.ico
> * devinhouse-logo.png 

## HTML

### firstproj.html

> **Executa script de firstproj.js**;
> * Logo do curso DEVinHouse;
> * Input para digitação de produtos;
> * Lista de produtos inseridos;
>> * Checkbox à esquerda do produto;
>> * Botão deletar produto à direita do produto;
> * Botão para inserir produto na lsita;
> * Botão para limpar a lista;
> * Botão para remover comprados (checked);
> * Parágrafo com o valor total das compras.

## JavaScript

### produtos.js

> Define e EXPORTA **class Products**;
> Contém funções:
>> **read()**: ler dados do input do produto;
>> **validate(input)**: validar input de produto;
>> **insertProduct()**: inserir produtos digitados no array de produtos;
>> **insertList()**: criar linhas, checkboxes, botões deletar na lista de produtos; inserir nomes; imprimir lista; somar produtos comprados;
>> **delete(id)**: remover um item por id; recarregar lista de produtos;
>> **cleanList()**: remover todos os itens da lista e zerar valor total;
>> **insertValue()**: Inserir no objeto do produto o valor digitado;
>> **writeTotal()**: Calcular o valor total das compras (only checked);
>> **saveJSON()**: salvar lista no localStorage;
>> **initialize()**: recarregar lista do localStorage ao atualizar/reabrir página;
>> **removeChecked()**: remover comprados (checked);
>> **modal()**: cria pop-up para input de valor;
>> **closeModal()**: fechar modal.

### firstproj.js

> IMPORTA **class Products**;
> Executa função **initialize()**;
> Contém os **eventListeners** para:
>> Botão inserir;
>> Botão Limpar;
>> Botão Remover comprados;
>> Botão para fechar modal;
>> window;
>> Enter (modal e inserir).

# Requisitos para avaliação do projeto

1. Um título na aba do navegador, para que o usuário encontre a sua aplicação no meio das várias abas que constantemente mantém abertas;
2. Um cabeçalho dentro da página, para que o usuário saiba facilmente em que página se encontra e do que se trata o conteúdo;
3. Um campo de texto para digitar o nome do produto a ser adicionado à lista;
4. Um botão para adicionar um novo produto na lista;
5. Um botão para deletar todos os itens de uma única vez;
6. Um botão para deletar todos os itens que estejam marcados como comprado;
7. Uma lista contendo os produtos já inseridos;
8. Cada linha da lista deve conter: checkbox para o usuário marcar aquele produto que já foi comprado; o texto que o usuário digitou ao cadastrar a atividade; botão para excluir o produto da lista, caso desejado;
9. Quando o usuário marcar um item da compra, deve-se abrir um pop-up para que o
usuário digite o valor da compra, após isso, deve-se somar ao valor total das compras;
10. A lista deve ser salva no "localStorage" do navegador (incluindo os produtos que já foram realizados), e deve ser carregada sempre que a página for reaberta.