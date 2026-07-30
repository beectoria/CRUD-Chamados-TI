# Sistema de Chamados TI

Sistema simples de abertura e gerenciamento de chamados de suporte técnico, desenvolvido como projeto de estudo em HTML, CSS e JavaScript puro (Vanilla JS), com persistência de dados via `localStorage`.

## Funcionalidades

- Criar novo chamado (título, descrição e prioridade)
- Listar todos os chamados cadastrados
- Editar um chamado existente
- Excluir um chamado
- Indicação visual de prioridade (Baixa, Média, Alta) por cores
- Persistência de dados no navegador (localStorage) — os chamados não são perdidos ao recarregar a página

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla, sem frameworks ou bibliotecas)
- Armazenamento local via `localStorage`

## Estrutura do projeto

```
CRUD-Chamados-TI/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── storage.js   → funções de leitura/escrita no localStorage
│   ├── crud.js       → funções de criar, listar, excluir e atualizar chamados
│   └── app.js        → lógica de interface (formulário, renderização, eventos)
└── README.md
```

## Como executar o projeto

Por ser um projeto 100% front-end (sem backend ou build), não é necessário instalar dependências.

1. Clone o repositório:
   ```bash
   git clone https://github.com/beectoria/CRUD-Chamados-TI.git
   ```

2. Abra o arquivo `index.html` diretamente no navegador

   **ou**, se estiver usando VSCode, recomenda-se abrir com a extensão **Live Server** para melhor experiência de desenvolvimento (auto-reload ao salvar arquivos).

## Melhorias futuras

- Filtro de chamados por prioridade ou status
- Busca por título
- Ordenação por data de criação
- Alternar status do chamado (Aberto/Em andamento/Concluído)
- Migração para um backend real (Node.js + banco de dados)

## Autor

Desenvolvido por **Victória Maciel** como projeto de estudo em desenvolvimento web front-end.