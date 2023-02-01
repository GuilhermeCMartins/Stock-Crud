# Stock crud

Aplicativo feito em node.js (express) com typescript.

## Como rodar

1. instale as dependencias
```
yarn || npm i

```

2. Rode o projeto

```
npm run dev

```

## Rotas

### 1. Items

Lembrando que para acessar essa rota precisa estar logado.

* 1.1 GET /item/ --> Mostra todos os itens registrados

* 1.2 GET /item/:id --> Mostra um item com id especifico

* 1.3 POST /item/ --> Registra um item

* 1.4 PATCH /item/:id --> Atualiza um item

* 1.5 DELETE /item/:id --> Deleta um item por id

### 2. User

* 1.1 POST /user/ --> Cria um usuário

* 1.2 POST /user/login --> Loga um usuário, lembrando que volta um Bearer token que você usa na header pra autenticação.

* 1.3 PATCH /user/:id --> Edita um usuário, lembrando que só o próprio usuário pode se editar.

* 1.4 DELETE /user/:id --> Deleta um usuário, lembrando que só o prórpio usuário pode se deletar.


