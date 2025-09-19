<script>
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const telepon = document.getElementById('telepon').value;
    const pembayaran = document.getElementById('pembayaran').value;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cart.length === 0) {
        alert("Keranjang belanja kosong.");
        return;
    }

    // Format isi pesan
    let pesan = `*Pesanan Baru dari ${nama}*\n\n`;
    pesan += `📦 *Daftar Produk:*\n`;

    cart.forEach((item, index) => {
        pesan += `${index + 1}. ${item.name} (Varian: ${item.variant}) - Rp ${item.price.toLocaleString('id-ID')}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    pesan += `\n💰 *Total:* Rp ${total.toLocaleString('id-ID')}\n`;
    pesan += `\n📍 *Alamat:* ${alamat}`;
    pesan += `\n📱 *No HP/WA:* ${telepon}`;
    pesan += `\n💳 *Metode Pembayaran:* ${pembayaran}`;

    // Ganti ini dengan nomor admin kamu
    const nomorAdmin = '6281234567890';
    const urlWA = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

    // Bersihkan keranjang
    localStorage.removeItem('cart');

    // Redirect ke WhatsApp
    window.location.href = urlWA;
});
</script>
