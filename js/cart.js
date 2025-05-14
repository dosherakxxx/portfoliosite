class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.renderCartCount();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Cart icon click
        document.getElementById('cartIcon').addEventListener('click', () => {
            document.getElementById('cartSidebar').classList.add('active');
        });

        // Close cart
        document.querySelector('.close-cart').addEventListener('click', () => {
            document.getElementById('cartSidebar').classList.remove('active');
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const { id, name, price } = e.target.dataset;
                this.addItem({ id, name, price: parseInt(price) });
            });
        });

        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkout();
        });
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ ...item, quantity: 1 });
        }

        this.updateCart();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateCart();
    }

    updateCart() {
        this.calculateTotal();
        this.saveToLocalStorage();
        this.renderCart();
        this.renderCartCount();
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);
    }

    renderCart() {
        const cartItems = document.querySelector('.cart-items');
        const totalElement = document.querySelector('.total-price');

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} ₸ × ${item.quantity}</div>
                </div>
                <i class="fas fa-times remove-item" data-id="${item.id}"></i>
            </div>
        `).join('');

        totalElement.textContent = `${this.total} ₸`;

        // Add remove item listeners
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                this.removeItem(e.target.dataset.id);
            });
        });
    }

    renderCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('cart');
        if (saved) {
            this.items = JSON.parse(saved);
            this.calculateTotal();
            this.renderCart();
        }
    }

    async checkout() {
        if (this.items.length === 0) {
            alert('Корзина пуста');
            return;
        }

        const message = `🛒 Новый заказ!\n\n${this.items.map(item => 
            `${item.name} - ${item.quantity}шт. × ${item.price}₸`
        ).join('\n')}\n\n💰 Итого: ${this.total}₸`;

        try {
            const response = await fetch('php/telegram.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            if (response.ok) {
                alert('Заказ успешно оформлен!');
                this.items = [];
                this.updateCart();
                document.getElementById('cartSidebar').classList.remove('active');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка при оформлении заказа');
        }
    }
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});
