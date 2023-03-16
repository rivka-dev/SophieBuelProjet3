//fonction de suppression    
async function supprimerElement(idWorks,event){        
    event.preventDefault();            
    const answer=await fetch (`http://localhost:5678/api/works/${idWorks}`,{
        method:'DELETE', 
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer '+window.localStorage.getItem("token")                        
        }
    })
    if(answer.status===200||answer.status===204){
        const list=document.querySelectorAll(`[data-id="${idWorks}"]`)
        for (i=0;i<list.length;i++){
            list[i].remove()
        }           
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
            if (response.status === 201){                 
                const travaux= await response.json()               
                creerModal(travaux)
                genererTravauxIndividuels(travaux)
                alert("Le projet a été enregistré")
                modalInitial() //fonction dans modal.js
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
        const file = event.target.files[0]                
        if(file.size>4194304){           
            alert('votre image doit être inférieure à 4 Mo')
            return
        }else{
            img.src = URL.createObjectURL(file) 
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
  
//bouton en vert si tous les champs sont remplis
function vert(){
    const image=document.getElementById('getFile')
    const titre=document.getElementById('titre')
    const categorie=document.getElementById('categorie')
    const bouton=document.getElementById('boutonPhoto')
    const green=document.querySelectorAll(".green")     
    for(let i=0;i<green.length;i++){
        green[i].addEventListener('change',function(){  
            const rempli=(image.value!=="")&&(titre.value!=="")&&(categorie.value!=="")       
            if(rempli===true){        
                bouton.style.background='#1D6154'
            }
        })    
    }}
vert()

