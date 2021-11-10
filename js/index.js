
var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true }); // Generate the BABYLON 3D engine
var myGUI
var light1, light, shadowGenerator, moveScene_P
var camera
var slotmachinePlaced = false;
var isWinning = false;
var ground, sphere
var currentScale = 1.0;
var startScale = 1.0;
var scalingDone = false;

var page = document.title
/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    //    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/2, Math.PI/2, 8, new BABYLON.Vector3(0, 1.5, 0), scene);
    camera = new BABYLON.FreeCamera('Camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    camera.position = new BABYLON.Vector3(0, 3, 5);

    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager)
    // sphere = BABYLON.Mesh.CreateSphere("sphere", 32, 1, scene);

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    return scene;
};

var scene = createScene(); //Call the createScene function
/******* End of the create scene function ******/

/******* IMAGE TRACKING ******/
var onImageUpdated = function (e) {
    UpdateObj(e)
};

var factor = 0.041;
var onImageFound = function (e) {

    document.getElementById("trackState").style.backgroundColor = "green"
    UpdateObj(e);
    TruePlayVid();
    //playJungleVid();
    // All_AR.position.copyFrom(e.position)
    // All_AR.rotationQuaternion = new BABYLON.Quaternion();
    // All_AR.rotationQuaternion.copyFrom(e.rotation);
    // All_AR.scaling.set(e.scale, e.scale, e.scale)

};

function UpdateObj(e) {
    //alert("Image found.");
    Karton_P.position = new BABYLON.Vector3(e.position.x, e.position.y, e.position.z)

    Karton_P.rotationQuaternion = new BABYLON.Quaternion();
    Karton_P.rotationQuaternion.x = e.rotation.x;
    Karton_P.rotationQuaternion.y = e.rotation.y;
    Karton_P.rotationQuaternion.z = e.rotation.z;
    Karton_P.rotate(BABYLON.Axis.Y, -180 * (Math.PI / 180), BABYLON.Space.LOCAL);
    Karton_P.scaling = new BABYLON.Vector3(e.scale * factor, e.scale * factor, e.scale * factor);
}
var onImageLost = function (e) {
    document.getElementById("trackState").style.backgroundColor = "red"
};

var onImageScanning = function (e) {
    document.getElementById("trackState").style.backgroundColor = "blue"
    console.log("scanning!!!")
}

var onxrloaded = function () {


    // Set list of recognized image targets
    XR8.XrController.configure({ imageTargets: ["katjes_tracker"] });

    XR.addCameraPipelineModules([
        XRExtras.AlmostThere.pipelineModule(),
        XRExtras.FullWindowCanvas.pipelineModule(),
        XRExtras.Loading.pipelineModule(),
        XRExtras.RuntimeError.pipelineModule()
    ]);

    camera.addBehavior(XR.Babylonjs.xrCameraBehavior(), true);

    scene.onXrImageFoundObservable.add(onImageFound);
    scene.onXrImageLostObservable.add(onImageLost);
    scene.onXrImageUpdatedObservable.add(onImageUpdated);
    scene.onXrImageScanningObservable.add(onImageScanning);

    //alert("xr loaded.");
    console.log(camera)

};

/******* PLAY VIDEOS STUFF ******/

var vid;
var videoLoaded = false;

function loadVideo() {
    alert("Loading video.");
    vid = document.getElementById("tracking-vid");
    vid.load();
    document.getElementById("alpha-vid").load()

    vid.addEventListener("canplaythrough", function () {
        if (!videoLoaded) {
            alert('Video Loaded');
            videoLoaded = true;

        }
    });
    vid.addEventListener('ended', (event) => {
    });

    vid.addEventListener('playing', (event) => {
        document.getElementById("tracking-vid").loop = false;
        document.getElementById("alpha-vid").loop = false
    });
}

function fakePlayVid() {
    alert("fake play");
    document.getElementById("tracking-vid").play();
    document.getElementById("tracking-vid").pause();
    document.getElementById("tracking-vid").volume = 0;
  }
  
  var firstPlay = false;
  function TruePlayVid() {
    vidMat.alpha = 1;
  
    document.getElementById("alpha-vid").pause();
    document.getElementById("alpha-vid").currentTime = 0
    document.getElementById("alpha-vid").play();
  
    document.getElementById("tracking-vid").pause();
    document.getElementById("tracking-vid").currentTime = 0
    document.getElementById("tracking-vid").volume = 1;
    document.getElementById("tracking-vid").play();
  
  
    if (!firstPlay) {
      vidMat.opacityTexture = new BABYLON.VideoTexture("video", document.getElementById('alpha-vid'), scene, false, {
        autoplay: false,
        loop: false, muted: true
      });
  
      vidMat.albedoTexture = new BABYLON.VideoTexture("video", document.getElementById('tracking-vid'), scene, false, {
        autoplay: false,
        loop: false, muted: true
      });
  
  
  
      vidMat.opacityTexture.getAlphaFromRGB =true
  
      firtsPlay = true
    }
  }
function CloseBox() {
    jungleVidTex.video.pause();
    jungleVidTex.video.currentTime = 0

    jungleVidAlpha.video.pause();
    jungleVidAlpha.video.currentTime = 0
}





//scene.debugLayer.show();
function load() {
    XRExtras.Loading.showLoading({ onxrloaded });
}

function CallExtras() {

};

window.onload = function () {
    loadVideo();
    if (window.XRExtras)
        load();
    else
        window.addEventListener('xrextrasloaded', load);
}





