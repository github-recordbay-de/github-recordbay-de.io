document.addEventListener('keypress', (e)=>{
    if(e.code=="KeyO"){
        //change to video material
        playJungleVid();
    }
    else if(e.code=="KeyU"){
        CloseBox();
    }
})
document.getElementById("vidElem").addEventListener("mousedown", (event)=>{
    //turn off valley and jungle
    CloseBox()
    playJungleVid();
})

//interaction functions
function CloseBox(){
    jungleVidTex.video.pause();
    jungleVidTex.video.currentTime = 0
}


function playJungleVid(){
    jungleVidTex.video.play();
}
