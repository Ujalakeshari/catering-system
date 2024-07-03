// Registration
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
  
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      const user = userCredential.user;
      return db.collection('users').doc(user.uid).set({
        email: email,
        role: role
      });
    }).then(() => {
      alert('User registered successfully!');
      window.location.href = 'login.html';
    }).catch((error) => {
      alert(error.message);
    });
  });
  
  // Login
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      const user = userCredential.user;
      db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          const role = doc.data().role;
          if (role === 'admin') {
            window.location.href = 'admin.html';
          } else {
            window.location.href = 'user.html';
          }
        }
      });
    }).catch((error) => {
      alert(error.message);
    });
  });
  