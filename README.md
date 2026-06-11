# 🌾 Zênite API

Sistema de observabilidade operacional para distribuidoras agropecuárias desenvolvido para o Hackathon ATRIA.

O projeto combina monitoramento de estoque, automação de processos e inteligência artificial para auxiliar gestores na tomada de decisão, reduzindo perdas operacionais causadas por:

- Ruptura de estoque;
- Produtos vencidos;
- Entregas atrasadas;
- Custos elevados de armazenagem.

---

# 📖 Visão Geral

O Zênite foi projetado para centralizar informações operacionais e transformá-las em indicadores e recomendações executivas através da integração entre:

- API REST (NestJS)
- PostgreSQL
- Prisma ORM
- Redis
- n8n
- Google Sheets
- Google Looker Studio
- OpenAI

A plataforma atua como uma camada de observabilidade operacional para distribuidoras agropecuárias.

---

# 🏗️ Arquitetura

A arquitetura da solução está documentada através de diagramas disponíveis no próprio projeto.

## Arquitetura Geral

![Arquitetura C4](src/shared/storage/docs/c4-diagram.png)

---

## Fluxo de Automação

![Fluxo n8n](src/shared/storage/docs/n8n-workflow.png)

---

## Modelo de Dados

![Modelo de Dados](src/shared/storage/docs/database.png)

---

# 🎯 Objetivo

O objetivo do projeto é monitorar continuamente:

- Estoques críticos;
- Produtos vencidos;
- Entregas atrasadas;
- Custos operacionais relacionados à armazenagem;

e transformar essas informações em ações recomendadas através de automação e inteligência artificial.

---

# 🤖 Uso de Inteligência Artificial

A OpenAI atua como uma camada analítica responsável por:

- Consolidar indicadores operacionais;
- Identificar riscos de ruptura;
- Detectar perdas por vencimento;
- Avaliar atrasos logísticos;
- Gerar recomendações executivas.

### Exemplo

> Foram identificados 12 produtos abaixo do estoque mínimo e 11 entregas atrasadas. Recomenda-se reposição imediata dos itens críticos e revisão dos fornecedores responsáveis pelos atrasos.

---

# ⚙️ Stack Tecnológica

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

- Swagger / OpenAPI

---

# 📂 Estrutura do Projeto

```text
src/

├── app/
│   ├── app.module.ts
│   └── main.ts
│
├── shared/
│   │
│   ├── config/
│   │   ├── app.config.ts
│   │   └── swagger.config.ts
│   │
│   ├── domain/
│   │   ├── dtos/
│   │   ├── errors/
│   │   ├── protocols/
│   │   └── providers/
│   │
│   ├── infra/
│   │   └── modules/
│   │
│   ├── utils/
│   │   ├── constants/
│   │   └── enums/
│   │
│   └── storage/
│       └── docs/
│           ├── c4-diagram.png
│           ├── database.png
│           ├── database.txt
│           └── n8n-workflow.png
│
└── modules/
    ├── product/
    ├── warehouse/
    ├── inventory/
    ├── stock-movement/
    └── report/
```

---

# 🧱 Arquitetura de Módulos

Cada módulo segue uma organização baseada em separação de responsabilidades.

Exemplo:

```text
product/

├── domain/
│   └── dtos/
│
├── http/
│   └── controllers/
│
├── infra/
│   ├── db/
│   │   └── repositories/
│   │
│   ├── modules/
│   │
│   └── usecases/
```

Essa estrutura facilita:

- Testabilidade;
- Reutilização;
- Separação entre domínio e infraestrutura;
- Evolução do projeto.

---

# 🗄️ Domínio da Aplicação

O modelo de dados foi desenhado para atender o fluxo principal do projeto.

## Product

Representa produtos agropecuários.

Exemplos:

- Fertilizantes
- Defensivos
- Sementes
- Rações

---

## Warehouse

Representa armazéns físicos.

Exemplos:

- MG-01
- SP-02
- GO-01
- PR-01

---

## Inventory

Representa o estoque atual por produto e armazém.

---

## StockMovement

Representa entradas e saídas de estoque.

---

## Delivery

Representa entregas e controle logístico.

---

## AIReport

Representa relatórios gerados pela OpenAI.

---

# 📊 Indicadores Monitorados

O dashboard acompanha principalmente:

- Produtos abaixo do estoque mínimo;
- Produtos vencidos;
- Entregas atrasadas;
- Custos de armazenagem;
- Distribuição de estoque por categoria;
- Distribuição de pedidos por status.

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
        ├── Consolidação de Indicadores
        ├── OpenAI
        └── Google Sheets
                │
                ▼
         Looker Studio
```

---

# 🚧 Status Atual

Atualmente o projeto possui:

✅ Estrutura base da aplicação

✅ Arquitetura modular definida

✅ Configurações compartilhadas

✅ Estrutura de documentação

✅ Diagramas arquiteturais

✅ Provider Prisma

🚧 Implementação dos módulos de negócio

🚧 Modelagem Prisma

🚧 Casos de uso

🚧 Integrações com n8n

🚧 Dashboard final

---

# ⚙️ Instalação

## Instalar dependências

```bash
npm install
```

---

## Configurar ambiente

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/zenite"

PORT=3000
```

---

## Executar aplicação

```bash
npm run start:dev
```

---

# 📄 Documentação da API

Após iniciar a aplicação:

```text
http://localhost:3000/docs
```

---

# 🏆 Objetivo do MVP

Demonstrar o fluxo completo:

1. Registro de movimentação;
2. Atualização do estoque;
3. Processamento automático pelo n8n;
4. Geração de recomendações via OpenAI;
5. Atualização do dashboard;
6. Visualização dos indicadores em tempo real.

---

# 👥 Equipe

Projeto desenvolvido durante o Hackathon ATRIA.

**Zênite — Gestão Inteligente de Estoque, Validade e Distribuição**