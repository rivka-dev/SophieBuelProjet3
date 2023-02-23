
async function modalTout(){
    
    const reponse = await fetch('http://localhost:5678/api/works',{
        method:'GET', 
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer '+window.localStorage.getItem("token")                        
        }
    })
    const travaux= await reponse.json()
    //fonction qui genere toute la page web
    function genererTravaux(travaux){
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
             

             //Suppression
            buttonSupprimerElement.addEventListener("click",async function(){
                console.log(travaux[i].id)
                console.log(window.localStorage.getItem("token"))
                const answer=await fetch (`http://localhost:5678/api/works/${travaux[i].id}`,{
                    method:'DELETE', 
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer '+window.localStorage.getItem("token")                        
                    }
                })
                console.log(answer.status)
                if(answer.status===200||answer.status===204){
                    console.log("element supprime");
                }else{
                    console.log(" element non supprimé")
                }
            })
            
        }
     }
    //premier affichage de la page
    genererTravaux(travaux)   
    }
    //afficher le formulaire et le fermer
    function deuxModale(){         
        const secondeModale=document.querySelector("#ajoutPhoto");
        secondeModale.addEventListener("click",function(){ 
            const premiere=  document.querySelector("#premiere") 
            premiere.style="display:none"; 
            const retour=document.querySelector("#fleche")
            console.log(retour)
            retour.style="visibility:visible"
            const deuxieme=document.querySelector("#deuxieme")
            deuxieme.style="display:initial" 
            retour.addEventListener("click",function(){
                fermerForm()               
            })                      
        })  
    }
    deuxModale()    
modalTout()




    