salla.on('cart:item:added', function(response) {
    console.log('تمت إضافة المنتج للسلة', response);
});

salla.on('cart:item:updated', function(response) {
    console.log('تم تحديث السلة', response);
});

salla.on('cart:item:removed', function(response) {
    console.log('تم حذف المنتج من السلة', response);
});

document.querySelectorAll('.btn-add-to-cart, .btn-add-cart').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        var productId = this.dataset.productId;
        salla.cart.addItem(productId);
    });
});

document.querySelectorAll('.qty-plus').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var input = this.nextElementSibling;
        var newValue = parseInt(input.value) + 1;
        input.value = newValue;
        salla.cart.updateItem(this.dataset.itemId, newValue);
    });
});

document.querySelectorAll('.qty-minus').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var input = this.previousElementSibling;
        var newValue = parseInt(input.value) - 1;
        if (newValue >= 1) {
            input.value = newValue;
            salla.cart.updateItem(this.dataset.itemId, newValue);
        }
    });
});

document.querySelectorAll('.item-remove').forEach(function(btn) {
    btn.addEventListener('click', function() {
        if (confirm('هل تريد حذف هذا المنتج من السلة؟')) {
            salla.cart.removeItem(this.dataset.itemId);
        }
    });
});

document.querySelectorAll('.btn-coupon').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var input = this.previousElementSibling;
        var code = input.value.trim();
        if (code) {
            salla.cart.applyCoupon(code);
        }
    });
});

document.querySelectorAll('.thumbnail').forEach(function(thumb) {
    thumb.addEventListener('click', function() {
        var mainImage = document.querySelector('.product-main-image img');
        mainImage.src = this.querySelector('img').src;
        document.querySelectorAll('.thumbnail').forEach(function(t) {
            t.classList.remove('active');
        });
        this.classList.add('active');
    });
});
