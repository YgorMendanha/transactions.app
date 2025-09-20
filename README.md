# Transactions.app — Dashboard com login (Next.js 15)

**Descrição**
Projeto exemplo de um dashboard financeiro com autenticação (login por JWT), tema claro/escuro (persistido por cookie), tabelas, filtros e gráficos. Desenvolvido com Next.js 15 (App Router), styled-components e Recharts — pensado para ser uma base prática para aplicações internas/administrativas.

**Principais recursos**

- Login via rota API que retorna JWT.
- Proteção de rotas (server-side) usando validação do token.
- Theme (light/dark) com persistência via cookie.
- Styled-components configurado para Server-Side Rendering (App Router).
- Dashboard com Sidebar, Header, Cards, Tabela de transações e gráficos (Recharts).
- Filtros por data, conta, indústria, estado e tipo; filtros sincronizados com query string.
- Responsividade e otimizações para mobile (scroll horizontal em tabelas, colapso da sidebar).

## Tech stack

- Next.js 15 (App Router)
- React (compon. client/server)
- styled-components
- react-hook-form
- react-hot-toast
- js-cookie
- recharts
- react-date-range + dayjs

## Pré-requisitos

- Node.js >= 18
- npm ou yarn

## Instalação e execução (local)

1. Clone o repositório:
    
    ```bash
    git clone https://github.com/YgorMendanha/transactions.app.git
    cd transactions.app
    ```
    
2.  Instale dependências:
    
    ```bash
    npm install
    # ou
    # yarn
    ```
    
3. Variáveis de ambiente (crie *.env.local*):
    
    ```bash
    JWT_SECRET=uma_chave_secreta_de_teste
    ```
    
4. Rodar em desenvolvimento:

    
    ```bash
    npm run dev
    # ou: yarn dev
    ```
    
5. Build e start:
    
    ```bash
    npm run build
    npm start
    ```