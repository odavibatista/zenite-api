# 🌾 Zênite API

Sistema de observabilidade operacional para distribuidoras agropecuárias, desenvolvido para o Hackathon ATRIA.

O projeto combina automação, monitoramento de estoque e inteligência artificial para auxiliar gestores na tomada de decisão, reduzindo perdas operacionais causadas por ruptura de estoque, vencimento de produtos e atrasos logísticos.

---

## 📖 Visão Geral

A solução Zênite tem como objetivo centralizar informações operacionais e transformá-las em indicadores e recomendações acionáveis através da integração entre:

- API REST
- Banco de Dados PostgreSQL
- Automações com n8n
- Google Sheets
- Google Looker Studio
- OpenAI

---

## 🚀 Arquitetura

```text
                 ┌─────────────┐
                 │   OpenAI    │
                 └──────┬──────┘
                        │
                        ▼

┌──────────┐     ┌──────────┐     ┌──────────────┐
│ NestJS   │────▶│ PostgreSQL│────▶│     n8n      │
│   API    │     │           │     │ Automations  │
└────┬─────┘     └──────────┘     └──────┬───────┘
     │                                   │
     │                                   ▼
     │                         ┌─────────────────┐
     │                         │ Google Sheets   │
     │                         └────────┬────────┘
     │                                  │
     ▼                                  ▼

┌──────────────────────────────────────────────┐
│           Google Looker Studio               │
│      Dashboards & Operational KPIs           │
└──────────────────────────────────────────────┘
```

---

## 🎯 Objetivo

Resolver problemas comuns em distribuidoras agropecuárias:

- Estoque abaixo do mínimo
- Produtos vencidos
- Entregas atrasadas
- Custos elevados de armazenagem
- Falta de visibilidade operacional

---

## 🧠 Uso de Inteligência Artificial

A OpenAI atua como uma camada analítica responsável por:

- Analisar indicadores operacionais;
- Identificar riscos de ruptura de estoque;
- Identificar produtos vencidos;
- Avaliar atrasos logísticos;
- Gerar recomendações executivas.

Exemplo:

> Foram identificados 12 produtos abaixo do estoque mínimo. Recomenda-se reposição imediata para evitar ruptura operacional.

---

# 🏗️ Stack Tecnológica

## Backend

- Node.js
- NestJS
- TypeScript

## Banco de Dados

- PostgreSQL
- Prisma ORM

## Automação

- n8n

## Dashboards

- Google Sheets
- Google Looker Studio

## Inteligência Artificial

- OpenAI

## Documentação

- Swagger/OpenAPI

---

# 📂 Estrutura do Projeto

```text
src/

├── common/
│
├── config/
│
├── database/
│   └── prisma/
│
├── modules/
│   ├── products/
│   ├── warehouses/
│   ├── inventory/
│   ├── stock-movements/
│   ├── deliveries/
│   └── reports/
│
└── main.ts
```

---

# 🗄️ Modelo de Dados

A aplicação possui seis entidades principais:

## Product

Representa um produto agropecuário.

```text
id
name
category
minimumStock
expirationDate
```

---

## Warehouse

Representa um armazém.

```text
id
code
name
city
state
```

---

## Inventory

Representa o estoque atual.

```text
id
productId
warehouseId
quantity
monthlyStorageCost
```

---

## StockMovement

Representa uma movimentação de estoque.

```text
id
productId
warehouseId
movementType
quantity
reason
createdAt
```

---

## Delivery

Representa uma entrega.

```text
id
productId
quantity
expectedDate
deliveredDate
status
```

---

## AIReport

Representa relatórios gerados pela IA.

```text
id
summary
criticalProducts
expiredProducts
delayedDeliveries
generatedAt
```

---

# 📊 Indicadores do Dashboard

O dashboard monitora:

## Estoque Crítico

Produtos abaixo do estoque mínimo.

---

## Produtos Vencidos

Produtos que ultrapassaram a data de validade.

---

## Entregas Atrasadas

Pedidos com atraso logístico.

---

## Custo Total de Armazenagem

Valor financeiro associado ao estoque armazenado.

---

## Recomendações Executivas

Insights gerados automaticamente pela IA.

---

# 🔄 Fluxo Principal

```text
Movimentação de Estoque
          │
          ▼
      API NestJS
          │
          ▼
      PostgreSQL
          │
          ▼
         n8n
          │
          ▼
      OpenAI
          │
          ▼
   Google Sheets
          │
          ▼
  Looker Studio
```

---

# 🤖 Fluxo do n8n

O n8n é responsável por:

1. Consultar periodicamente a API;
2. Buscar dados de estoque;
3. Buscar dados de pedidos;
4. Identificar estoque crítico;
5. Identificar produtos vencidos;
6. Identificar entregas atrasadas;
7. Consolidar indicadores;
8. Acionar a OpenAI;
9. Gerar relatórios executivos;
10. Atualizar os dados consumidos pelo dashboard.

---

# 📡 Endpoints

## Products

```http
GET /products
GET /products/:id
```

---

## Warehouses

```http
GET /warehouses
GET /warehouses/:id
```

---

## Inventory

```http
GET /inventory
GET /inventory/critical
GET /inventory/expiring
GET /inventory/dashboard
```

---

## Stock Movements

```http
GET /stock-movements

POST /stock-movements
```

Exemplo:

```json
{
  "productId": "uuid",
  "warehouseId": "uuid",
  "movementType": "OUTBOUND",
  "quantity": 50,
  "reason": "Venda"
}
```

---

## Deliveries

```http
GET /deliveries

POST /deliveries

PATCH /deliveries/:id/status
```

---

## Reports

```http
GET /reports

GET /reports/latest
```

---

# ⚙️ Instalação

## Clonar o projeto

```bash
git clone https://github.com/seu-usuario/zenite-api.git

cd zenite-api
```

---

## Instalar dependências

```bash
npm install
```

---

## Configurar ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/zenite"
PORT=3000
```

---

## Executar migrations

```bash
npx prisma migrate dev
```

---

## Gerar Prisma Client

```bash
npx prisma generate
```

---

## Executar projeto

```bash
npm run start:dev
```

---

# 📄 Swagger

A documentação da API estará disponível em:

```text
http://localhost:3000/docs
```

---

# 🏆 Objetivo do MVP

Demonstrar o fluxo completo:

- Registro de movimentações;
- Atualização de estoque;
- Automações via n8n;
- Atualização de indicadores;
- Geração de recomendações via IA;
- Visualização em dashboard.

---

# 👥 Equipe

Projeto desenvolvido durante o Hackathon ATRIA.

**Zênite — Gestão Inteligente de Estoque e Distribuição**