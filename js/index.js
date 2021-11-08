                                                                 
var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true }); // Generate the BABYLON 3D engine
var myGUI
var light1, light, shadowGenerator, moveScene_P
var camera
var slotmachinePlaced = false;
var isWinning = false;
var ground,sphere
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

    return scene;
};

var scene = createScene(); //Call the createScene function

var onImageUpdated = function(e) {
    UpdateObj(e)
};

var factor=0.045;
var onImageFound = function(e) {

    document.getElementById("trackState").style.backgroundColor = "green"
    UpdateObj(e);
    playJungleVid();
    // All_AR.position.copyFrom(e.position)
    // All_AR.rotationQuaternion = new BABYLON.Quaternion();
    // All_AR.rotationQuaternion.copyFrom(e.rotation);
    // All_AR.scaling.set(e.scale, e.scale, e.scale)

};

function UpdateObj(e){
    //alert("Image found.");
    Karton_P.position = new BABYLON.Vector3(e.position.x, e.position.y, e.position.z)

    Karton_P.rotationQuaternion = new BABYLON.Quaternion();
    Karton_P.rotationQuaternion.x = e.rotation.x ;
    Karton_P.rotationQuaternion.y = e.rotation.y;
    Karton_P.rotationQuaternion.z = e.rotation.z ;
    Karton_P.rotate(BABYLON.Axis.Y, -180*(Math.PI/180), BABYLON.Space.LOCAL);
    Karton_P.scaling = new BABYLON.Vector3(e.scale*factor, e.scale*factor,e.scale*factor);
}
var onImageLost = function(e) {
    document.getElementById("trackState").style.backgroundColor = "red"
};

var onImageScanning = function(e){
    document.getElementById("trackState").style.backgroundColor = "blue"
    console.log("scanning!!!")
}

var onxrloaded = function() {
   

    // Set list of recognized image targets
    XR8.XrController.configure({imageTargets: ["katjes_tracker"]});

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


/******* End of the create scene function ******/

//scene.debugLayer.show();
function load() {
    XRExtras.Loading.showLoading({onxrloaded});
}

window.onload = function() {
    if (window.XRExtras)
        load();
    else
        window.addEventListener('xrextrasloaded', load);
};



// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

