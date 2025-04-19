## ✅ Caso de Teste 001 - Cadastro de produto vazio

- **Objetivo:** Garantir que o sistema exiba mensagens de erro ao tentar cadastrar um produto sem preencher os campos obrigatórios.
- **Pré-condição:** Estar na tela de cadastro de produtos.
- **Passos:**
  1. Clicar em "Adicionar novo produto".
  2. Clicar em "Criar produto" sem preencher nada.
- **Resultado Esperado:**
  - Mensagem: "O nome do produto é obrigatório".
  - Mensagem: "O preço deve ser maior que 0".
- **Status:** ✅ Passou
- **Observações:**
  - ⚠️ Unidade de medida não deve vir com valor padrão ("UN").

---

## ✅ Caso de Teste 002 - Cadastro de produto válido

- **Objetivo:** Verificar se é possível cadastrar um produto com todos os campos corretamente preenchidos.
- **Pré-condição:** Estar na tela de produtos.
- **Passos:**
  1. Clicar em "Adicionar novo produto".
  2. Preencher todos os campos obrigatórios com dados válidos.
  3. Clicar em "Criar produto".
- **Resultado Esperado:**
  - Produto listado na tabela de produtos.
  - Toast/mensagem de confirmação deve ser exibida.
- **Status:** ✅ Passou
- **Observações:** ⚠️ Implementar toast visual de sucesso após cadastro.

---

## ✅ Caso de Teste 003 - Cadastro sem estoque atual

- **Objetivo:** Validar que não é possível cadastrar produto sem informar estoque atual.
- **Pré-condição:** Tela de produtos.
- **Passos:**
  1. Clicar em "Adicionar novo produto".
  2. Preencher os campos exceto "estoque atual".
  3. Clicar em "Criar produto".
- **Resultado Esperado:**
  - Mensagem: "O estoque atual deve ser maior que 0".
- **Status:** ✅ Passou

---

## ✅ Caso de Teste 004 - Edição de produto com valores válidos

- **Objetivo:** Verificar se é possível editar um produto existente com dados válidos.
- **Pré-condição:** Produto já cadastrado.
- **Passos:**
  1. Clicar no botão de edição do primeiro produto.
  2. Alterar os campos "Preço" e "Estoque atual".
  3. Clicar em "Atualizar produto".
- **Resultado Esperado:**
  - Produto atualizado e refletido na tela.
  - Novos valores visíveis.
- **Status:** ✅ Passou
- **Observações:** ⚠️ Implementar formatação adequada para campos numéricos.

---

## ✅ Caso de Teste 005 - Edição com campos vazios

- **Objetivo:** Verificar a validação ao editar um produto com campos obrigatórios vazios.
- **Pré-condição:** Produto cadastrado.
- **Passos:**
  1. Clicar em "Editar".
  2. Limpar todos os campos obrigatórios.
  3. Clicar em "Atualizar produto".
- **Resultado Esperado:**
  - Mensagens de erro devem ser exibidas.
- **Status:** ✅ Passou

---

## ✅ Caso de Teste 006 - Exclusão de produto confirmada

- **Objetivo:** Validar que o produto é removido após confirmação da exclusão.
- **Pré-condição:** Produto cadastrado.
- **Passos:**
  1. Clicar no ícone de excluir.
  2. Confirmar a exclusão.
- **Resultado Esperado:**
  - Produto removido da lista.
  - Toast/mensagem de "produto excluído" deve aparecer.
- **Status:** ✅ Passou
- **Observações:** ⚠️ Implementar toast de exclusão com feedback visual.

---

## ✅ Caso de Teste 007 - Cancelar exclusão de produto

- **Objetivo:** Garantir que o produto não seja excluído ao cancelar a confirmação.
- **Pré-condição:** Produto cadastrado.
- **Passos:**
  1. Clicar em "Excluir".
  2. Cancelar o alerta de confirmação.
- **Resultado Esperado:**
  - Produto permanece na lista.
- **Status:** ✅ Passou
