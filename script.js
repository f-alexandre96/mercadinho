// Variáveis globais
let products = [];
let cart = [];
let currentUser = null;
let currentStep = 1;

// Elementos DOM
const loginScreen = document.getElementById('loginScreen');
const mainScreen = document.getElementById('mainScreen');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const productsGrid = document.getElementById('productsGrid');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeCheckout = document.getElementById('closeCheckout');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Função de inicialização
function initializeApp() {
    // Verificar se há usuário logado
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainScreen();
    }
    
    // Carregar carrinho do localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Login
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Busca
    searchInput.addEventListener('input', handleSearch);
    
    // Filtros de categoria
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });
    
    // Carrinho
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    
    // Checkout
    checkoutBtn.addEventListener('click', openCheckout);
    closeCheckout.addEventListener('click', closeCheckoutModal);
    modalOverlay.addEventListener('click', closeCheckoutModal);
}

// Funções de Autenticação
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validação simples para demonstração
    if (email === 'demo@mercadinho.com' && password === '123456') {
        currentUser = {
            email: email,
            name: 'Usuário Demo'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainScreen();
        loadProducts();
    } else {
        alert('Credenciais inválidas! Use: demo@mercadinho.com / 123456');
    }
}

function handleLogout() {
    currentUser = null;
    cart = [];
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    showLoginScreen();
    updateCartDisplay();
}

function showLoginScreen() {
    loginScreen.classList.add('active');
    mainScreen.classList.remove('active');
    loginForm.reset();
}

function showMainScreen() {
    loginScreen.classList.remove('active');
    mainScreen.classList.add('active');
}

// Funções de Produtos
async function loadProducts() {
    try {
        loading.style.display = 'block';
        productsGrid.innerHTML = '';
        
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        
        displayProducts(products);
        loading.style.display = 'none';
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        loading.innerHTML = '<p>Erro ao carregar produtos. Tente novamente.</p>';
    }
}

function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isInCart = cart.find(item => item.id === product.id);
    const buttonText = isInCart ? 'Adicionado ao Carrinho' : 'Adicionar ao Carrinho';
    const buttonDisabled = isInCart ? 'disabled' : '';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image" 
             onerror="this.src='https://via.placeholder.com/300x200?text=Produto'">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">R$ ${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" ${buttonDisabled} onclick="addToCart(${product.id})">
                ${buttonText}
            </button>
        </div>
    `;
    
    return card;
}

// Funções de Busca e Filtro
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    
    let filteredProducts = products;
    
    // Filtrar por categoria
    if (activeCategory && activeCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === activeCategory
        );
    }
    
    // Filtrar por busca
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    displayProducts(filteredProducts);
}

function handleCategoryFilter(e) {
    // Remover classe active de todos os botões
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Adicionar classe active ao botão clicado
    e.target.classList.add('active');
    
    // Aplicar filtros
    handleSearch();
}

// Funções do Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    updateProductButtons();
    
    // Feedback visual
    showNotification('Produto adicionado ao carrinho!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateProductButtons();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    // Atualizar contador do carrinho
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar itens do carrinho
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Carrinho vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image"
                 onerror="this.src='https://via.placeholder.com/60x60?text=Produto'">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remover</button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

function updateProductButtons() {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    buttons.forEach(button => {
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const product = products.find(p => p.title === productTitle);
        
        if (product) {
            const isInCart = cart.find(item => item.id === product.id);
            button.textContent = isInCart ? 'Adicionado ao Carrinho' : 'Adicionar ao Carrinho';
            button.disabled = isInCart;
        }
    });
}

// Funções do Carrinho Sidebar
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Funções de Checkout
function openCheckout() {
    if (cart.length === 0) {
        alert('Adicione produtos ao carrinho antes de finalizar a compra.');
        return;
    }
    
    currentStep = 1;
    updateCheckoutSteps();
    displayOrderSummary();
    
    checkoutModal.classList.add('open');
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('open');
    modalOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function updateCheckoutSteps() {
    // Ocultar todos os passos
    document.querySelectorAll('.checkout-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Mostrar passo atual
    document.getElementById(`step${currentStep}`).classList.add('active');
}

function displayOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    orderSummary.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.title} x${item.quantity}</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderSummary.appendChild(orderItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItem = document.createElement('div');
    totalItem.className = 'order-item';
    totalItem.style.fontWeight = 'bold';
    totalItem.style.borderTop = '2px solid #667eea';
    totalItem.innerHTML = `
        <span>Total</span>
        <span>R$ ${total.toFixed(2)}</span>
    `;
    orderSummary.appendChild(totalItem);
}

// Funções globais para os botões do checkout
function nextStep() {
    if (currentStep === 1) {
        // Validar se há itens no carrinho
        if (cart.length === 0) {
            alert('Adicione produtos ao carrinho antes de continuar.');
            return;
        }
    } else if (currentStep === 2) {
        // Validar formulário de entrega
        const form = document.getElementById('deliveryForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
    }
    
    if (currentStep < 4) {
        currentStep++;
        updateCheckoutSteps();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateCheckoutSteps();
    }
}

function finishCheckout() {
    // Limpar carrinho
    cart = [];
    saveCart();
    updateCartDisplay();
    updateProductButtons();
    
    // Fechar modal
    closeCheckoutModal();
    
    // Mostrar mensagem de sucesso
    showNotification('Compra finalizada com sucesso!');
}

// Função de notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Event listeners para teclas
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (cartSidebar.classList.contains('open')) {
            closeCartSidebar();
        }
        if (checkoutModal.classList.contains('open')) {
            closeCheckoutModal();
        }
    }
}); 