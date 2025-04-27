## ✅ Caso de Teste 001 - Cadastro de entrada vazio

- **Objetivo:** Garantir que o sistema exiba mensagens de erro ao tentar registrar uma entrada sem preencher os campos obrigatórios.
- **Pré-condição:** Estar na tela de entradas de inventário.
- **Passos:**
  1. Clicar em "Registrar nova entrada".
  2. Clicar em "Registrar entrada" sem preencher nenhum campo.
- **Resultado Esperado:**
  - Mensagens de erro:
    - "O produto é obrigatório"
    - "O fornecedor é obrigatório"
    - "A quantidade é obrigatória"
    - "A data de entrada é obrigatória"
    - "O número da fatura é obrigatório"
- **Status:** ❌ Falhou

---

## ✅ Caso de Teste 002 - Cadastro de entrada válido

- **Objetivo:** Verificar se é possível registrar uma entrada preenchendo todos os campos obrigatórios corretamente.
- **Pré-condição:** Estar na tela de entradas de inventário.
- **Passos:**
  1. Clicar em "Registrar nova entrada".
  2. Preencher todos os campos obrigatórios.
  3. Clicar em "Registrar entrada".
- **Resultado Esperado:**
  - Entrada listada corretamente com produto, fornecedor, quantidade, data e valor total.
- **Status:** ❌ Falhou

---

## ✅ Caso de Teste 003 - Verificar cálculo de custo total

- **Objetivo:** Verificar se o sistema calcula corretamente o custo total com base na quantidade e no preço unitário do produto.
- **Pré-condição:** Estar na tela de novas entradas.
- **Passos:**
  1. Clicar em "Registrar nova entrada".
  2. Selecionar um produto e inserir quantidade.
- **Resultado Esperado:**
  - Exibição correta do "Custo total" baseado no preço e quantidade.
- **Status:** ❌ Falhou

---

## ✅ Caso de Teste 004 - Verificar campo preço unitário desabilitado

- **Objetivo:** Garantir que o campo "Preço unitário" esteja desabilitado para edição.
- **Pré-condição:** Estar na tela de novas entradas.
- **Passos:**
  1. Clicar em "Registrar nova entrada".
- **Resultado Esperado:**
  - Campo "Preço unitário" desabilitado.
- **Status:** ❌ Falhou

---

## ✅ Caso de Teste 005 - Campo número da fatura não aceita caracteres não numéricos

- **Objetivo:** Verificar se o campo "Número da fatura" aceita apenas números.
- **Pré-condição:** Estar na tela de novas entradas.
- **Passos:**
  1. Clicar em "Registrar nova entrada".
  2. Tentar inserir letras no campo "Número da fatura".
- **Resultado Esperado:**
  - Campo não aceita caracteres não numéricos.
- **Status:** ❌ Falhou

---

## ✅ Caso de Teste 006 - Campo quantidade não aceita valores menores que 1

- **Objetivo:** Garantir que o campo "Quantidade" não permita valores menores que 1.
- **Pré-condição:** Estar na tela de novas entradas.
- **Passos:**
  1. Clicar em "Registrar nova entrada".
  2. Tentar inserir "0" ou apagar o valor.
- **Resultado Esperado:**
  - Campo mantém valor mínimo igual a 1.
- **Status:** ❌ Falhou

---

## ✅ Caso de Teste 007 - Pesquisar itens existentes

- **Objetivo:** Verificar se a pesquisa retorna corretamente itens existentes na lista de entradas.
- **Pré-condição:** Entrada de inventário previamente cadastrada.
- **Passos:**
  1. Utilizar a barra de pesquisa para procurar o produto existente.
- **Resultado Esperado:**
  - Produto aparece na listagem.
- **Status:** ✅ Passou

---

## ✅ Caso de Teste 008 - Pesquisar itens inexistentes

- **Objetivo:** Verificar se o sistema exibe a mensagem adequada ao pesquisar um produto inexistente.
- **Pré-condição:** Estar na tela de entradas de inventário.
- **Passos:**
  1. Digitar um nome de produto inexistente na barra de pesquisa.
- **Resultado Esperado:**
  - Exibição da mensagem "Nenhuma entrada de inventário encontrada".
- **Status:** ✅ Passou
