# 📡 Nexio

**Nexio** é um microserviço **profissional**, **resiliente** e **à prova de quedas/flood** para envio de **Email** e **SMS**, desenvolvido em **NestJS**.  
Ele foi projetado para ser rápido, seguro e escalável, integrando-se facilmente com outros serviços via API REST.

---

## 🚀 Funcionalidades

- 📧 **Envio de Emails** com suporte a templates HTML e variáveis dinâmicas  
- 📱 **Envio de SMS** via provedores confiáveis  
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
[ Email Provider | SMS Provider ]
```

- **NestJS**: Framework backend modular e escalável  
- **BullMQ / Redis**: Gerenciamento de filas e tentativas automáticas  
- **Nodemailer**: Envio de emails  
- **Twilio / AWS SNS**: Envio de SMS  
- **Winston**: Logs estruturados  
- **Helmet / Rate Limiter**: Segurança  

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
JWT_PUBLIC_KEY_PATH=./keys/public.pem

# Email
SMTP_HOST=smtp.seuservidor.com
SMTP_PORT=587
SMTP_USER=seu_usuario
SMTP_PASS=sua_senha

# SMS (exemplo Twilio)
TWILIO_ACCOUNT_SID=xxxx
TWILIO_AUTH_TOKEN=xxxx
TWILIO_FROM=+5511999999999

# Redis (para filas)
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 📚 Rotas Principais

### **Enviar Email**
```http
POST /email/send
Content-Type: application/json
Authorization: Bearer <token>

{
  "to": "usuario@exemplo.com",
  "subject": "Bem-vindo ao Nexio!",
  "template": "welcome",
  "variables": {
    "name": "João"
  }
}
```

### **Enviar SMS**
```http
POST /sms/send
Content-Type: application/json
Authorization: Bearer <token>

{
  "to": "+5511999999999",
  "message": "Seu código é 123456"
}
```

---

## 🛡 Segurança

- Autenticação via **JWT RS256** (chave pública/privada)  
- Limite de requisições por IP (**Rate Limiter**)  
- Proteção contra **spam/flood**  
- Criptografia TLS nas conexões SMTP e APIs SMS  

---

## 📜 Licença

Este projeto está licenciado sob a **MIT License** — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Aricode**  
💻 GitHub: [@higordevv](https://github.com/higordevv)  
