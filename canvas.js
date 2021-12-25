let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let pencilColor = document.querySelectorAll(".pencil-color");
let pencilSize = document.querySelector(".pencil-size");
let eraserSize = document.querySelector(".eraser-size");
let downloadImg = document.querySelector(".download-img");
let redo = document.querySelector(".redo-img");
let undo = document.querySelector(".undo-img");

let tool = canvas.getContext("2d");
tool.fillStyle = "white";
tool.fillRect(0, 0, canvas.width, canvas.height);
let penColor = "#0984e3";
let eraserColor = "white"

let penSize = pencilSize.value;
let eraSize = eraserSize.value;
tool.strokeStyle = penColor;
tool.lineWidth = penSize;

let undoRedoTracker = [];//data 
let track = 0;

let mouseDown = false;

canvas.addEventListener("mousedown",(e)=>{
    mouseDown = true;
    tool.beginPath();
    tool.moveTo(e.clientX,e.clientY);

    


})
canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown){
        tool.lineTo(e.clientX,e.clientY);
        tool.stroke();
    }

    
})
canvas.addEventListener("mouseup",(e)=>{
    mouseDown = false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;

   

    undo.style.opacity = "1";
})

pencilColor.forEach((elem)=>{
    elem.addEventListener("click",(e)=>{
        let color = elem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
        pencil.style.display = "none";
        pencilFlag = !pencilFlag;
    })
})
pencilSize.addEventListener("change",(e)=>{
    penSize = pencilSize.value;
    tool.lineWidth = pencilSize.value;
})
eraserSize.addEventListener("change",(e)=>{
    eraSize = eraserSize.value;
    tool.lineWidth = eraSize;
})
eraser.addEventListener("change",(e)=>{
    if(eraserFlag){
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraSize;
    }else{
        tool.strokeStyle = pencolor;
        tool.lineWidth = penSize;
    }
})
eraserImg.addEventListener("click",(e)=>{

    tool.lineWidth = eraSize;
    pencil.style.display = "none";
    if(darKModeFlag){
        eraserColor = "#2c3e50";
        tool.strokeStyle = eraserColor;
    }else{
        eraserColor = "white";
        tool.strokeStyle = eraserColor;
    }
})
pencilImg.addEventListener("click",(e)=>{
    tool.strokeStyle = penColor;
    tool.lineWidth = penSize;
    eraser.style.display = "none";
})
downloadImg.addEventListener("click",(e)=>{
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url ;
    a.download = "board.jpg";
    a.click();
})
undo.addEventListener("click",(e)=>{
    if(track>0) track--;
    else undo.style.opacity = "0.5";
    //perform action
    let trackObj = {
        trackValue:track,
        undoRedoTracker
    }
    redo.style.opacity = "1";
    undoRedoCanvas(trackObj);

})
redo.addEventListener("click",(e)=>{
    if(track<undoRedoTracker.length-1) track++;
    else redo.style.opacity = "0.5";

    //perform action
    let trackObj = {
        trackValue:track,
        undoRedoTracker
    }
    undo.style.opacity = "1";
    undoRedoCanvas(trackObj);

})
function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
    let url = undoRedoTracker[track];
    let img = new Image(); // new Image reference element
    img.src = url;
    img.onload = (e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }

}


