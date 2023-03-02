async function connexion(){
    let login={
      "email": "string",
      "password": "string"
    }
    // Création de l’objet du login.
    const submitLogin=document.querySelector("#connexion")
    submitLogin.addEventListener("click", async function(event){      
      event.preventDefault()
      login = {
        email:document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      }
      let response = await fetch('http://localhost:5678/api/users/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(login)
      })
      let result = await response.json()
  //reponse positive ou negative
      if (response.status === 200) {
        tokenLogin=result.token
       window.location.replace('index.html');    
  
       window.localStorage.setItem("token", result.token);
       console.log(result.token)
      } else  {
        alert("Erreur dans l'identifiant ou le mot de passe")
     }
     
    }
  )}
  
 
  
  connexion()

  
  
  