async function works(){
    const reponse = await fetch('http://localhost:5678/api/works')
    const travaux= await reponse.json();
    //fonction qui genere toute la page web
    function genererTravaux(travaux){
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
    //premier affichage de la page
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
    //fonction qui genere toute la modale
    async function genererModale(travaux){
        await fetch('http://localhost:5678/api/works',{
            method:'GET', 
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer '+window.localStorage.getItem("token")                        
            }
        })
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
     
    //fonction de suppression    
    async function supprimerApi(idWorks){
        console.log(window.localStorage.getItem("token"))
        const answer=await fetch (`http://localhost:5678/api/works/${idWorks}`,{
            method:'DELETE', 
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer '+window.localStorage.getItem("token")                        
            }
        })
        console.log(answer.status)
        if(answer.status===200||answer.status===204){
            console.log("element supprime");
            document.querySelector(".galleryModal").innerHTML=""
            document.querySelector(".gallery").innerHTML=""
            genererModale(travaux)
            genererTravaux(travaux)
        }
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
                fermerForm()               
            })                      
        })  
    }
    deuxModale() 
}
    
       
works()