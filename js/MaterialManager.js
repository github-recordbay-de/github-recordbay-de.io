let woodMat, LeuchteMat, wheelMatIn, wheelMatOut
let videoMats = []
let wheelAlbedo = []
var wheelMetal = []
let coatMat, PostersMat;
var kartonColor
let kartonMat;
let jungleVidTex;
let jungleVidAlpha;
function ChangeMaterialProperties() {

    var redBay = new BABYLON.Color3.FromHexString("#ea1e1e");
    var blueBay = new BABYLON.Color3.FromHexString("#063c9d");
    var lightGrayBay = new BABYLON.Color3.FromHexString("#eeeeee");
    var darkGrayBay = new BABYLON.Color3.FromHexString("#323334");
    var blackBay = new BABYLON.Color3.FromHexString("#000000");
    kartonColor = new BABYLON.Color3.FromHexString("#D6B28E");
    //kartonColor = new BABYLON.Color3.FromHexString("#4eab3f");
    var yellow = new BABYLON.Color3.FromHexString("#E19A00");

    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" ) {
            continue;
        }

        mat.reflectionTexture = hdrTexture;
        if(mat.name == "m_karton"){
            //mat.diffuseColor = new BABYLON.Color3(214/255, 178/255, 142/255);
            kartonMat = mat;
            kartonMat.albedoColor = kartonColor;
            //mat.emissiveColor = new BABYLON.Color3.FromHexString("#FFFFFF")
        }
        else if(mat.name == "m_video"){
            //jungleVidTex = new BABYLON.VideoTexture("video", "assets/side vid long.mp4", scene, true);
            jungleVidTex = new BABYLON.VideoTexture("video", "assets/211108_Katjes_UV_02_DE.mp4", scene, true);
            jungleVidTex.video.pause();
            jungleVidTex.video.loop=false;
            jungleVidTex.video.addEventListener('ended', (event) => {
                console.log('Video Stopped');
              });
            jungleVidTex.vScale = -1;
            

            jungleVidAlpha = new BABYLON.VideoTexture("video", "assets/211108_Katjes_UV_Alpha_02_DE.mp4", scene, true);
            jungleVidAlpha.video.pause();
            jungleVidAlpha.video.loop=false;
            jungleVidAlpha.video.addEventListener('ended', (event) => {
                console.log('Video Stopped');
              });
            jungleVidAlpha.vScale = -1;
            jungleVidAlpha.getAlphaFromRGB =true

            mat.opacityTexture = jungleVidAlpha;
            mat.albedoTexture = jungleVidTex;

            mat.metallic = 1;
            mat.transparencyMode = 2
            //mat.emissiveColor = new BABYLON.Color3.FromHexString("#FFFFFF")
        }
    }
}



