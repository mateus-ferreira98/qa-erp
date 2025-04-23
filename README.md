# QAERP - Mini ERP para estudos de QA 🧪

**QAERP** é uma aplicação pessoal desenvolvida com **apoio de inteligência artificial**, com o objetivo de praticar e consolidar conhecimentos em **Quality Assurance (QA)**.

> O foco principal **não é o sistema em si**, mas sim utilizar uma aplicação com fluxo mais próximo da realidade para aplicar testes manuais, automatizados, de API, de performance, entre outros.

---

## 🔍 Objetivo

Criar um ambiente funcional de um sistema ERP para simular cenários reais de QA, utilizando ferramentas como:

- ✅ **Cypress** (Testes automatizados de interface)
- ✅ **Postman** (Testes de API)
- 🚧 **Artillery** ou **k6** (Testes de performance) — *em breve*
- ✅ **Testes manuais com plano de testes**

---

## ✅ Funcionalidades já criadas

- 📊 **Painel de Dashboard**
- 📦 **Gestão de Produtos**
- 🏢 **Cadastro de Fornecedores**
- 🧾 **Inventário de Estoque**
  - Entrada de produtos
  - Saída de produtos

---

## 🧪 Testes em andamento

Atualmente estou desenvolvendo testes funcionais e automatizados para as seguintes funcionalidades:

- 📦 Gestão de Produtos (concluído)
- 🏢 Gestão de Fornecedores (concluído)
- 🧾 Inventário de Estoques (em breve)
- 📊 Painel de Dashboard (em andamento)

Os arquivos de testes estão sendo organizados dentro da pasta `cypress/e2e/`.

---

## 📂 Documentação QA

Acompanhe a documentação dos testes:

- [`docs/caso-testes/ct-produtos.md`](docs/caso-testes/ct-produtos.md) – Casos de teste da funcionalidade de produtos
- [`docs/bugs/bugs-produtos.md`](docs/bugs/bugs-produtos.md) – Bugs encontrados e sugestões de correção

📌 Esses arquivos estão em constante atualização conforme avanço nos testes.

## 📌 Atualizações e mudanças recentes

As mudanças feitas no projeto — como correções de bugs, ajustes em testes ou novas funcionalidades — estão sendo documentadas separadamente no arquivo:

- [`CHANGELOG.md`](CHANGELOG.md) – Registro cronológico das atualizações do sistema e dos testes

---

## 🐛 Bugs identificados (produtos)

Alguns pontos já identificados durante os testes:

- ❌ Unidade de medida vindo como "UN" por padrão
- ❌ Falta de toast (notificação) ao adicionar produto
- ❌ Permite cadastro sem informar estoque atual
- ❌ Campos numéricos sem formatação adequada
- ❌ Falta de toast ao excluir produto

> Todos esses itens estão sendo registrados e tratados nos arquivos de bugs.

---

## 🛠️ Tecnologias utilizadas

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

## ▶️ Como rodar o projeto

### Pré-requisitos

- Ter o **Node.js** instalado na máquina

### Instruções

```bash
# Clone o repositório
git clone <YOUR_GIT_URL>

# Acesse o diretório do projeto
cd qa-erp

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
