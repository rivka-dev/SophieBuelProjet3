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
        //Appel à la suppression
        buttonSupprimerElement.addEventListener("click",async function(event){
            event.preventDefault();
            const idWorks=travaux[i].id
            supprimerApi(idWorks)
        })
        //Appel pour tout supprimer
        const supprimerTout=document.querySelector("#suppressionTotale")
        supprimerTout.addEventListener("click",async function(event){
            event.preventDefault()
            for (let i=0; i < travaux.length; i++){
                const idWorks=travaux[i].id
                supprimerApi(idWorks)

        }
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
   
