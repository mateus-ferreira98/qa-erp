# 🐞 Bugs encontrados - QAERP

Relatório de erros encontrados durante os testes da funcionalidade de **Inventário Entrada**.

---

## 🧾 Gestão de Inventário

### Bug 001 - Falta de mensagens de erro no cadastro vazio
- **Descrição:** Ao tentar registrar uma entrada sem preencher campos obrigatórios, as mensagens de erro não são exibidas corretamente.
- **Impacto:** Usuário não sabe quais campos precisam ser preenchidos.
- **Status:** ⏳ A corrigir

### Bug 002 - Falha ao registrar entrada válida
- **Descrição:** Mesmo preenchendo todos os campos obrigatórios, não aparece o toast de sucesso.
- **Impacto:** Impede o uso básico da funcionalidade de entradas de inventário.
- **Status:** ⏳ A corrigir

### Bug 003 - Cálculo incorreto do custo total
- **Descrição:** O sistema não calcula corretamente o valor total baseado na quantidade e preço unitário.
- **Impacto:** Valores financeiros errados no inventário.
- **Status:** ⏳ A corrigir

### Bug 004 - Campo "Preço Unitário" habilitado para edição
- **Descrição:** O campo "Preço Unitário" está habilitado para edição manual, o que pode gerar inconsistências nos dados.
- **Impacto:** Risco de alterações incorretas de preço.
- **Status:** ⏳ A corrigir

### Bug 005 - Campo "Número da Fatura" aceita caracteres inválidos
- **Descrição:** É possível inserir letras e outros caracteres que não sejam números no campo "Número da Fatura".
- **Impacto:** Dados inconsistentes e problemas futuros no processamento de faturas.
- **Status:** ⏳ A corrigir

### Bug 006 - Campo "Quantidade" permite valores inválidos
- **Descrição:** O campo "Quantidade" permite inserir valores menores que 1, como zero ou valor vazio.
- **Impacto:** Entradas inválidas que podem afetar o estoque.
- **Status:** ⏳ A corrigir
