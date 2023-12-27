import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
alert("ok")
    const firebaseConfig = {
      apiKey: "AIzaSyDrkMcCiwtuGvjN0qHq0FbLfvQpr31lFdc",
      authDomain: "coba-login-nih.firebaseapp.com",
      databaseURL: "https://coba-login-nih-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "coba-login-nih",
      storageBucket: "coba-login-nih.appspot.com",
      messagingSenderId: "828781157530",
      appId: "1:828781157530:web:f24e1c73062bb55d771323"
    };
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    const form = document.forms['login']
    form.addEventListener('submit', async e => {
      e.preventDefault()
      const formData = new FormData(form);
      const { email, password } = Object.fromEntries(formData)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert(JSON.stringify(user, null, 2))
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    })
    onAuthStateChanged(auth, (user) => {
      if (user) {
        alert(JSON.stringify(user, null, 2))
      } else {
        if(/login|register/i.test(document.location.pathname)) window.location.assign("login")
      }
    });
    document.getElementById('reset').addEventListener('click', ()=> {
      const user = auth.currentUser
      if(!user) return alert("Silakan login terlebih dahulu")
      sendPasswordResetEmail(auth, user?.email)
      .then(() => {
        alert("Silahkan cek email")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    })

document.getElementById('register').addEventListener('click', ()=> {
      window.location.assign("register")
})
 