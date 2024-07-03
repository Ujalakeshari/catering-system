function loadProductDetails(productId) {
    db.collection('products').doc(productId).get().then((doc) => {
      if (doc.exists) {
        const product = doc.data();
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `Price: $${product.price}`;
      } else {
        alert('Product not found!');
        window.location.href = 'index.html';
      }
    }).catch((error) => {
      alert(error.message);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
      loadProductDetails(productId);
    } else {
      alert('No product specified!');
      window.location.href = 'index.html';
    }
  });
  