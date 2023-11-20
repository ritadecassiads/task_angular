## Fazer
-> Equipe
    - edição

-> Usuario
    - mostrar na equipe

-> associar usuario a equipe e mostra na listagem de equipe

-> Ajustar tabela de tarefas
- Ajustar botao de conclusão
    - fazer função que marca como concluída

## Regras de negocio
- Cada equipe pode ter varias tarefas
- Cada equipe pode ter varios usuarios





## 16/10 - Angular
# Comandos
-> criar o projeto: ng new NomeProjeto --minimal
    - pergunta do css
    - "não" para segunda pergunta
-> criar componente: ng g c pages/produto/produto-listar
    - utilizar o traço para separar palavras
                         

# Dividir o componentes em 3 partes

-> alterar no angular.json
    - para criar os arquivos do componente separado mudar o para false 
        "inlineTemplate": false,
        "inlineStyle": false

--> 1 componente raiz
-> html
-> css
-> ts
    - arquivo principal
    - regras de negocio
    - aponta pros arquivos html e css


# HttpClientModule
-> Importar na mão
-> Para fazer a conexão com o back, requisições
-> Funciona como o axios
-> Proprio do angular
-> Declarar no construtor
-> Importar no app.module.ts
    - tudo que for instalado precisa estar mapeado lá

## 23/10
# Camadas:
    - index.html
        - app-root
            - outros componentes

# Requisição
-> Subscribe(no retorno da requisição) 
    - é usado para "assinar" uma Observable retornada pela chamada HTTP this.client.get(...). Observables são uma parte fundamental da programação reativa no Angular e são usadas para lidar com fluxos de dados assíncronos, como respostas de API, eventos, etc

-> Next 
    - Este callback é chamado quando a Observable emite um novo valor, ou seja, quando a resposta da API é bem-sucedida


## 30/10
# Cadastro produto
    - atributo!: string = exclamação para inicializar a variavel sem valor
