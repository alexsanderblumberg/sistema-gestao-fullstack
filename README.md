# Sistema de Gestão de Compromissos 📅

Uma aplicação Full-Stack (CRUD completo) para gestão de compromissos diários. Este projeto foi desenvolvido para demonstrar competências na criação de APIs RESTful e integração com interfaces modernas baseadas em componentes.

## 🚀 Tecnologias Utilizadas

**Front-end:**
* React (configurado com Vite)
* Axios (comunicação com a API)
* React Hook Form (gestão e validação do formulário)
* SweetAlert2 (notificações e alertas visuais)
* React Icons

**Back-end & Base de Dados:**
* Node.js com framework Express
* MySQL (Base de dados relacional com pool de ligações)

## ⚙️ Funcionalidades
* **Dashboard Interativo:** Contadores em tempo real que calculam o total de compromissos, os pendentes e os concluídos.
* **Criar (Create):** Inserção de novos compromissos (título, data/hora e descrição) no banco de dados.
* **Ler (Read):** Listagem dinâmica das informações diretamente do MySQL para a interface.
* **Atualizar (Update):** Capacidade de marcar compromissos como "Concluídos", alterando o estado visual e o registo no servidor.
* **Apagar (Delete):** Remoção de registos com sistema de confirmação seguro.

## 👨‍💻 Como correr o projeto localmente

### 1. Base de Dados
Crie uma base de dados MySQL chamada `sistema_gestao` e execute o script SQL para criar a tabela de compromissos.

### 2. Back-end (API)
Na pasta `api-gestao`:
- Crie um ficheiro `.env` com as suas credenciais MySQL (PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).
- Execute `npm install`
- Execute `npm run dev` (A API ficará disponível na porta 3001)

### 3. Front-end
Na pasta `frontend-gestao`:
- Execute `npm install`
- Execute `npm run dev`
- Aceda a `http://localhost:5173` no seu navegador.