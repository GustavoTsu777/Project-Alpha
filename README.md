# 🏋️ Project Alpha - Website

[![Vercel Deployment](https://img.shields.io/badge/deployment-vercel-informational?style=flat-square)](https://vercel.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> Uma plataforma digital moderna e responsiva para uma academia de fitness com integração de e-commerce de suplementos.

## 📋 Sobre o Projeto

O **Project Alpha** é um projeto acadêmico desenvolvido com o objetivo de apresentar uma solução digital completa para uma academia fictícia voltada ao segmento de saúde, condicionamento físico e suplementação.

O site foi criado para representar a presença digital de uma empresa de fitness, oferecendo uma interface moderna, responsiva e intuitiva. A proposta integra informações institucionais, modalidades, planos, área de cadastro de clientes, loja de suplementos e conteúdos relacionados à saúde e qualidade de vida.

O projeto contempla conceitos fundamentais de desenvolvimento web moderno, incluindo:
- ✅ Design responsivo (mobile-first)
- ✅ Ergonomia e acessibilidade web
- ✅ Experiência do usuário (UX)
- ✅ Otimização de performance
- ✅ Boas práticas de HTML5 semântico

## ✨ Funcionalidades

- 🏠 **Página inicial responsiva** - Design atrativo e adaptável a todos os dispositivos
- 🏢 **Apresentação institucional** - Seção de missão, visão e valores
- 💪 **Modalidades e planos** - Catálogo de serviços e opções de assinatura
- 📝 **Cadastro de clientes** - Formulário de registro intuitivo
- 🛒 **Loja virtual de suplementos** - E-commerce integrado
- ♿ **Acessibilidade** - Conformidade com padrões de acessibilidade web
- 📱 **Mobile-first** - Navegação otimizada para todos os tamanhos de tela
- 🎨 **Interface moderna** - Design limpo e profissional

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-----------|-----------|
| **HTML5** | Estrutura semântica e moderna |
| **CSS3** | Estilos avançados e responsivos |
| **JavaScript** | Interatividade e funcionalidades dinâmicas |
| **Vercel** | Hospedagem e deployment |

## 📁 Estrutura do Projeto

```
Project-Alpha-Website/
│
├── index.html                       # Página inicial e landing page
├── README.md                        # Documentação do projeto
├── vercel.json                      # Configuração de rotas do Vercel
│
├── 📁 css/                          # Folhas de estilo
│   ├── estilo.css                   # Estilos da página inicial
│   ├── estilo2.css                  # Estilos da loja virtual
│   └── estilo3.css                  # Estilos dos dashboards e áreas do aluno
│
├── 📁 html/                         # Páginas HTML (diretório de rotas)
│   ├── area-do-aluno.html           # Portal do aluno - área pessoal e boas-vindas
│   ├── dashboard-alunos.html        # Dashboard de agendamentos e avaliações
│   ├── dashboard-2.html             # Dashboard administrativo (personal/instrutores)
│   ├── perfil-e-dados.html          # Gerenciamento de perfil e dados pessoais
│   ├── lojaVTeste.html              # Loja virtual de suplementos e produtos
│   ├── teste-cadastro.html          # Formulário de registro de novos clientes
│   ├── Sitezin.html                 # Painel de gestão de clientes
│   │
│   └── 📁 imagens/                  # Recursos visuais e mídia
│       ├── logo.png                 # Logo principal
│       ├── Logo-nav.png             # Logo para navegação
│       ├── Logo222.png              # Variação da logo
│       ├── perfil.png               # Ícone de perfil padrão
│       ├── Faviicon-alpha.png       # Favicon do projeto
│       ├── favicon.ico              # Favicon (formato ico)
│       ├── Acade3.jpg               # Imagem de contexto (academia)
│       ├── Devnexus.png             # Logo parceira
│       ├── produto1.png até produto10.png  # Imagens de produtos da loja
│       └── Seta_ativa.png           # Ícone de seta ativa
│
├── 📁 js/                           # Scripts JavaScript
│   └── acessibilidade.js            # Sistema de acessibilidade (fonte, daltonismo, LIBRAS)
│
└── 📁 .git/                         # Controle de versão Git
```

## 🚀 Como Executar

### Opção 1: Abrir localmente
1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` em seu navegador
3. Navegue pelos diferentes módulos do site

### Opção 2: Com um servidor local (recomendado)
```bash
# Usando Python 3
python -m http.server 8000

# Ou usando Node.js com http-server
npx http-server

# Ou usando Live Server no VS Code
# Instale a extensão Live Server e clique "Open with Live Server"
```

Acesse `http://localhost:8000` (ou conforme indicado)

### Opção 3: Deployment no Vercel
```bash
# O projeto já está configurado para Vercel
# Faça push para o GitHub e conecte seu repositório ao Vercel
```

## 📖 Páginas Principais

- **`index.html`** - Página inicial com apresentação da academia
- **`html/area-do-aluno.html`** - Portal do aluno/cliente
- **`html/teste-cadastro.html`** - Sistema de registro de novos clientes
- **`html/lojaVTeste.html`** - Catálogo de suplementos
- **`html/perfil-e-dados.html`** - Gerenciamento de perfil do usuário
- **`html/dashboard-alunos.html`** - Painel administrativo

## 🎯 Objetivo

Demonstrar a aplicação prática de conceitos fundamentais de desenvolvimento web, incluindo:
- Design responsivo e mobile-first
- Padrões de acessibilidade (WCAG)
- Experiência do usuário intuitiva
- Estrutura HTML semântica
- Arquitetura CSS modular
- Interatividade com JavaScript

## 📚 Recursos e Referências

- [MDN Web Docs - HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [MDN Web Docs - CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [Guia de Acessibilidade Web](https://www.w3.org/WAI/fundamentals/accessibility-intro/pt-BR)
- [Documentação Vercel](https://vercel.com/docs)

## � Histórico de Versões

### v2.0.0 - Atualização Geral de Acessibilidade
**Data:** 2026-08-15

#### 🚀 Adicionado
- **Menu Flutuante de Acessibilidade (JS Global):** Painel interativo fixo para controle de tamanho de fonte e daltonismo
- **Filtros CSS de Daltonismo:** Classes no `<body>` que aplicam matrizes de cores SVG para Protanopia, Deuteranopia e Tritanopia
- **Modo Alto Contraste:** Tema escuro de alto contraste (`.alto-contraste`) injetado via CSS
- **Widget VLibras:** Integração oficial da ferramenta de tradução em LIBRAS

#### 🔧 Modificado
- **Árvore do DOM & Foco (Tabindex):** Correção da ordem sequencial de navegação por teclado em elementos interativos e painéis (Dashboards)
- **Semântica ARIA & Atributos:** Inclusão de `aria-label`, `aria-expanded` e `aria-hidden` em botões de ícone e elementos gráficos
- **Descrições de Mídia:** Inclusão de atributos `alt` descritivos ou vazios (decorativos) em todas as imagens do diretório `html/imagens`

---

## �👨‍💻 Autor

**Gustavo Santos**  
Acadêmico de Análise e Desenvolvimento de Sistemas (ADS)

## 📞 Contato e Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato através do repositório GitHub.

## 📄 Licença

Este projeto é fornecido como material educacional. Todos os direitos reservados ao autor.

---

<div align="center">
  
**Desenvolvido para fins acadêmicos**

</div>
