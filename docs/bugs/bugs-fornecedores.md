# 🐞 Bugs encontrados - QAERP

Relatório de erros encontrados durante os testes da aplicação.

---

## 🧾 Gestão de Fornecedores

### Bug 001 - Falta de toast de confirmação no cadastro
- **Descrição:** Ao cadastrar um novo fornecedor, não é exibida uma mensagem de confirmação.
- **Impacto:** Pode gerar incerteza sobre o sucesso da operação.
- **Status:** ✅ Corrigido

### Bug 002 - Falta de toast de confirmação na edição
- **Descrição:** Ao editar um fornecedor, não aparece mensagem de sucesso.
- **Impacto:** O usuário pode pensar que a atualização falhou.
- **Status:** ✅ Corrigido

### Bug 003 - Falta de toast na exclusão
- **Descrição:** Ao excluir um fornecedor, não há retorno visual de sucesso.
- **Impacto:** Dúvida se o fornecedor foi realmente excluído.
- **Status:** ✅ Corrigido

### Bug 004 - CNPJ sem máscara não é formatado
- **Descrição:** Ao inserir CNPJ sem formatação, ele é exibido sem máscara na listagem.
- **Impacto:** Problemas de leitura e padronização.
- **Status:** ✅ Corrigido

### Bug 005 - Validação fraca de e-mail
- **Descrição:** E-mails sem “@” são aceitos no cadastro.
- **Impacto:** Dados inválidos no sistema.
- **Status:** ✅ Corrigido

### Bug 006 - Telefone sem máscara não é formatado
- **Descrição:** Telefone inserido sem máscara aparece cru na listagem.
- **Impacto:** Falta de padronização e leitura difícil.
- **Status:** ✅ Corrigido

### Bug 007 - Telefone inválido não gera erro
- **Descrição:** Telefone como texto inválido é aceito.
- **Impacto:** Dados inconsistentes no banco.
- **Status:** ✅ Corrigido
