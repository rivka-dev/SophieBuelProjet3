//fonction de suppression    
async function supprimerApi(idWorks){
    const answer=await fetch (`http://localhost:5678/api/works/${idWorks}`,{
        method:'DELETE', 
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer '+window.localStorage.getItem("token")                        
        }
    })
    if(answer.status===200||answer.status===204){
        console.log("element supprime");
        raffraichi()
       
    }
}
async function supprimerTout(){
    
}

//fonction d'ajout
async function modalAjout(){     
    // Création de l’objet .   
    const submitLogin=document.querySelector("#fileinfo")
    submitLogin.addEventListener("submit", async function(e){      
        e.preventDefault()             
        const image =document.querySelector('#getFile').files[0];       
        const title=document.querySelector("#titre").value   
        const category=parseInt(document.querySelector("#categorie").value)
        const formData=new FormData()           
        formData.append("image", image);
        formData.append("title",  title );
        formData.append("category",  category );  
        let response = await fetch('http://localhost:5678/api/works',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+window.localStorage.getItem("token")   ,
            },
            body: formData
        })     
        
        if (response.status === 201) {
          
            raffraichi()  
            alert("Le projet a été enregistré")
            fermerForm()        
            
        } //else {
            // alert(`erreur  lors de la tentative d’envoi du fichier`);
            
       // }
        
            
         
    })
}
modalAjout()
///fonction qui ajoute la photo et la transforme en binaire     
function loadFile(event) {
    const img = document.getElementById('output'); 

    img.src = URL.createObjectURL(event.target.files[0])          
    const file = event.target.files[0] 
    if(file.size>4194304){
        alert('votre image doit être inférieure à 4 Mo')
        return
    }
        const reader = new FileReader()     
        reader.addEventListener('load', () => {
            img.src = reader.result;               
        })       
        if (file) {
            reader.readAsDataURL(file);            
        }
    document.getElementById('disparait').style.display = 'none';
   // document.getElementById('disparait').type = 'submit'
}

     
function devientVert() {
    const bouton=document.getElementById('boutonPhoto')
    const img = document.getElementById('getFile');
    const titre=document.getElementById('titre')
    const categorie=document.getElementById('categorie')
    const rempli=(img.value!=="")&&(titre.value!=="")&&(categorie.value!=="")       
    if(rempli===true){        
        bouton.style.background='#1D6154'
        document.querySelector("#boutonPhoto").removeAttribute("onclick");
                 
     
    }
}
function raffraichi(){
    document.querySelector(".galleryModal").innerHTML=""
    document.querySelector(".gallery").innerHTML=""
    genererModale()
    works()
}

 function erreur(){
    alert(`erreur  lors de la tentative d’envoi du fichier`)
 }
     