
let modal=null
const focusableSelector="button, a, input, textarea"
let focusables=[]
let previouslyFocusedElement=null

const fenetreModal=document.querySelector("#modal1")
const retour=document.querySelector("#fleche")

//ouvre la modal
const openModal= async function(e){
    e.preventDefault()
const target=e.target.getAttribute("href")    
    if (target.querySelector==="#modal1"){
        modal=document.querySelector(target)         
    }   else{
        modal= await loadModal(target)
    }         
   focusables=Array.from(modal.querySelectorAll(focusableSelector))
   console.log(focusables)
   previouslyFocusedElement=document.querySelector(':focus')
    console.log(previouslyFocusedElement)
    modal.style.display=null
    focusables[0].focus()    
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal','true')
    modal.addEventListener('click',closeModal)  
    modal.querySelector('.js-modal-close').addEventListener ('click',closeModal)
    modal.querySelector('.js-modal-stop').addEventListener ('click',stopPropagation)  
    let image=document.querySelector("#getFile")
    image.value=""  
    document.querySelector(".container").style.backgroundColor="rgba(0, 0, 0, 0.3)" 
}
//ferme la modal
const closeModal=function (e){
    if(modal===null) return
   // if(previouslyFocusedElement!==null) previouslyFocusedElement.focus()
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
    fermerForm()
    document.querySelector(".container").style.backgroundColor="initial"
}
//efface données formulaire
const fermerForm=function(){
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
//garde la tabulation à l'intérieur de la modale
const focusInModal= function(e){
    e.preventDefault()
    let index=focusables.findIndex(f => f === modal.querySelector(':focus'))
    console.log(index)
   if(e.shiftKay===true){
    index--
   }else{
    index++
   }if (index>= focusables.length){
    index=0
}
if(index<0){
    index=focusables.length-1
}
    
    focusables[index].focus()
}
const loadModal= async function (url){    
    const target ='#' +url.split('#')[1]
    const existingModal=document.querySelector(target)
    if (existingModal!==null)return existingModal
    const html= await fetch (url).then(response => response.text())
    const element=document.createRange().createContextualFragment(html).querySelector(target)
    document.body.append(element)
    return element
}

//ferme la modale si en dehors
document.querySelectorAll('.js-modal').forEach(a =>{
    a.addEventListener('click',openModal)//})
window.addEventListener('mouseup', function(e){
    var obj = document.querySelector("#modal1");    
        if (!obj.contains(e.target)) {
            closeModal(e)
        }
    })
})
//empeche l'option de tabulation 
window.addEventListener('keydown', function(e){
    if(e.key==='Tab' && modal!==null){
     focusInModal(e)
    }
 })
 

