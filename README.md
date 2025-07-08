# 🎨 Portfólio Pessoal | Frontend com React e Next.js

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge\&logo=nextdotjs)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge\&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=for-the-badge\&logo=tailwindcss)
![Axios](https://img.shields.io/badge/Axios-HTTP-blue?style=for-the-badge\&logo=axios\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-purple?style=for-the-badge\&logo=jsonwebtokens)

Este repositório contém o **frontend** da minha aplicação de portfólio pessoal, desenvolvida com **React**, **Next.js** e **Tailwind CSS**. A interface permite a exibição de projetos públicos e inclui um **painel administrativo seguro**, integrado com uma **API Java/Spring Boot** para gestão de conteúdo.

---

## ✨ Funcionalidades

* **Painel de Administração Seguro:** Acesso protegido por login e rotas privadas com autenticação JWT.
* **CRUD de Projetos:** Área administrativa com criação, edição, visualização e remoção de projetos.
* **Upload de Imagens com Compressão:** As imagens são comprimidas no navegador antes de serem enviadas ao servidor.
* **Validações Avançadas de Formulário:** Verificação de campos obrigatórios, tipo e tamanho de arquivos.
* **Design Responsivo:** Interface moderna com layout adaptável usando **Tailwind CSS**.
* **Rotas e Layouts Dinâmicos:** App Router do Next.js para organização entre área pública e privada.
* **Autenticação JWT:** Integração com backend para obter e armazenar tokens JWT, garantindo segurança nas rotas protegidas.

---

## 🛠️ Tecnologias Utilizadas

| Categoria                   | Tecnologias/Ferramentas            |
| --------------------------- | ---------------------------------- |
| **Framework**               | Next.js (App Router)               |
| **Linguagem**               | TypeScript                         |
| **Biblioteca UI**           | React                              |
| **Estilização**             | Tailwind CSS                       |
| **HTTP Client**             | Axios                              |
| **Gerenciamento de Estado** | React Context API                  |
| **Autenticação**            | JWT                                |
| **Outros**                  | Compressão de Imagem (Client-side) |

---

## 🚀 Como Executar Localmente

### Pré-requisitos

* Node.js 18+
* Yarn ou NPM
* Servidor Backend rodando localmente ([ver repositório](https://github.com/Slotov7/guilherme_araujo_port_back))

### Passo a passo

1. **Clone o repositório:**

```bash
git clone https://github.com/Slotov7/guilherme_araujo_port_front.git
cd guilherme_araujo_port_front
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente:**

```bash
cp .env.example .env.local
```

Preencha o `.env.local` com a URL da sua API:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

4. **Execute o projeto:**

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em:
📍 `http://localhost:3000`

---

## 🔐 Autenticação com JWT

1. Realize o login na rota `/login`.
2. O token JWT será armazenado no contexto global e usado para autenticar requisições.
3. As páginas administrativas são protegidas: apenas usuários autenticados podem acessá-las.

---

## 📂 Estrutura de Pastas

```
📁 src
├── 📁 app              # Estrutura de rotas com App Router
├── 📁 components       # Componentes reutilizáveis
├── 📁 context          # Contextos globais (ex: Auth)
├── 📁 services         # Serviços e chamadas HTTP (Axios)
└── 📁 types            # Tipagens TypeScript 
```

---

## 🤝 Integração com o Backend

Este projeto depende da API Spring Boot que fornece:

* Autenticação via JWT
* Endpoints para CRUD de projetos
* Envio de mensagens de contato

🔗 Repositório do backend: [guilherme\_araujo\_port\_back](https://github.com/Slotov7/guilherme_araujo_port_back)

---
Desenvolvido por **Guilherme Araújo**
