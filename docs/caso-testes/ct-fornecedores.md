## ✅ Caso de Teste 001 - Cadastro de fornecedor vazio

- **Objetivo:** Garantir que o sistema exiba mensagens de erro ao tentar cadastrar um fornecedor sem preencher os campos obrigatórios.  
- **Pré-condição:** Estar na tela de cadastro de fornecedores.  
- **Passos:**
  1. Clicar em "Adicionar novo fornecedor".
  2. Clicar em "Criar fornecedor" sem preencher nenhum campo.  
- **Resultado Esperado:**
  - Mensagem: "O nome do fornecedor é obrigatório".
  - Mensagem: "CNPJ é obrigatório".
  - Mensagem: "O e-mail é obrigatório".  
- **Status:** ✅ Passou  

---

## ✅ Caso de Teste 002 - Cadastro de fornecedor válido

- **Objetivo:** Verificar se é possível cadastrar um fornecedor com todos os campos preenchidos corretamente.  
- **Pré-condição:** Estar na tela de fornecedores.  
- **Passos:**
  1. Clicar em "Adicionar novo fornecedor".
  2. Preencher todos os campos obrigatórios com dados válidos.
  3. Clicar em "Criar fornecedor".  
- **Resultado Esperado:**
  - Fornecedor listado na tabela de fornecedores.
- **Status:** ✅ Passou  

---

## ✅ Caso de Teste 003 - Edição de fornecedor com campos válidos

- **Objetivo:** Verificar se é possível editar um fornecedor já cadastrado com dados válidos.  
- **Pré-condição:** Fornecedor previamente cadastrado.  
- **Passos:**
  1. Clicar no ícone de edição do primeiro fornecedor.
  2. Alterar os campos "Nome" e "CNPJ".
  3. Clicar em "Atualizar fornecedor".  
- **Resultado Esperado:**
  - Dados atualizados refletidos na listagem.
- **Status:** ✅ Passou  

---

## ✅ Caso de Teste 004 - Edição de fornecedor com campos obrigatórios vazios

- **Objetivo:** Garantir a exibição de mensagens de erro ao tentar salvar um fornecedor com campos obrigatórios vazios.  
- **Pré-condição:** Fornecedor previamente cadastrado.  
- **Passos:**
  1. Clicar no ícone de edição de um fornecedor.
  2. Limpar os campos "Nome", "CNPJ", "E-mail" e "Telefone".
  3. Clicar em "Atualizar fornecedor".  
- **Resultado Esperado:**
  - Mensagens de erro para todos os campos obrigatórios.  
- **Status:** ✅ Passou  

---

## ✅ Caso de Teste 005 - Exclusão confirmada de fornecedor

- **Objetivo:** Validar que o fornecedor é removido da lista ao confirmar a exclusão.  
- **Pré-condição:** Fornecedor previamente cadastrado.  
- **Passos:**
  1. Clicar no ícone de excluir de um fornecedor.
  2. Confirmar a exclusão.  
- **Resultado Esperado:**
  - Fornecedor removido da lista.
  - Toast/mensagem de sucesso exibida.  
- **Status:** ❌ Falhou 

---

## ✅ Caso de Teste 006 - Cancelar exclusão de fornecedor

- **Objetivo:** Verificar se o fornecedor permanece na lista após cancelar a exclusão.  
- **Pré-condição:** Fornecedor previamente cadastrado.  
- **Passos:**
  1. Clicar no ícone de excluir de um fornecedor.
  2. Clicar em "Cancelar" na caixa de confirmação.  
- **Resultado Esperado:**
  - Fornecedor continua na lista.  
- **Status:** ❌ Falhou

---

## ✅ Caso de Teste 007 - Cadastro com CNPJ sem máscara

- **Objetivo** Verificar se o sistema formata corretamente o CNPJ mesmo quando inserido sem máscara.
- **Pré-condição:** Estar na tela de cadastro de fornecedores.
- **Passos:**
 1. Preencher os campos obrigatórios.
 2. Inserir o CNPJ como "34104798000118" (sem máscara).
 3. Clicar em "Criar fornecedor".
 - **Resultado Esperado:**
  - CNPJ formatado como "34.104.798/0001-18" na listagem.
- **Status:** ❌ Falhou

---

## ✅ Caso de Teste 008 - Cadastro com e-mail inválido

- **Objetivo** Garantir que o sistema exiba erro ao inserir e-mail inválido (sem "@").
- **Pré-condição:** Estar na tela de cadastro de fornecedores.
- **Passos:**
 1. Preencher os campos obrigatórios.
 2. Inserir e-mail como "exemploemail.com". (sem @)
 3. Clicar em "Criar fornecedor".
 - **Resultado Esperado:**
  - Exibição de mensagem de erro: "Inclua um "@" no endereço de e-mail. "exemploemail.com" está com um "@" faltando."
- **Status:** ✅ Passou

---

## ✅ Caso de Teste 009 - Cadastro com telefone sem máscara

- **Objetivo** Verificar se o sistema formata corretamente o telefone ao salvar
- **Pré-condição:** Estar na tela de cadastro de fornecedores.
- **Passos:**
 1. Preencher os campos obrigatórios.
 2. Inserir telefone como "62999999999" (sem máscara).
 3. Clicar em "Criar fornecedor".
 - **Resultado Esperado:**
  - Telefone exibido como "(62) 99999-9999" na listagem.
- **Status:** ❌ Falhou

---

## ✅ Caso de Teste 010 - Cadastro com telefone inválido

- **Objetivo** Garantir que o sistema exiba erro ao inserir telefone inválido.
- **Pré-condição:** Estar na tela de cadastro de fornecedores.
- **Passos:**
 1. Preencher os campos obrigatórios.
 2. Inserir telefone como "a".
 3. Clicar em "Criar fornecedor".
 - **Resultado Esperado:**
  - Exibição da mensagem "O telefone está inválido".
- **Status:** ❌ Falhou

---
