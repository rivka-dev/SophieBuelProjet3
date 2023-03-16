async function works(){
    const reponse = await fetch('http://localhost:5678/api/works')
    travaux= await reponse.json()
   //fonction qui genere toute la page web
    async function genererTravaux(travaux){          
        for (let i=0; i < travaux.length; i++){
            const travail=travaux[i]
            genererTravauxIndividuels(travail)     
        }
    }
    genererTravaux(travaux);

    //ajout du listener pour afficher par categorie
    const boutonFiltre=(filtre, numero)=> {        
        filtre.addEventListener("click",function(){          
            const travauxFiltre=travaux.filter(function (travail){                
                return travail.category.id==numero;                              
            });
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

    
}
works()

function genererTravauxIndividuels(travail){
    const sectionTravaux = document.querySelector(".gallery");             
    const figureElement=document.createElement("figure");
    figureElement.dataset.id = travail.id;
    console.log(figureElement.dataset.id)
    const imageElement = document.createElement("img");            
    const titreElement = document.createElement("figcaption");
    imageElement.src = travail.imageUrl;
    titreElement.innerText = travail.title;
    imageElement.setAttribute("crossorigin","anonymous");
    //Rattachement de nos balises au DOM
    sectionTravaux.appendChild(figureElement);
    figureElement.appendChild(imageElement)
    figureElement.appendChild(titreElement);
}




