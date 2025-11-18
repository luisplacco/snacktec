# SnackTec - Sistema de Pedidos para Cantinas Escolares

**Sistema mobile completo para gerenciamento de pedidos em cantinas escolares, desenvolvido com React Native e Node.js.**

---

## Sobre o Projeto

O **SnackTec** é um aplicativo móvel desenvolvido como Trabalho de Conclusão de Curso (TCC) que facilita o processo de pedidos em cantinas escolares. O sistema oferece uma experiência completa tanto para estudantes quanto para administradores da cantina.

### Objetivos
- Digitalizar o processo de pedidos em cantinas escolares
- Reduzir filas e tempo de espera
- Facilitar o gerenciamento de produtos e pedidos
- Melhorar a comunicação entre estudantes e cantina
- Proporcionar controle financeiro e estatísticas para administradores

---

## Funcionalidades

### Para Estudantes
- **Cadastro e Login** com validação de RA institucional
- **Carrinho de Compras** com cálculo automático de totais
- **Catálogo de Produtos** organizado por categorias
- **Pedidos em Tempo Real** com acompanhamento de status
- **Chat de Suporte** direto com a cantina
- **Histórico de Pedidos** completo
- **Sistema de Favoritos** para produtos preferidos

### Para Administradores
- **Dashboard Completo** com estatísticas em tempo real
- **Gerenciamento de Pedidos** com controle de status
- **CRUD de Produtos** com categorização
- **Sistema de Chat** para suporte aos estudantes
- **Relatórios e Histórico** detalhados
- **Configurações do Sistema**

---

## Tecnologias Utilizadas

### Frontend (Mobile)
- **React Native** - Framework para desenvolvimento móvel
- **Expo** - Plataforma de desenvolvimento
- **React Navigation** - Navegação entre telas
- **Axios** - Cliente HTTP para API
- **AsyncStorage** - Armazenamento local

### Backend (API)
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **CORS** - Política de origem cruzada

---

## Como Executar

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go (app móvel para testes)

### Frontend (Mobile)

```bash
# Clone o repositório
git clone https://github.com/luisplacco/snacktec-mobile.git

# Entre na pasta do projeto
cd snacktec-mobile

# Instale as dependências
npm install

# Execute o projeto
npx expo start
```

### Backend (API)

```bash
# Clone o repositório do backend
git clone https://github.com/luisplacco/snacktec-api.git

# Entre na pasta do projeto
cd snacktec-api

# Instale as dependências
npm install

# Execute o servidor
node src/index.js
```

**O servidor rodará na porta 3001**

---

## Estrutura do Projeto

### Frontend
```
src/
├── components/          # Componentes reutilizáveis
├── screens/            # Telas do aplicativo
├── contexts/           # Contextos React (Auth, Cart)
├── constants/          # Constantes (API, cores, ícones)
├── storage/            # AsyncStorage helpers
└── routes.js           # Configuração de rotas
```

### Backend
```
src/
├── controllers/        # Controladores das rotas
├── services/          # Lógica de negócio
├── repositories/      # Acesso aos dados
├── database/          # Configuração do banco
├── middlewares/       # Middlewares (auth, cors)
└── routes.js          # Definição das rotas
```

---

## Credenciais de Teste

### Administrador
- **RA:** `12345678`
- **Senha:** `marcosadm2025`

### Estudante
- Criar nova conta através do app
- RA deve ter entre 10-15 dígitos

---

## Funcionalidades Implementadas

### Sistema de Autenticação
- [x] Cadastro de usuários
- [x] Login com JWT
- [x] Validação de RA institucional
- [x] Logout seguro

### Gestão de Produtos
- [x] Listagem de produtos
- [x] Categorização (Lanches, Bebidas, Doces)
- [x] CRUD completo (Admin)
- [x] Sistema de favoritos

### Sistema de Pedidos
- [x] Carrinho de compras
- [x] Cálculo de totais
- [x] Histórico de pedidos
- [x] Status de pedidos
- [x] Gerenciamento admin

### Chat em Tempo Real
- [x] Comunicação aluno-admin
- [x] Interface intuitiva
- [x] Notificações de mensagens
- [x] Histórico de conversas

### Painel Administrativo
- [x] Dashboard com estatísticas
- [x] Navegação por abas
- [x] Gerenciamento de produtos
- [x] Controle de pedidos
- [x] Sistema de chat integrado

---

## Interface

O aplicativo conta com uma interface moderna e intuitiva, seguindo as melhores práticas de UX/UI:

- **Design responsivo** para diferentes tamanhos de tela
- **Cores consistentes** com a identidade visual
- **Navegação intuitiva** com abas inferiores
- **Feedback visual** para todas as ações
- **Animações suaves** para transições

---

## Segurança

- **Autenticação JWT** para todas as rotas protegidas
- **Criptografia bcrypt** para senhas
- **Validação de dados** no frontend e backend
- **Sanitização de entradas** para prevenir ataques
- **Controle de acesso** baseado em perfis

---

## Estatísticas do Projeto

- **Telas:** 15+ telas implementadas
- **Componentes:** 8 componentes reutilizáveis
- **Endpoints:** 20+ rotas de API
- **Validações:** Sistema robusto de validações
- **Tempo de desenvolvimento:** 6 meses

---

## Contribuição

Este é um projeto acadêmico (TCC), mas sugestões e melhorias são bem-vindas:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos como Trabalho de Conclusão de Curso.

---

## Autor

**Luis Felipe de Lima Placco**
- RA: 1961432512008
- Email: luis@exemplo.com
- LinkedIn: [Luis Felipe Placco](https://linkedin.com/in/luisplacco)
- GitHub: [@luisplacco](https://github.com/luisplacco)

---

## Agradecimentos

- **Orientador:** Prof. [Nome do Orientador]
- **Instituição:** [Nome da Instituição]
- **Colegas de curso** pelo apoio e feedback
- **Comunidade React Native** pelas referências e documentação

---

## Suporte

Em caso de dúvidas ou problemas:

1. Verifique a [documentação](#como-executar)
2. Consulte as [issues](https://github.com/luisplacco/snacktec/issues)
3. Entre em contato: luis@exemplo.com

---

*Desenvolvido para o TCC 2025*