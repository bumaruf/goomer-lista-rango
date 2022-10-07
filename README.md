<h1 align="center">Goomer Lista Rango | Challenge</h1>

<!-- Tags -->

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Node.js&message=14.x&color=835AFD&labelColor=000000">
</p>

<!-- Menu -->

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;
</p>

<!-- Body -->

## 👋 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

### Ferramentas
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

### SGBD
- [PostgreSQL](https://www.postgresql.org/)

### Testes unitários
- [Jest](https://jestjs.io/pt-BR/)

### Padronização
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Commitizen](https://commitizen-tools.github.io/commitizen/)

### Environment
- [Docker Compose](https://docs.docker.com/compose/)



## 💻 Projeto

Goomer Lista Rango é uma api RESTfull desenvolvida para o gerenciamento de restaurantes e seus produtos, este projeto foi idealizado pela empresa **Goomer**

## 🏴‍☠️ Desafios enfrentados

**Gerenciando o tempo**: Durante o desenvolvimento do projeto uma das dificuldades foi conseguir gerenciar/adaptar o escopo do projeto com o tempo disponível, conciliando todas as tarefas para que fosse possível terminar a maior quantidade de tarefas dentro do tempo estimado.

**Trabalhando sem ORM**: Desenvolver todo o projeto sem ORM sem qualquer dúvida foi um grande desafio, ter que buscar e escrever no banco sem qualquer auxilio me trouxeram vários conhecimentos a mais(foi um dos primeiros projetos desenvolvidos utilizando PostgreSQL).

**Arquitetura**: Pensar em uma arquitetura que se adequasse ao tamanho do projeto foi uma tarefa importante, pois depois que implementada se tornaria algo bastante enrigecido.

**Reduzindo escopo**: Algumas coisas foram deixadas de lado por conta do tempo disponibilizado para o desenvolvimento do projeto, por isso tentei manter o mais importante deixando de lado algumas coisas.(Lista na seção Melhorias).

## ✨ Melhorias

Como dito anteriormente, reduzi o escopo do projeto, mesmo com isso, deixo aqui as melhorias que gostaria de ter desenvolvido no projeto:

Com um pouco mais de tempo

- Ambiente docker de desenvolvimento e produção
- Adição das tabelas no banco de dados addresses, categories, promotions,
- Testes unitários cobrindo as services de produto
- Adição de uma API-Key para trazer mais segurança

Pensando em performance

- Implementação de cache nas rotas de consulta, assim permitindo uma otimização nas consultas no banco de dados.
- Implementação de páginação nas rotas de consulta que retornam uma massiva quantidade de dados.

Pensando em manutenibilidade

- Implementação Continuous Integration, assim permitindo que os desenvolvedores consigam manter o projeto com mais segurança.

- [Github pull-requests & issues templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates): permite criar uma padronização utilizando templates de pull-requests e issues, trazendo uma facilidade enorme em criar e preencher issues e pull-requests

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/bumaruf/goomer-lista-rango
$ cd goomer-lista-rango
```

Para iniciá-lo, siga os passos abaixo:
```bash
# Inicializar banco de dados
$ docker-compose up -d

# Instalar as dependências
$ yarn

# Iniciar o projeto em ambiente de desenvolvimento
$ yarn dev
```
O serviço estará disponível pelo endereço http://localhost:3333.

A documentação(**Swagger**) da rota pode ser encontrada no endereço: http://localhost:3333/docs.

Existe um arquivo com a collection para ser utilizada no **Postman**: [Download](https://drive.google.com/file/d/1rQUUf6OxaxVy4Rrh9xMMCL5Y3E84vmlp/view?usp=sharing)

## 🧪 Unit tests

Para rodar os testes unitários, use o seguinte comando:

```bash
$ yarn test
```


### ⚙️ Configuração

Não se esqueça de configurar o arquivo de variáveis ambiente para que o projeto funcione corretamente.

Duplique o arquivo `.env.example` alterando o nome para `.env` e depois preencha as variáveis necessárias.

---

<!-- Footer -->
Desenvolvido por [Otávio Bumaruf](https://www.linkedin.com/in/bumaruf/).
