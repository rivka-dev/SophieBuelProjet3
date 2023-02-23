async function modalAjout(){  
    
    // Création de l’objet .   
    const submitLogin=document.querySelector("#fileinfo")
        submitLogin.addEventListener("submit", async function(event){      
            event.preventDefault()
            let work = {
                image: document.querySelector("#getFile").value,
                title: document.querySelector("#titre").value,
                category:document.querySelector("#categorie").value,
            }
            console.log(work)         
                let response = await fetch('http://localhost:5678/api/works',{
                    method: 'POST',
                    headers: {
                        'accept':'application/json',                     
                        'Authorization': 'Bearer '+window.localStorage.getItem("token")   , 
                    },
                    body: work
                })     
                console.log(body)          
                //reponse positive ou negative
                if (response.status === 200) {
                    console.log("Envoyé");
                } else {
                    console.log(`erreur  lors de la tentative d’envoi du fichier`);
                }  
            })  
        }
        const loadFile = function(event) {
            const image = document.getElementById('output');
            image.src = URL.createObjectURL(event.target.files[0]);
            document.getElementById('disparait').style.display = 'none';
            document.getElementById('disparait').type = 'submit'    
        };
        const devientVert = function() {
            const bouton=document.getElementById('boutonPhoto')
            const image = document.getElementById('getFile');
            const titre=document.getElementById('titre')
            const categorie=document.getElementById('categorie')
            const rempli=(image.value!=="")&&(titre.value!=="")&&(categorie.value!=="")
            console.log(rempli)        
            if(rempli===true){        
                bouton.style.background='#1D6154'
                bouton.disabled = false;            
            }
        }

    
       