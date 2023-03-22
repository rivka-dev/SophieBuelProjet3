
    
async function categories(){
    const reponse = await fetch('http://localhost:5678/api/categories')
    const categories= await reponse.json()
    const filtres=document.querySelector(".filtres")    
    for(i=0;i<categories.length;i++){        
        const buttonElement=document.createElement("button")
        buttonElement.className="filtre"       
        buttonElement.innerText=categories[i].name
        buttonElement.id=categories[i].id     
        filtres.appendChild(buttonElement) 
        buttonElement.addEventListener("click",function(){
            devientVert(buttonElement)
            genererTravaux(buttonElement.id)            
        })
        const depart=document.querySelector(".active")
        devientVert(depart)
        genererTravaux(depart.id)        
        const boutonTous=document.querySelector("#tous")
        boutonTous.addEventListener("click",function(){
            devientVert(boutonTous)
            genererTravaux(boutonTous.id)
        })       
    }
}  

function devientVert(boutonFiltre){
    let previousFiltre=document.querySelector(".active")
    previousFiltre.className="filtre"  
    boutonFiltre.className="filtre active"    
}

async function genererTravaux(idFiltre){ 
    const reponse = await fetch('http://localhost:5678/api/works')
    travaux= await reponse.json()        
    let liste=""           
    if(idFiltre==="tous"){
        liste=travaux
    }else{
        liste=travaux.filter(function (travail){             
            return travail.categoryId==idFiltre;                                          
        }) 
    }
    document.querySelector(".gallery").innerHTML="";
    for(let i=0; i<liste.length;i++)  {         
        const travail=liste[i]
        genererTravauxIndividuels(travail)              
    }
}


function genererTravauxIndividuels(travail){
    const sectionTravaux = document.querySelector(".gallery");             
    const figureElement=document.createElement("figure");
    figureElement.dataset.id = travail.id;    
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

function userConnected(){
    if (window.localStorage.getItem("token")!==null){
        return true;
    }
    return false
} 

if(userConnected()===false){
    categories()
}else{
    genererTravaux("tous")
}

