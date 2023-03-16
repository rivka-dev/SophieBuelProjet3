//fonction qui générer la modale
async function genererModale(){
    const reponse= await fetch('http://localhost:5678/api/works',{
        method:'GET', 
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer '+window.localStorage.getItem("token")                        
        }
    })  
    const travaux= await reponse.json()     
    //fonction qui genere toute la modale      
    for (let i=0; i < travaux.length; i++){
        const travailActuel=travaux[i]
        creerModal(travailActuel)
    }
    const supprimerTout=document.querySelector("#suppressionTotale")
    supprimerTout.addEventListener("click",async function(event){
        event.preventDefault()
        for (let i=0; i < travaux.length; i++){
            const idWorks=travaux[i].id
            supprimerElement(idWorks,event)
        }
    })  
}
genererModale()

//fonction qui crée les élements de la modale
function creerModal(travailActuel){
    const sectionTravaux = document.querySelector(".galleryModal")
    const figureElement=document.createElement("figure")
    figureElement.className="figureModale"
    figureElement.dataset.id = travailActuel.id;
    const imageElement = document.createElement("img") 
    imageElement.className="imgModale"    
    const buttonFlecheElement=document.createElement("button")              
    buttonFlecheElement.className = ("noir fleche"  )
    const FlecheElement=document.createElement("img")  
    const buttonSupprimerElement=document.createElement("button") 
    buttonSupprimerElement.className = "noir supprimer"; 
    const SupprimerElement=document.createElement("img")  
    const titreElement = document.createElement("figcaption")
    imageElement.src = travailActuel.imageUrl   
    imageElement.setAttribute("crossorigin","anonymous");         
    titreElement.innerText = "éditer"
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
    //suppression
    buttonSupprimerElement.addEventListener("click",async function(event){
        const idWorks=travailActuel.id
        supprimerElement(idWorks,event)        
    })
        
}
     
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
            modalInitial()                    
        })                      
    })  
}
deuxModale() 
