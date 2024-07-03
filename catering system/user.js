function loadUserProducts() {
    db.collection('products').get().then((querySnapshot) => {
      const productContainer = document.getElementById('user-product-list');
      productContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <button onclick="addToCart('${doc.id}')">Add to Cart</button>
        `;
        productContainer.appendChild(productItem);
      });
    }).catch((error) => {
      alert(error.message);
    });
  }
  
  function addToCart(productId) {
    db.collection('carts').add({
      productId: productId,
      userId: auth.currentUser.uid
    }).then(() => {
      alert('Product added to cart!');
    }).catch((error) => {
      alert(error.message);
    });
  }
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      loadUserProducts();
    } else {
      window.location.href = 'login.html';
    }
  });
  
  document.getElementById('logout').addEventListener('click', function() {
    auth.signOut().then(() => {
      window.location.href = 'login.html';
    });
  });
  