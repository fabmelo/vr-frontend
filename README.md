# TESTE FRONT-END VR BENEFÍCIOS

Aplicação Angular com consumo da API PokéAPI para atender os requisitos do teste para Front-End da VR Benefícios.

## Os requisitos

Foi definido que a apalicação deveria ter uma lista com os Pokemons e que esta lista levasse ao uma página de detalhes do Pokemon selecionado. Como são muitos Pokemons, ao invés de fazer uma simples paginação, foi definido implementar um infinite scroll e a virtualização para apenas redenrizar os dados em tela.

## Tecnologias empregadas

A aplicação foi desenvolvida com Angular na sua versão 10, foi utilizado para o layout o Angular Material, para cuidar o infinite scroll foi usada a library ngx-infinite-scroll e para cuidar da virtualização dos dados do scroll foi utilizado o próprio Angular Material.

## Desafios encontrados

1. Por não ser um bom conhecedor de Pokemons não sabia o que seriam dados importantes e relevantes a se mostrar nos detalhes. 
2. O deploy na plataforma do Heroku nunca havia feito, mas depois de ler a documentação foi concretizada com sucesso. 

## Comandos

Segue abaixo os principais comandos para interação com a aplicação.

1. Fazer o clone da aplicação do repositório do GitHub
```
git clone https://github.com/fabmelo/vr-frontend.git
```

2. Entrar no diretório da aplicação após clonagem.
```
cd vr-frontend
```

3. Instalar as dependências através do NPM.
```
npm install
```

4. Executar a aplicação
```
ng serve -o
```

5. Realizar o build da aplicação para produção.
```
ng build --prod
```

## O repositório

A aplicação foi commitada do repositório https://github.com/fabmelo/vr-frontend do GitHub.

## O deploy

O deploy da aplicação foi feito no Heroku e a url para acesso é https://vrfrontendapp.herokuapp.com/.
