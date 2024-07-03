document.getElementById('add-product').addEventListener('click', function() {
    const productName = prompt("Enter product name:");
    const productDescription = prompt("Enter product description:");
    const productPrice = prompt("Enter product price:");
  
    if (productName && productDescription && productPrice) {
      db.collection('products').add({
        name: productName,
        description: productDescription,
        price: productPrice,
        createdBy: auth.currentUser.uid
      }).then(() => {
        alert('Product added successfully!');
        loadAdminProducts();
      }).catch((error) => {
        alert(error.message);
      });
    } else {
      alert('All fields are required!');
    }
  });
  
  function loadAdminProducts() {
    db.collection('products').where('createdBy', '==', auth.currentUser.uid).get().then((querySnapshot) => {
      const productContainer = document.getElementById('admin-product-list');
      productContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <button onclick="deleteProduct('${doc.id}')">Delete</button>
        `;
        productContainer.appendChild(productItem);
      });
    }).catch((error) => {
      alert(error.message);
    });
  }
  
  function deleteProduct(productId) {
    db.collection('products').doc(productId).delete().then(() => {
      alert('Product deleted successfully!');
      loadAdminProducts();
    }).catch((error) => {
      alert(error.message);
    });
  }
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      loadAdminProducts();
    } else {
      window.location.href = 'login.html';
    }
  });
  
  document.getElementById('logout').addEventListener('click', function() {
    auth.signOut().then(() => {
      window.location.href = 'login.html';
    });
  });
  