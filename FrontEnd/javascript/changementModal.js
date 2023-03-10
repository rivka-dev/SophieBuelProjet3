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
   
        raffraichi()
       
    }
}


//fonction d'ajout
async function modalAjout(){       
    const submitLogin=document.querySelector("#fileinfo")
    submitLogin.addEventListener("submit", async function(e){      
        e.preventDefault()      
        const imageInitial=document.querySelector("#getFile")       
        const image =imageInitial.files[0];       
        const title=document.querySelector("#titre").value   
        const categoryInitial=document.querySelector("#categorie").value
        const category=parseInt(categoryInitial)
        const formData=new FormData()           
        formData.append("image", image);
        formData.append("title",  title );
        formData.append("category",  category ); 
        if(imageInitial.value===''){
            alert ("le champ image n'est pas rempli")
        }
        if(title===''){
            alert ("le champ de titre n'est pas rempli")  
        }
        if(categoryInitial===''){
            alert ("le champ de category n'est pas rempli")    
        }
        if((imageInitial.value!=='')&&(title!=='')&&(categoryInitial!=='')){
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
            } 
        }    
    })
}
modalAjout()

///fonction qui affiche la photo et la transforme en binaire  
function loadFile() {
    const photo=document.getElementById('photoBtn')
    photo.addEventListener('click',function(event){
        event.preventDefault()
     
        document.getElementById('getFile').click()
    })
    const photoload=document.getElementById('photo')
    photoload.addEventListener('change',function(event){
       
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
    })
}
loadFile() 
    


     
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
