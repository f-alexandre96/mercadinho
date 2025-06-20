# 🛒 Mercadinho Digital

Um sistema completo de e-commerce desenvolvido com HTML, CSS e JavaScript puro, oferecendo uma experiência de compra online moderna e intuitiva.

## ✨ Funcionalidades

### 🔐 Autenticação
- Sistema de login obrigatório para acessar o catálogo
- Credenciais de demonstração: `demo@mercadinho.com` / `123456`
- Persistência de sessão no localStorage

### 🛍️ Catálogo de Produtos
- Carregamento dinâmico de produtos da API [FakeStoreAPI](https://fakestoreapi.com/products)
- Exibição de informações detalhadas: título, descrição, preço e imagem
- Layout responsivo em grid com cards modernos

### 🔍 Busca e Filtros
- Busca em tempo real por título e descrição dos produtos
- Filtros por categoria:
  - Todos os produtos
  - Roupas Masculinas
  - Roupas Femininas
  - Jóias
  - Eletrônicos

### 🛒 Carrinho de Compras
- Adição/remoção de produtos
- Controle de quantidade
- Cálculo automático do total
- Persistência no localStorage
- Sidebar deslizante com overlay

### 💳 Checkout Completo
- Processo em 4 etapas:
  1. **Revisão do Pedido**: Visualização dos itens e total
  2. **Informações de Entrega**: Formulário com validação
  3. **Método de Pagamento**: Cartão, PIX ou Boleto
  4. **Confirmação**: Finalização da compra

## 🚀 Como Usar

1. **Clone ou baixe os arquivos** do projeto
2. **Abra o arquivo `index.html`** em um navegador moderno
3. **Faça login** com as credenciais de demonstração:
   - Email: `demo@mercadinho.com`
   - Senha: `123456`
4. **Navegue pelo catálogo** e adicione produtos ao carrinho
5. **Finalize sua compra** através do processo de checkout

## 📁 Estrutura do Projeto

```
mercadinho/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentação
```

## 🎨 Design e UX

### Características Visuais
- **Design Moderno**: Gradientes, sombras e animações suaves
- **Responsivo**: Adaptação perfeita para desktop, tablet e mobile
- **Paleta de Cores**: Tons de azul e roxo com acentos dourados
- **Tipografia**: Segoe UI para melhor legibilidade

### Experiência do Usuário
- **Feedback Visual**: Notificações toast para ações importantes
- **Navegação Intuitiva**: Interface clara e fácil de usar
- **Animações Suaves**: Transições e hover effects
- **Acessibilidade**: Suporte a teclado (ESC para fechar modais)

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: 
  - Flexbox e Grid para layout
  - Gradientes e sombras
  - Animações e transições
  - Media queries para responsividade
- **JavaScript ES6+**:
  - Async/await para requisições
  - LocalStorage para persistência
  - Event delegation
  - Manipulação dinâmica do DOM

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- **Desktop**: Layout em grid com múltiplas colunas
- **Tablet**: Grid adaptativo com 2-3 colunas
- **Mobile**: Layout em coluna única com navegação otimizada

## 🔒 Segurança e Validação

- **Validação de Formulários**: HTML5 e JavaScript
- **Sanitização de Dados**: Escape de HTML para prevenir XSS
- **Validação de Entrada**: Verificação de tipos e formatos
- **Tratamento de Erros**: Fallbacks para falhas de API

## 🌐 API Externa

O projeto utiliza a [FakeStoreAPI](https://fakestoreapi.com/products) para obter dados de produtos, incluindo:
- Imagens de produtos
- Títulos e descrições
- Preços em dólares (convertidos para Real)
- Categorias para filtros

## 💾 Armazenamento Local

### localStorage
- **currentUser**: Dados do usuário logado
- **cart**: Itens do carrinho de compras

### Persistência
- Os dados persistem entre sessões do navegador
- Limpeza automática no logout
- Sincronização em tempo real

## 🎯 Critérios de Aceitação Atendidos

✅ **Acesso**: Sistema de autenticação obrigatório  
✅ **Catálogo**: Lista completa de produtos com informações detalhadas  
✅ **Seleção**: Navegação e adição de produtos ao carrinho  
✅ **Gestão do Carrinho**: Visualização, adição, remoção e atualização automática  
✅ **Finalização**: Processo completo de checkout em etapas  

## 🔄 Funcionalidades Extras

- **Busca em Tempo Real**: Filtragem instantânea de produtos
- **Filtros por Categoria**: Navegação organizada
- **Notificações Toast**: Feedback visual para ações
- **Animações CSS**: Transições suaves e profissionais
- **Tratamento de Erros**: Fallbacks para imagens e API
- **Navegação por Teclado**: Suporte a ESC para fechar modais

## 🚀 Melhorias Futuras

- [ ] Sistema de avaliações e comentários
- [ ] Lista de favoritos
- [ ] Histórico de pedidos
- [ ] Cupons de desconto
- [ ] Múltiplas moedas
- [ ] Integração com APIs de pagamento reais
- [ ] Sistema de notificações push
- [ ] Modo escuro/claro

## 📄 Licença

Este projeto foi desenvolvido como demonstração de habilidades em desenvolvimento web front-end.

---

**Desenvolvido com ❤️ para o Mercadinho Digital** 