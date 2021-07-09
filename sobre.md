# Aplication to Overview NestJS

Este projeto tem os seguintes objetivos:

- Praticar os conceitos iniciais do Framework NestJS.

## Contexto geral

Este projeto visa desenvolver uma API para cadastrar Cats, esta API terá funcionalidades
básicas de CRUD (Create, Read, Update e Delete).

Um Cat terá as seguintes informações básicas:
- Id: que representa o ID único do Cat;
- Name: que representa o nome do Cat;
- Age: que representa a idade do Cat;
- Owner: que representa quem é o dono do Cat;

## Requisitos funcionais

A aplicação deve permitir:

- [X] Cadastrar um Cat;
- [X] Listar todos os Cats cadastrados;
- [X] Listar um Cat com base no ID;
- [X] Alterar dados do Cat com base no ID;
- [X] Deletar um Cat com base no ID;

Observações:
- [] Significa que o requisito não foi implementado;
- [X] Significa que o requisito foi implementado;


## Rotas do projeto
- /cats : Existe uma mensagem de boas vindas;
- /cats/all : Existe uma lista com todos os cats cadastrados no banco;
- /cats/update/:id - Altera um cat com base no id;
- /cats/find/:id - Busca um cat com base no id;
- /cats/delete/:id - Deleta um cat com base no id;
