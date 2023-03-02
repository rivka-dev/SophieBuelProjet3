async function works(){
    const reponse = await fetch('http://localhost:5678/api/works')
    travaux= await reponse.json()    
   //fonction qui genere toute la page web
    async function genererTravaux(travaux){       
        for (let i=0; i < travaux.length; i++){
            // Création des balises 
            const sectionTravaux = document.querySelector(".gallery");
            const figureElement=document.createElement("figure");
            const imageElement = document.createElement("img");            
            const titreElement = document.createElement("figcaption");
            imageElement.src = travaux[i].imageUrl;
            titreElement.innerText = travaux[i].title;
            imageElement.setAttribute("crossorigin","anonymous");
            //Rattachement de nos balises au DOM
            sectionTravaux.appendChild(figureElement);
            figureElement.appendChild(imageElement)
            figureElement.appendChild(titreElement);
        }
    }
    genererTravaux(travaux);
    //ajout du listener pour afficher par categorie
    const boutonFiltre=(filtre, numero)=> {        
        filtre.addEventListener("click",function(){          
            const travauxFiltre=travaux.filter(function (travail){                
                return travail.category.id==numero;                              
            });
            //Effacement de l'écran et regénération de la page
            document.querySelector(".gallery").innerHTML="";
            genererTravaux(travauxFiltre);            
        })
    }
    boutonFiltre(document.querySelector("#objets"), 1);
    boutonFiltre(document.querySelector("#appartements"), 2);
    boutonFiltre(document.querySelector("#hotels"), 3);     
    //ajout du listener pour tout afficher
    const boutonTous=document.querySelector("#tous");
    boutonTous.addEventListener("click",function(){    
        document.querySelector(".gallery").innerHTML="";
        genererTravaux(travaux);
    })
    //afficher mode manager
    if (window.localStorage.getItem("token")!==null){
        const modeManager= document.querySelector("#modeManager")
        modeManager.style.display='inline'
        const mode= document.querySelector("#mode")
        mode.style.display='inline'
        const manager= document.querySelector("#manager")
        manager.style.display='flex'
        const flexFiltres=document.querySelector('#flexFiltres')
        flexFiltres.innerHTML=""   
    }   
}
works()
    

//fonction qui genere toute la modale
async function genererModale(){
    const reponse= await fetch('http://localhost:5678/api/works',{
        method:'GET', 
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer '+window.localStorage.getItem("token")                        
        }
    })  
    const travaux= await reponse.json()           
    for (let i=0; i < travaux.length; i++){
        // Création des balises 
        const sectionTravaux = document.querySelector(".galleryModal")
        const figureElement=document.createElement("figure")
        figureElement.className="figureModale"
        const imageElement = document.createElement("img") 
        imageElement.className="imgModale"
        const buttonFlecheElement=document.createElement("button")              
        buttonFlecheElement.className = ("noir fleche"  )
        const FlecheElement=document.createElement("img")  
        const buttonSupprimerElement=document.createElement("button") 
        buttonSupprimerElement.className = "noir supprimer"; 
        const SupprimerElement=document.createElement("img")  
        const titreElement = document.createElement("figcaption")
        imageElement.src = travaux[i].imageUrl            
        titreElement.innerText = "modifier"
        imageElement.setAttribute("crossorigin","anonymous")
        SupprimerElement.src=`./assets/icons/suppression.png`          
        FlecheElement.src=`./assets/icons/fleches.png`
        //Rattachement de nos balises au DOM
        sectionTravaux.appendChild(figureElement)
        figureElement.appendChild(imageElement)      
        imageElement.appendChild(titreElement)
        figureElement.appendChild(buttonFlecheElement)
        buttonFlecheElement.appendChild(FlecheElement)
        figureElement.appendChild(buttonSupprimerElement)
        buttonSupprimerElement.appendChild(SupprimerElement)
        sectionTravaux.appendChild(figureElement);
        figureElement.appendChild(imageElement)
        figureElement.appendChild(titreElement);         
        //Appel à la suppression
        buttonSupprimerElement.addEventListener("click",async function(event){
            event.preventDefault();
            const idWorks=travaux[i].id
            console.log(idWorks)
            supprimerApi(idWorks)
        })
    }
}
genererModale()
 
//afficher le formulaire d'ajout et fermer la premiere modale
function deuxModale(){         
    const secondeModale=document.querySelector("#ajoutPhoto");
    secondeModale.addEventListener("click",function(){ 
        const premiere=  document.querySelector("#premiere") 
        premiere.style="display:none"; 
        const retour=document.querySelector("#fleche")             
        retour.style="visibility:visible"
        const deuxieme=document.querySelector("#deuxieme")
        deuxieme.style="display:initial" 
        retour.addEventListener("click",function(){
            fermerForm()               
        })                      
    })  
}
deuxModale() 
   
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
        document.querySelector(".galleryModal").innerHTML=""
        document.querySelector(".gallery").innerHTML=""
        genererModale()
        works()
    }
}

//fonction d'ajout
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
        console.log(category)
        console.log(formData)      
        let response = await fetch('http://localhost:5678/api/works',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+window.localStorage.getItem("token")   ,
            },
            body: formData
        })     
        console.log(body)
        if (response.status === 201) {
            console.log("Envoyé");
        } else {
            console.log(`erreur  lors de la tentative d’envoi du fichier`);
        }  
    })
}
modalAjout()
///fonction qui ajoute la photo et la transforme en binaire     
function loadFile(event) {
    const img = document.getElementById('output');
 
   

    img.src = URL.createObjectURL(event.target.files[0])          
    const file = event.target.files[0]  
    console.log(file.size) 
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

 
     /*window.onbeforeunload = () => {
       
         window.localStorage.removeItem('token');
      }*/