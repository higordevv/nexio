# 📡 Nexio

**Nexio** é um microserviço **profissional**, **resiliente** e **à prova de quedas/flood** para envio de **Email**, desenvolvido em **NestJS**.  
Ele foi projetado para ser rápido, seguro e escalável, integrando-se facilmente com outros serviços via API REST.

---

## 🚀 Funcionalidades

- 📧 **Envio de Emails** com suporte a templates HTML e variáveis dinâmicas  
- 🔐 Autenticação via **JWT RS256** (chave pública/privada)  
- 🛡 Proteção contra **flood**, **reenvios duplicados** e **falhas de rede**  
- 📊 Logs e métricas para monitoramento de envios  
- ♻️ Fila de reenvio automático em caso de falha  
- 🌐 Totalmente integrável com outros backends  

---

## 🏗 Arquitetura

```
[ Client API Request ]
        ↓
[ Nexio Controller ]
        ↓
[ Service Layer ]
        ↓
[ Queue / Retry Logic ]
        ↓
[ Email Provider]
```

### Tecnologias:
- **NestJS**: Framework backend modular e escalável  
- **BullMQ / Redis**: Gerenciamento de filas e tentativas automáticas  
- **Nodemailer**: Envio de emails  

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seuusuario/nexio.git

# Entre na pasta
cd nexio

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Rode o servidor
npm run start:dev
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` com:

```env
# Porta do serviço
PORT=3000

# JWT
KEY_PATH==./keys/public.pem

#PostgreSQL
DATABASE_URL=
PORT=

#GMAIL
GOOGLE_APP_PASSWORD=
GOOGLE_APP_EMAIL=

---

## 📚 Rotas Principais

### **Enviar Email**
```http
POST /email/send
Content-Type: application/json
Authorization: Bearer <token>


{
   "to": "usuario@exemplo.com",
   "subject": "Assunto exemplo",
   "bodyHtml": "<h1>Olá Mundo <h1/>"
}
```
---

## 🛡 Segurança

- Autenticação via **JWT RS256** (chave pública/privada)  
- Criptografia TLS nas conexões SMTP 

---

## 📜 Licença

Este projeto está licenciado sob a **MIT License** — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Aricode**  
💻 GitHub: [@higordevv](https://github.com/higordevv)  
