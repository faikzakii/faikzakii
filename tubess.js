function loadPage(page) {
    const content = document.getElementById('content');

    switch (page.toLowerCase()) {
        case 'home':
            content.innerHTML = `
                <h2>Home</h2>
                <p>Selamat Datang di Borcelle Fashion.</p>
                <p>Kami menyediakan produk dengan kualitas terbaik dengan harga yang terjangkau.</p>
                <p>Happy Shopping Girls!</p>
                
                <h1> Member Of Group </h1>
                <div class="gallery">
                    <div class="photo-item">
                        <img src="jpg/paiq.jpg" class="gallery-img" alt="Paiq">
                        <p>Nurfaiq Faizzaki</p>
                    </div>
                    <div class="photo-item">
                        <img src="jpg/akhyar.jpg" class="gallery-img" alt="akhyar">
                        <p>Muhammad Akhyar</p>
                    </div>
                    <div class="photo-item">
                        <img src="jpg/najla.jpg" class="gallery-img" alt="najla">
                        <p>Najlaa Maharani Dewi</p>
                    </div>
                    <div class="photo-item">
                        <img src="jpg/atun.jpg" class="gallery-img" alt="atun">
                        <p>Sunatun</p>
                    </div>
                </div>
            `;
            break;

        case 'kontak':
            content.innerHTML = `
                <h2>Kontak</h2>
                <p>Hubungi kami melalui WhatsApp:</p>
                <p>
                    <a href="https://wa.me/6285220682014" target="_blank" class="btn btn-success">
                        Chat di WhatsApp
                    </a>
                </p>
                <p>Jelajahi Instagram kami:</p>
                <p>
                    <a href="https://www.instagram.com/borcelle.fashion11?igsh=ajlyaTAyeWYzN2do" target="_blank" class="btn btn-success">
                        Kunjungi Instagram kami
                    </a>
                </p>
            `;
            break;

        default:
            content.innerHTML = `
                <h2>Page Not Found</h2>
                <p>Sorry, the page you're looking for does not exist.</p>
            `;
            break;
    }
}

let cart = [];

// Tambah produk ke keranjang
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
}

// Update tampilan keranjang
function updateCart() {
    const cartTable = document.getElementById('cartTable');
    const cartTotal = document.getElementById('cartTotal');

    cartTable.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>Rp ${item.price.toLocaleString()}</td>
                <td>
                    <input type="number" class="form-control" value="${item.quantity}" 
                           min="1" onchange="updateQuantity(${index}, this.value)" />
                </td>
                <td>Rp ${itemTotal.toLocaleString()}</td>
                <td>
                    <button onclick="removeFromCart(${index})" class="btn btn-danger btn-sm">Hapus</button>
                </td>
            </tr>
        `;
    });

    cartTotal.textContent = `Total Belanja: Rp ${total.toLocaleString()}`;
}

// Update jumlah item di keranjang
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        alert('Jumlah harus minimal 1.');
        return;
    }

    cart[index].quantity = parseInt(newQuantity, 10);
    updateCart();
}

// Hapus item dari keranjang
function removeFromCart(index) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        cart.splice(index, 1);
        updateCart();
    }
}

// Proses checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }
    

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Terima kasih telah berbelanja! Total belanja Anda: Rp ${total.toLocaleString()}`);
    cart = [];
    updateCart();
}
