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
    

