
let modal=null
const fenetreModal=document.querySelector("#modal1")
const retour=document.querySelector("#fleche")

//ouvre la modal
const openModal=document.querySelector('.open-modal')
openModal.addEventListener('click', function () {               
    modal=document.querySelector('#modal1')
    modal.style.display='flex'
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal','true')
    modal.addEventListener('click',closeModal)  
    modal.querySelector('.js-modal-close').addEventListener ('click',closeModal)
    modal.querySelector('.js-modal-stop').addEventListener ('click',stopPropagation)  
    let image=document.querySelector("#getFile")
    image.value=""  
    document.querySelector(".container").style.backgroundColor="rgba(0, 0, 0, 0.3)" 
    //ferme la modale si en dehors
    window.addEventListener('mouseup', closeOnClickOutside)
})  

function closeOnClickOutside(e){
    var obj = document.querySelector("#modal1");    
    if (!obj.contains(e.target)) {
        closeModal(e)
        window.removeEventListener('mouseup',closeOnClickOutside)
    }
}

//ferme la modal
const closeModal=function (e){
    e.preventDefault()    
    retour.style="visibility:hidden"
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click',closeModal)   
    modal.querySelector('.js-modal-close').removeEventListener ('click',closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener ('click',stopPropagation)
    const hideModal=function(){
        fenetreModal.style="display:none"
        fenetreModal.removeEventListener('animationend',hideModal)
        modal=null        
    }
    modal.addEventListener('animationend',hideModal)
    modalInitial()
    document.querySelector(".container").style.backgroundColor="initial"
}

//efface données formulaire
const modalInitial=function(){
    const premiere=  document.querySelector("#premiere") 
    const deuxieme=document.querySelector("#deuxieme")
    deuxieme.style="display:none"
    premiere.style="display:flex";
    retour.style="visibility:hidden"
    document.querySelector("#output").src=""
    document.querySelector("#disparait").style="display:flex"
    document.getElementById("fileinfo").reset();    
}

//garde la modale ouverte quand on clique dessus
const stopPropagation=function (e){
    e.stopPropagation()
}






 

