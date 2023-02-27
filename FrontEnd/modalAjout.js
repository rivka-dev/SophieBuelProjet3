

async function modalAjout(){  
  
    // Création de l’objet .   
    const submitLogin=document.querySelector("#fileinfo")
    submitLogin.addEventListener("submit", async function(event){      
        event.preventDefault()             
        const image =document.querySelector('#getFile').files[0];       
        console.log(image)
        console.log(typeof(image))
        const title=document.querySelector("#titre").value
        const category=parseInt(document.querySelector("#categorie").value)
        const formData=new FormData()           
        formData.append("imageUrl", image);
        formData.append("title",  title );
        formData.append("category",  category );
        console.log(formData)      
        let response = await fetch('http://localhost:5678/api/works',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+window.localStorage.getItem("token")   , 
            },
            body: formData
        })     
        console.log(body)          
        //reponse positive ou negative
        if (response.status === 201) {
            console.log("Envoyé");
        } else {
            console.log(`erreur  lors de la tentative d’envoi du fichier`);
        }  
    })
}

function loadFile(event) {
    const img = document.getElementById('output');
    img.src = URL.createObjectURL(event.target.files[0])          
    const file = event.target.files[0]       
        const reader = new FileReader()     
        reader.addEventListener('load', () => {
            img.src = reader.result;            
        })       
        if (file) {
            reader.readAsDataURL(file);            
        }
    document.getElementById('disparait').style.display = 'none';
    document.getElementById('disparait').type = 'submit'
}

function devientVert() {
    const bouton=document.getElementById('boutonPhoto')
    const img = document.getElementById('getFile');
    const titre=document.getElementById('titre')
    const categorie=document.getElementById('categorie')
    const rempli=(img.value!=="")&&(titre.value!=="")&&(categorie.value!=="")
    console.log(rempli)        
    if(rempli===true){        
        bouton.style.background='#1D6154'
        bouton.disabled = false;            
    }
}

modalAjout()

    
          

       
        
        

          