class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.renderCart();
        this.updateCartCount();
        this.initEventListeners();
    }

    initEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const { id, name, price } = button.dataset;
                this.addItem({
                    id,
                    name,
                    price: parseInt(price)
                });
            });
        });

        // Remove from cart buttons
        document.querySelector('.cart-items').addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const id = e.target.dataset.id;
                this.removeItem(id);
            }
        });

        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkout();
        });
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.items.push({ ...item, quantity: 1 });
        }
        this.updateCart();
        alert('Товар добавлен в корзину!');
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateCart();
    }

    updateCart() {
        this.saveToLocalStorage();
        this.renderCart();
        this.updateCartCount();
    }

    renderCart() {
        const cartItems = document.querySelector('.cart-items');
        const totalPrice = document.querySelector('.total-price');
        
        if (!cartItems || !totalPrice) return;

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} ₸ × ${item.quantity || 1}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
            </div>
        `).join('');

        const total = this.items.reduce((sum, item) => 
            sum + (item.price * (item.quantity || 1)), 0);
        totalPrice.textContent = `${total.toLocaleString()} ₸`;
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        document.querySelector('.cart-count').textContent = count;
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    async checkout() {
        if (this.items.length === 0) {
            alert('Корзина пуста');
            return;
        }

        const orderText = `🛒 Новый заказ!\n\n${this.items.map(item => 
            `${item.name}\nКоличество: ${item.quantity || 1}\nЦена: ${item.price.toLocaleString()} ₸`
        ).join('\n\n')}\n\n💰 Итого: ${this.items.reduce((sum, item) => 
            sum + (item.price * (item.quantity || 1)), 0).toLocaleString()} ₸`;

        try {
            const response = await fetch('php/telegram.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: orderText })
            });

            if (response.ok) {
                alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
                this.items = [];
                this.updateCart();
                document.getElementById('cartSidebar').classList.remove('active');
                document.body.style.overflow = '';
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
