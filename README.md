# UFCD 5414: Laboratório 6 - Full Stack App

**Author**: Nelson Santos  
**Email**: [nelson.santos.0001376@edu.atec.pt](mailto:nelson.santos.0001376@edu.atec.pt)  
**Institution**: ATEC - _Today's date_

---

## Introdução

Este projeto consiste numa aplicação simples de gestão de tarefas, que permite criar, visualizar, editar e eliminar tarefas. O projeto é dividido em dois componentes principais:

- **Front-end**: Desenvolvido em **[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)**, **[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)** e **[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** com a biblioteca **[Bootstrap](https://getbootstrap.com/)** para aplicar estilos. Esta componente é responsável pela interface de utilizador e interação visual com o utilizador.
- **Back-end**: Desenvolvido em **[Node.js](https://nodejs.org/en)** e **[Express.js](https://expressjs.com/)**. Este módulo fornece uma **API RESTful** para a gestão das tarefas. A Base de Dados (BD) utilizada foi **[SQLite](https://www.sqlite.org/)**.

O objetivo é demonstrar a construção de uma aplicação **full-stack** utilizando tecnologias amplamente utilizadas nos dias de hoje.

## Estrutura do projeto

O projeto está organizado da seguinte forma:

```plaintext
Task-Management-App/
  |
  ├── backend/
  │   ├── db/
  │   │   └── database.sqlite     # Ficheiro da BD SQLite
  │   ├── routes/
  │   │   └── tasks.js            # Rotas API para as tarefas
  │   ├── app.js                  # Configuração servidor Express
  │   └── package.json            # Dependências Node.js
  |
  ├── frontend/
  │   ├── index.html              # Página principal HTML
  │   ├── js/
  │   │   └── main.js             # Lógica JavaScript para interação com a API
  │   └── css/
  │       └── styles.css          # Estilos personalizados (se necessário)
  |
  └── README.md                   # Documentação do projeto
```

## Configuração

### Pré-requisitos

Para executar este projeto, certifique-se de que possui as seguintes ferramentas instaladas:

- **[Node.js](https://nodejs.org/en)** e **[npm](https://www.npmjs.com/)**: O Node.js é necessário para executar o servidor **back-end**, e o npm (Node Package Manager) é o gestor de pacotes para instalar as dependências do projeto. O npm é automaticamente instalado com o Node.js. Verifique a versão instalada com o seguinte comando:

  ```bash
  node --version
  v22.6.0
  ```

- **[SQLite](https://www.sqlite.org/)**: Utilizado como o sistema de BD para guardar as tarefas.
- **[DB Browser for SQLite](https://sqlitebrowser.org/)**: Uma ferramenta gráfica opcional, mas útil, para visualizar e manipular a BD SQLite.

### Passos de Configuração

Siga os passos abaixo para configurar e executar o projeto:

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/nacsantos/task_management_app
   cd task_management_app
   ```

2. **Instalar as dependências no back-end**:

   ```bash
   cd backend
   npm install
   ```

3. **Iniciar o servidor back-end**:

   ```bash
   node app.js
   ```

   O servidor estará disponível em:

   ```bash
   http://localhost:3000
   ```

4. **Abrir o front-end**: Navegue até a pasta `frontend` e abra o ficheiro `index.html` no **browser** ou via **VSCode** com a extensão `Live Server`.

5. **Visualizar a BD**: Para inspecionar os dados diretamente, abra o ficheiro `database.sqlite` utilizando o **[SQLite](https://www.sqlite.org/)**. Esta ferramenta permite visualizar as tabelas, realizar consultas SQL e ver os dados das tarefas.

6. **Testar a aplicação**: A aplicação deverá exibir as tarefas existentes e permitir adicionar, editar e eliminar tarefas diretamente na interface.

## Descrição Detalhada

### Back-end: API RESTful com Node.js e Express.js

O back-end foi construído utilizando **[Node.js](https://nodejs.org/)**, uma plataforma baseada em JavaScript, e a framework **[Express.js](https://expressjs.com/)**, que facilita a criação de servidores web e APIs RESTful. Esta camada é responsável pela lógica do servidor, tratamento de pedidos HTTP e comunicação com a BD **[SQLite](https://www.sqlite.org/)**.

#### Estrutura do back-end

- `app.js`: Ficheiro principal do back-end, onde o servidor **[Express.js](https://expressjs.com/)** é configurado. Nele são definidas as rotas da API e estabelecida a conexão com a BD **[SQLite](https://www.sqlite.org/)**. Também permite o uso de **CORS** para que o front-end possa comunicar-se com o back-end.
- `routes/tasks.js`: Define as rotas relacionadas às operações CRUD (_Create, Read, Update and Delete_) das tarefas. Cada rota é associada a um método HTTP, como `GET`, `POST`, `PUT`, e `DELETE`, para manipular as tarefas armazenadas na BD.

- `database.sqlite`: Este ficheiro contém os dados persistidos da aplicação. A BD **[SQLite](https://www.sqlite.org/)** é utilizada pela simplicidade de configuração e por ser uma solução leve, ideal para projetos de pequena escala.

#### Rotas da API

A API RESTful é composta pelas seguintes rotas principais:

- `GET /api/tasks`: Retorna todas as tarefas registadas na BD.
- `POST /api/tasks`: Cria uma nova tarefa. O título, descrição, status da tarefa e data são enviados no body do request.
- `PUT /api/tasks/:id`: Atualiza uma tarefa existente, identificada pelo `id`.
- `DELETE /api/tasks/:id`: Remove uma tarefa da BD.

Cada uma destas rotas faz uma operação correspondente na BD, utilizando consultas SQL através da biblioteca **[sqlite3](https://www.npmjs.com/package/sqlite3)**.

### Front-end: Interface com HTML, CSS e JavaScript

O front-end foi desenvolvido em **[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)**, **[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)**, utilizando a biblioteca **[Bootstrap](https://getbootstrap.com/)** para aplicação de estilos, e a lógica de interação com o servidor foi construída com JavaScript puro, sem a utilização de frameworks como **[React](https://react.dev/)** ou **[Vue.js](https://vuejs.org/)**. Este permite ao utilizador final interagir de forma visual e dinâmica com o sistema.

#### Estrutura do front-end

- `index.html`: O ficheiro principal do front-end que define a estrutura básica da página, incluindo o formulário para adicionar tarefas e a lista de tarefas. O **[Bootstrap](https://getbootstrap.com/)** é utilizado para garantir uma apresentação clara e responsiva.
- `main.js`: Ficheiro JavaScript onde reside a lógica do front-end. Ele contém as funções para enviar pedidos HTTP ao back-end utilizando o método `fetch()` e processar as respostas. Este ficheiro é responsável por atualizar a interface dinamicamente, adicionar novas tarefas, e eliminar ou editar as existentes.
- `styles.css`: Opcionalmente, pode conter estilos personalizados para o layout da página.

#### Lógica do front-end

No `main.js`, várias funções JavaScript foram implementadas para realizar as operações no front-end. Entre as principais funcionalidades:

- **Apresentar as tarefas**: Quando a página é carregada, a função `getTasks()` é chamada. Esta função faz um pedido `GET` ao back-end, obtém todas as tarefas e as exibe no browser, inserindo-as dinamicamente na página.

- **Adicionar uma nova tarefa**: Ao submeter o formulário de uma nova tarefa, o evento `submit` é intercetado, os dados do formulário são enviados ao back-end via um pedido `POST`, e a lista de tarefas é atualizada para refletir a nova tarefa.

- **Atualizar uma tarefa**: O utilizador pode editar uma tarefa existente. Ao submeter a atualização, o JavaScript faz um pedido `PUT` para modificar a tarefa no back-end. A tarefa editada é exibida imediatamente na página.

- **Eliminar uma tarefa**: Para eliminar uma tarefa, o utilizador clica num botão específico. A função `deleteTask()` faz um pedido `DELETE` para o back-end e remove a tarefa da interface sem precisar recarregar a página.

- **Validação**: O JavaScript também verifica se todos os campos obrigatórios foram preenchidos antes de enviar os dados ao back-end, garantindo a integridade dos dados submetidos.

## Conclusão

Este projeto de Gestão de Tarefas demonstra como construir uma aplicação **full-stack** simples, mas funcional, utilizando tecnologias amplamente usadas.

No back-end, o **[Node.js](https://nodejs.org/)** em conjunto com a framework **[Express.js](https://expressjs.com/)** permite criar rapidamente uma **API RESTful** escalável, enquanto o **[SQLite](https://www.sqlite.org/)** proporciona uma base de dados leve e fácil de configurar para armazenar os dados. O back-end também oferece flexibilidade para expandir e adicionar funcionalidades conforme as necessidades do projeto cresçam.

No front-end, a interface é simples e eficiente, construída com **[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)**, **[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)**, **[Bootstrap](https://getbootstrap.com/)** e **JavaScript**. O uso do `fetch()` para fazer pedidos assíncronos ao servidor e manipular as respostas permite uma experiência de utilizador fluida, com operações em tempo real, como adicionar, atualizar ou eliminar tarefas sem a necessidade de recarregar a página.

O projeto pode ser facilmente expandido, tanto no front-end como no back-end. Por exemplo, pode-se adicionar autenticação de utilizadores, filtros de pesquisa de tarefas ou até implementar um sistema de notificação para lembrar os utilizadores sobre prazos de tarefas.

Ao integrar o **[Node.js](https://nodejs.org/)** com **JavaScript** no front-end, este projeto ilustra como estas duas tecnologias podem ser combinadas para criar uma aplicação web eficiente e moderna.
