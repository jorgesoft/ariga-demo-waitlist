// main.js

// 1. Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5eZpGePZCSwEr8jOnUBJKjKumwPbQ9Pk",
    authDomain: "nubitlan-demo.firebaseapp.com",
    projectId: "nubitlan-demo",
    storageBucket: "nubitlan-demo.firebasestorage.app",
    messagingSenderId: "771824882412",
    appId: "1:771824882412:web:8674214f21c95252304bc9",
    measurementId: "G-97NJRS5S3Y"
  };
  
  // 2. Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  
  // 3. Handle form submission
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("waitlist-form");
    const statusDiv = document.getElementById("form-status");
  
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const company = document.getElementById("company").value.trim();
      const domain = document.getElementById("domain").value.trim();
      const acceptedTerms = document.getElementById("terms").checked;
  
      if (!acceptedTerms) {
        statusDiv.innerText = "Debes aceptar los términos.";
        return;
      }
  
      try {
        await db.collection("waitlist").add({
          name,
          email,
          company,
          domain,
          acceptedTerms,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
  
        statusDiv.innerHTML = "<div class='alert alert-success'>¡Te has unido a la lista exitosamente! Redirigiendo...</div>";
        form.reset();
  
        setTimeout(() => {
          window.location.href = "https://cal.com/jorgesilva.pro/15min?overlayCalendar=true";
        }, 3500);
  
      } catch (error) {
        console.error(error);
        statusDiv.innerHTML = "<div class='alert alert-danger'>Error al enviar el formulario.</div>";
      }
    });
  });
  