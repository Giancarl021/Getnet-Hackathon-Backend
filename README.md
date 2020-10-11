# Getnet-Hackathon-Backend

Backend da aplicação Getplace

## Executar

Clone o repositório, então execute os comandos:

Yarn:
```bash
yarn
yarn first-run
yarn dev
```
npm:
```bash
npm install
npm run first-run
npm run dev
```

## Autenticação

A autenticação é feita utilizando JWT. Existem 2 rotas para autenticação e renovação do token:

### Aquisição do token

**Requisição**
```
POST /authenticate
{
    "cnpj": "...",
    "password: "..."
}
```
**Resposta**
```json
{
    "company": "...",
    "bearer_token": "...",
    "expires_in": 3600,
    "refresh_token": "..."
}
```

### Regeneração do token

**Requisição**
```
POST /authenticate
{
    "refresh_token": "..."
}
```
**Resposta**
```json
{
    "company": "...",
    "bearer_token": "...",
    "expires_in": 3600,
    "refresh_token": "..."
}
```

## Rotas

### Meu perfil

**Requisição**
```
GET /me
Authorization: "Bearer ..."
```
**Resposta**
```json
{
    "cnpj": "...",
    "name": "...",
    "getnet_id": "...",
    "longitude": 0,
    "latitude": 0
}
```

### Com quem tenho mensagens

**Requisição**
```
GET /me/messages
Authorization: "Bearer ..."
```
**Resposta**
```
[
    "...",
    "...",
    "..."
]
```

### Mensagens com outra empresa

**Requisição**
```
GET /me/messages/:cnpj?[page=0]
Authorization: "Bearer ..."
```
**Resposta**
```json
{
    "sent": [
        {
            "id": 0,
            "created_at": 0,
            "content": "..."
        }
    ],
    "received": [
        {
            "id": 0,
            "created_at": 0,
            "content": "..."
        }
    ]
}
```

### Enviar mensagem

**Requisição**
```
POST /me/messages/:cnpj
Authorization: "Bearer ..."
{
	"content": "..."
}
```
**Resposta**
```json
{
    "status": "Message sent successfully"
}
```

### Ver meu Serviço

**Requisição**
```
GET /me/service
Authorization: "Bearer ..."
```
**Resposta**
```json
{
    "id": 0,
    "created_at": 0,
    "title": "...",
    "description": "...",
    "price": 0,
    "is_unitary_price": true,
    "is_subscription": true,
    "subscription_span": 0,
    "discount_percentage": 0,
    "is_active": true
}
```

### Listar serviços disponíveis

**Requisição**
```
GET /services?[page=0][[&]type=subscription|unique_payment][[&]query=...][[&]latitude=0&longitude=0]
Authorization: "Bearer ..."
```
**Resposta**
```json
[
    {
        "id": 0,
        "created_at": 0,
        "company_cnpj": "...",
        "title": "...",
        "description": "...",
        "price": 0,
        "is_unitary_price": true,
        "is_subscription": true,
        "subscription_span": 0,
        "discount_percentage": 0,
        "is_active": true
    }
]
```

### Carregar serviço

**Requisição**
```
GET services/:id
Authorization: "Bearer ..."
```
**Resposta**
```json
{
    "id": 0,
    "created_at": 0,
    "company_cnpj": "...",
    "title": "...",
    "description": "...",
    "price": 0,
    "is_unitary_price": true,
    "is_subscription": true,
    "subscription_span": 0,
    "discount_percentage": 0,
    "is_active": true
}
```

### Contratar serviço

**Requisição**
```
POST services/:id?[quantity=0]
Authorization: "Bearer ..."
```
**Resposta**
```json
{
    "status": "Service requested"
}
```

### Carregar empresa

**Requisição**
```
GET company/:id
Authorization: "Bearer ..."
```
**Resposta**
```json
{
    "name": "...",
    "cnpj": "...",
    "latitude": 0,
    "longitude": 0
}
```