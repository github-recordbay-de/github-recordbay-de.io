let All_AR, Karton_P

function LoadAssets(scene, assetsManager) {
    //CanyonEnvTask
    CanyonEnvTask = assetsManager.addCubeTextureTask("CanyonEnvTask", "./assets/environment.dds");

    CanyonEnvTask.onSuccess = function (task) {
        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTexture.rotationY = 180 * (Math.PI / 180);
        hdrTexture.level = 1

        hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
        hdrSkyboxMaterial.reflectionTexture.level = 0.1
        hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = false;
        // Create Skybox
        hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 0
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    CanyonEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }
    
    Karton_P = new BABYLON.TransformNode("Karton_P");
    KartonLoaderTask = assetsManager.addMeshTask("", "", "./assets/" + "plane side" + ".glb")
    KartonLoaderTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Karton_P
        //Karton_P.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)
        
    }
    KartonLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    //FINISH
    assetsManager.onFinish = function (task) {
        ChangeMaterialProperties()
        CreateAnimations()
        playJungleVid();
        CloseBox()
        //All_AR.rotate(BABYLON.Axis.Y, 90*(Math.PI/180), BABYLON.Space.LOCAL);
    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    assetsManager.load();
}