# 🐞 Bugs encontrados - QAERP

Relatório de erros encontrados durante os testes da funcionalidade de **Saída de Inventário**.

---

## 🧾 Gestão de Inventário - Saídas

### Bug 001 - Falta de mensagens de erro no cadastro vazio
- **Descrição:** Ao tentar registrar uma saída sem preencher os campos obrigatórios, as mensagens de erro não são exibidas corretamente.
- **Impacto:** O usuário não sabe quais campos estão faltando para preencher.
- **Status:** ⏳ A corrigir

### Bug 002 - Toast de sucesso não aparece ao registrar saída válida
- **Descrição:** Mesmo preenchendo todos os campos obrigatórios corretamente, o sistema não exibe o toast de confirmação da saída registrada.
- **Impacto:** Gera dúvida se a operação foi concluída com sucesso.
- **Status:** ⏳ A corrigir

### Bug 003 - Campo "Quantidade" aceita valores menores que 1
- **Descrição:** É possível apagar o valor do campo ou inserir "0", o que não deveria ser permitido.
- **Impacto:** Pode causar registros inválidos ou inconsistências no estoque.
- **Status:** ⏳ A corrigir

### Bug 004 - Pesquisa não retorna saídas cadastradas
- **Descrição:** A funcionalidade de pesquisa não está localizando saídas que foram previamente registradas.
- **Impacto:** Dificulta o gerenciamento e localização de saídas existentes.
- **Status:** ⏳ A corrigir

### Bug 005 - Mensagem incorreta para pesquisa de saídas inexistentes
- **Descrição:** Ao pesquisar por um produto inexistente, o sistema não exibe a mensagem esperada.
- **Impacto:** Pode confundir o usuário ao pensar que a funcionalidade de busca está com defeito.
- **Status:** ⏳ A corrigir
