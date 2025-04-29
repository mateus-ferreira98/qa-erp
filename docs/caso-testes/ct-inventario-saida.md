# ✅ Casos de Teste - Saída de Inventário

---

## ✅ Caso de Teste 001 - Cadastro de saída vazio

- **Objetivo:** Garantir que o sistema exiba mensagens de erro ao tentar registrar uma saída sem preencher os campos obrigatórios.  
- **Pré-condição:** Estar na tela de saídas de inventário.  
- **Passos:**  
  1. Clicar em "Registrar nova saída".  
  2. Clicar em "Registrar saída" sem preencher nenhum campo.  
- **Resultado Esperado:**  
  - Mensagens de erro:  
    - "O produto é obrigatório"  
    - "O tipo de saída é obrigatório"  
    - "A quantidade é obrigatória"  
    - "A data de saída é obrigatória"  
- **Status:** ❌ Falhou  

---

## ✅ Caso de Teste 002 - Cadastro de saída válido

- **Objetivo:** Verificar se é possível registrar uma saída preenchendo todos os campos obrigatórios corretamente.  
- **Pré-condição:** Estar na tela de saídas de inventário.  
- **Passos:**  
  1. Clicar em "Registrar nova saída".  
  2. Preencher todos os campos obrigatórios.  
  3. Clicar em "Registrar saída".  
- **Resultado Esperado:**  
  - Saída listada corretamente com produto, tipo de saída, quantidade e data.  
- **Status:** ❌ Falhou 

---

## ✅ Caso de Teste 003 - Verificar estoque atual e estoque mínimo

- **Objetivo:** Validar se o sistema exibe corretamente o estoque atual e o estoque mínimo ao selecionar um produto.  
- **Pré-condição:** Estar na tela de novas saídas.  
- **Passos:**  
  1. Clicar em "Registrar nova saída".  
  2. Selecionar um produto.  
- **Resultado Esperado:**  
  - Exibição dos dados:
    - "Estoque atual: 15 UN"
    - "Estoque Mínimo: 5 UN"  
- **Status:** ✅ Passou  

---

## ✅ Caso de Teste 004 - Campo quantidade não aceita valores menores que 1

- **Objetivo:** Garantir que o campo "Quantidade" não permita valores menores que 1.  
- **Pré-condição:** Estar na tela de novas saídas.  
- **Passos:**  
  1. Clicar em "Registrar nova saída".  
  2. Tentar apagar o valor do campo ou inserir "0".  
- **Resultado Esperado:**  
  - Campo mantém valor mínimo igual a 1.  
- **Status:** ❌ Falhou  

---

## ✅ Caso de Teste 005 - Pesquisar saídas existentes

- **Objetivo:** Verificar se a pesquisa retorna corretamente saídas existentes na lista.  
- **Pré-condição:** Saída de inventário previamente cadastrada.  
- **Passos:**  
  1. Utilizar a barra de pesquisa para procurar um item existente.  
- **Resultado Esperado:**  
  - Produto aparece na listagem.  
- **Status:** ❌ Falhou 

---

## ✅ Caso de Teste 006 - Pesquisar saídas inexistentes

- **Objetivo:** Verificar se o sistema exibe a mensagem adequada ao pesquisar um produto inexistente.  
- **Pré-condição:** Estar na tela de saídas de inventário.  
- **Passos:**  
  1. Digitar um nome de produto inexistente na barra de pesquisa.  
- **Resultado Esperado:**  
  - Exibição da mensagem "Nenhuma saída de inventário encontrada".  
- **Status:** ❌ Falhou 
