let option = document.querySelector(".options");
let tools = document.querySelector(".tools");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let pencilImg = document.querySelector(".pencil-img");
let eraserImg = document.querySelector(".eraser-img");
let darkMode = document.querySelector(".dark-mode");
let stickyImg = document.querySelector(".sticky-img");
let uploadImg = document.querySelector(".upload-img");
let body = document.querySelector("body");
let pencilFlag = false;
let eraserFlag = false;
let optionFlag = true;
let darKModeFlag = false;
let darkModeIcon = darkMode.children[0];
let sign = option.children[0];

option.addEventListener("click",(e)=>{
    optionFlag = !optionFlag;
    if(optionFlag){
        toolShow();
    }else{
        toolHide();
    }
})

function toolShow(){
    sign.classList.remove("fa-bars");
    sign.classList.add("fa-times");
    tools.style.display = "flex";

}
function toolHide(){
    sign.classList.remove("fa-times");
    sign.classList.add("fa-bars");
    tools.style.display = "none";
    pencil.style.display = "none";
    eraser.style.display = "none";
}

pencilImg.addEventListener("click",(e)=>{
    pencilFlag = !pencilFlag;
    if(pencilFlag) pencil.style.display="flex";
    else pencil.style.display = "none";
})
eraserImg.addEventListener("click",(e)=>{
    eraserFlag = !eraserFlag;
    if(eraserFlag) eraser.style.display="flex";
    else eraser.style.display = "none";
})

darkMode.addEventListener("click",(e)=>{
    darKModeFlag = !darKModeFlag;
    if(darKModeFlag==true){
        body.style.backgroundColor = "#2c3e50";
        tool.fillStyle = "#2c3e50";
        tool.fillRect(0, 0, canvas.width, canvas.height);

        
        darkModeIcon.classList.remove("fa-toggle-off");
        darkModeIcon.classList.add("fa-toggle-on");
    }else{
        body.style.backgroundColor = "white";
        tool.fillStyle = "white";
        tool.fillRect(0, 0, canvas.width, canvas.height);
        darkModeIcon.classList.remove("fa-toggle-on");
        darkModeIcon.classList.add("fa-toggle-off");

    }
})

stickyImg.addEventListener("click",(e)=>{
    let sticky = document.createElement("div");
    sticky.setAttribute("class","sticky");
    sticky.innerHTML = `  <div class="sticky-head">
    <div class="sticky-min"></div>
    <div class="sticky-close"></div>
</div>
<div class="sticky-note">
    <textarea></textarea>
</div>`;
document.body.appendChild(sticky);

let minimize = sticky.querySelector(".sticky-min");
let close = sticky.querySelector(".sticky-close");
stickyOperations(minimize,close,sticky);

sticky.onmousedown = function(event) {
    dragAndDrop(sticky,event);
}; 
sticky.ondragstart = function() {
    return false;
};

})


function stickyOperations(minimize,close,sticky){
    close.addEventListener("click",(e)=>{
        sticky.remove();
    })
    minimize.addEventListener("click",(e)=>{
        let note = sticky.querySelector(".sticky-note");
        let display = getComputedStyle(note).getPropertyValue("display");
        if(display == "none") note.style.display = "block";
        else note.style.display = "none";
        
})
}

function dragAndDrop(element,event){
    
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
    
    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);
    
    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
    
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }
    
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
    
    // drop the ball, remove unneeded handlers
    element.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };  
};

uploadImg.addEventListener("click",(e)=>{
    //for file explorer
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    input.addEventListener("change",(e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let sticky = document.createElement("div");
        sticky.setAttribute("class","sticky");
        sticky.innerHTML = `  <div class="sticky-head">
        <div class="sticky-min"></div>
        <div class="sticky-close"></div>
    </div>
    <div class="sticky-note">
        <img class="uploaded-image" src="${url}"/>
    </div>`;
    document.body.appendChild(sticky);
    
    let minimize = sticky.querySelector(".sticky-min");
    let close = sticky.querySelector(".sticky-close");
    stickyOperations(minimize,close,sticky);
    
    sticky.onmousedown = function(event) {
        dragAndDrop(sticky,event);
    }; 
    sticky.ondragstart = function() {
        return false;
    };

    })
})




