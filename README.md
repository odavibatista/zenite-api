# 🌾 Zênite API

Sistema de observabilidade operacional para distribuidoras agropecuárias, desenvolvido para o Hackathon ATRIA.

O projeto combina automação, monitoramento de estoque e inteligência artificial para auxiliar gestores na tomada de decisão, reduzindo perdas operacionais causadas por ruptura de estoque, vencimento de produtos e atrasos logísticos.

---

# 📖 Visão Geral

A solução Zênite foi concebida para centralizar informações operacionais e transformá-las em indicadores e recomendações acionáveis através da integração entre:

- API REST
- PostgreSQL
- Redis
- n8n
- Google Sheets
- Google Looker Studio
- OpenAI

O objetivo é fornecer visibilidade operacional em tempo real e automatizar a identificação de problemas críticos relacionados à gestão de estoque e distribuição.

---

# 🚀 Arquitetura

A arquitetura da solução foi projetada para separar claramente:

- Persistência de dados;
- Exposição de informações;
- Automação operacional;
- Inteligência analítica;
- Visualização executiva.

![Arquitetura da Solução](src/shared/storage/docs/c4-diagram.png)

## Componentes

| Componente | Responsabilidade |
|------------|------------------|
| API Zênite | Exposição e manipulação dos dados operacionais |
| PostgreSQL | Persistência dos dados |
| Redis | Cache de consultas frequentes |
| n8n | Orquestração das automações |
| Google Sheets | Consolidação dos dados consumidos pelo dashboard |
| Looker Studio | Visualização dos indicadores |
| OpenAI | Geração de recomendações executivas |

---

# 🤖 Fluxo de Automação (n8n)

O n8n atua como o principal orquestrador da solução.

Periodicamente ele consulta a API, processa indicadores e gera recomendações utilizando IA.

![Fluxo n8n](src/shared/storage/docs/n8n-workflow.png)

## Responsabilidades do Workflow

- Consultar estoque atual;
- Identificar produtos abaixo do estoque mínimo;
- Identificar produtos vencidos;
- Consultar pedidos;
- Identificar entregas atrasadas;
- Consolidar indicadores operacionais;
- Acionar a OpenAI;
- Persistir recomendações executivas;
- Atualizar os dados consumidos pelo dashboard.

---

# 🗄️ Modelo de Dados

A modelagem foi construída para suportar o monitoramento operacional sem a complexidade de um ERP completo.

![Modelo de Dados](src/shared/storage/docs/database.png)

## Entidades Principais

| Entidade | Responsabilidade |
|-----------|------------------|
| Product | Produtos agropecuários |
| Warehouse | Armazéns físicos |
| Inventory | Estoque atual por armazém |
| StockMovement | Histórico de movimentações |
| Delivery | Controle logístico |
| AIReport | Relatórios gerados pela IA |

---

# 🎯 Objetivo

Resolver problemas comuns em distribuidoras agropecuárias:

- Produtos abaixo do estoque mínimo;
- Produtos vencidos;
- Entregas atrasadas;
- Custos elevados de armazenagem;
- Falta de visibilidade operacional;
- Dependência de acompanhamento manual.

---

# 🧠 Uso de Inteligência Artificial

A OpenAI atua como uma camada de apoio à decisão.

Os dados consolidados pelo n8n são enviados para análise e transformados em recomendações executivas.

## Entradas

- Estoque crítico;
- Produtos vencidos;
- Entregas atrasadas;
- Indicadores operacionais.

## Saídas

- Identificação de riscos;
- Recomendações de reposição;
- Alertas de vencimento;
- Sugestões operacionais.

### Exemplo

> Foram identificados 12 produtos abaixo do estoque mínimo, 5 produtos vencidos e 11 entregas atrasadas. Recomenda-se reposição imediata dos itens críticos, revisão do processo de controle de validade e acompanhamento dos fornecedores responsáveis pelos atrasos logísticos.

---

# 🏗️ Stack Tecnológica

## Backend

- Node.js
- NestJS
- TypeScript

## Banco de Dados

- PostgreSQL
- Prisma ORM

## Cache

- Redis

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

app/

shared/

modules/

├── products
├── warehouses
├── inventory
├── stock-movements
├── deliveries
└── reports
```

---

# 📊 Dashboard Executivo

O dashboard foi desenvolvido para fornecer uma visão consolidada da operação.

## Indicadores Principais

- Estoque abaixo do mínimo;
- Produtos vencidos;
- Entregas atrasadas;
- Custo total de armazenagem.

## Visualizações

- Concentração de estoque por categoria;
- Distribuição de pedidos por status;
- Recomendações executivas geradas por IA.

Os dados são atualizados automaticamente através da integração entre API, n8n, Google Sheets e Looker Studio.

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

### Exemplo

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

# 🔄 Fluxo Principal

```text
Movimentação de Estoque
        │
        ▼
      API
        │
        ▼
 PostgreSQL
        │
        ▼
       n8n
        │
        ├── Atualiza Indicadores
        ├── Aciona OpenAI
        └── Atualiza Google Sheets
                │
                ▼
         Looker Studio
```

---

# ⚙️ Instalação

## Clonar o projeto

```bash
git clone https://github.com/seu-usuario/zenite-api.git

cd zenite-api
```

## Instalar dependências

```bash
npm install
```

## Configurar ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/zenite"
PORT=3000
```

## Executar migrations

```bash
npx prisma migrate dev
```

## Gerar Prisma Client

```bash
npx prisma generate
```

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

Demonstrar o fluxo completo de negócio:

- Registro de movimentações;
- Atualização de estoque;
- Consulta automatizada dos dados;
- Identificação de indicadores críticos;
- Geração de recomendações por IA;
- Atualização automática do dashboard.

## Cenário Demonstrado

1. Registro de movimentação de estoque;
2. Atualização automática do estoque;
3. Detecção de indicadores críticos;
4. Geração de recomendações pela OpenAI;
5. Atualização do Google Sheets;
6. Atualização do Dashboard no Looker Studio.

---

# 👥 Equipe

Projeto desenvolvido durante o **Hackathon ATRIA**.

**Zênite — Gestão Inteligente de Estoque, Validade e Distribuição**