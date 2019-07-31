AFRAME.registerComponent('onload_activity', {
    init: function () {
        let theSceneElement = this.el;

        console.log("scene?", theSceneElement);

        theSceneElement.addEventListener('loaded', function (theEvent) {
            console.log("all loaded!");

            // trying to fix the onload interacted issue with this function
        });
    }
});

AFRAME.registerComponent('check_size', {
    init: function () {
        var el = this.el;
        // this.data is the schema above, either delcared by user or default

        var model = el.object3D;
        el.addEventListener('model-loaded', function (e) {
            var box = new THREE.Box3().setFromObject(model);
            var size = box.getSize();
            console.log(el.id, " size:", size);
            // retrieving the original size of the model in a box
            // var x = size.x;
            // var y = size.y;
            // var z = size.z;
        });
    }
});


AFRAME.registerComponent('resize', {
    schema: {
        axis: {
            type: 'string',
            default: 'x'
        },
        value: {
            type: 'number',
            default: 1
        }
    },
    init: function () {
        var el = this.el;

        // this.data is the schema above, either delcared by user or default
        var data = this.data;
        var model = el.object3D;
        el.addEventListener('model-loaded', function (e) {
            var box = new THREE.Box3().setFromObject(model);
            var size = box.getSize();

            // retrieving the original size of the model in a box
            var x = size.x;
            var y = size.y;
            var z = size.z;

            // checking if user wants to alter the x, y or z value
            if (data.axis === 'x') {
                var scale = data.value / x;
            } else if (data.axis === 'y') {
                var scale = data.value / y;
            } else {
                var scale = data.value / z;
            }
            el.setAttribute('scale', scale + ' ' + scale + ' ' + scale);
        });
    }
});

AFRAME.registerComponent("click_component", {
    init: function () {
        console.log("object registered with 'click_component': ", this.el.id);

        // retrieving the model by its ID
        theElement = document.querySelector("#" + this.el.id);

        theElement.addEventListener("click", function (theEvent) {

            console.log("Clicked: ", theEvent.target.id, " ", theEvent);

            // console.log(
            // "\n\nItem clicked: " +
            //     theEvent.target.id +
            //     "\n\ntheEvent: ", theEvent,
            //     "\n\n3D Properties: ", document.querySelector("#" + theEvent.target.id).object3D,
            //     "\n\ntheElement: ", document.querySelector("#" + theEvent.target.id));

            // console.log("Item clicked: ", theEvent.target.id);

            // console.log("Does material property exist? : ", document.querySelector("#" + theEvent.target.id).getAttribute('material') != null);
            // if(document.querySelector("#" + theEvent.target.id).getAttribute('material') != null) {
            //     if(document.querySelector("#" + theEvent.target.id).getDOMAttribute('material').visible == "true"){
            //         // console.log("setting visibility to false");
            //         document.querySelector("#" + theEvent.target.id).setAttribute('material', 'visible', 'false');
            //     }
            //     else{
            //         // console.log("setting visibility to true");
            //         document.querySelector("#" + theEvent.target.id).setAttribute('material', 'visible', 'true');
            //     }
            // }


        });

        theElement.addEventListener("mouseenter", function (theEvent) {
            // console.log("intersected:", theEvent.target.id);
            //   console.log("Current Coords: ", theEvent.detail.intersection.point);
        });
    }
});


AFRAME.registerComponent("pan-rotate-component", {
    init: function () {
        var element = document.querySelector('body');
        var model = document.getElementById('parentBox');
        var hammertime = new Hammer(element);
        
        var fronttext_1 = document.getElementsByClassName('the_word_front')[0];
        var fronttext_2 = document.getElementsByClassName('the_word_front')[1];
        var backtext = document.getElementById('the_word_back');
        
        var frontindicator_1 = document.getElementById('top_Diameter');
        var frontindicator_2 = document.getElementById('top_Flatness');
        var backindicator = document.getElementById('bottom_Diameter');

        hammertime.on('pan', (ev) => {
            let rotation = model.getAttribute("rotation");
            switch (ev.direction) {
                case 2:
                    //left
                    rotation.x += 4;
                    break;
                case 4:
                    //right
                    rotation.x -= 4;
                    break;
                case 8:
                    //up
                    rotation.z += 4;
                    break;
                case 16:
                    //down
                    rotation.z -= 4;
                    break;
                default:
                    break;
            }
            model.setAttribute("rotation", rotation);
            
            if (Math.abs(parseInt((rotation.x/90) - (rotation.z/90)) % 4) == 0) {
                fronttext_1.setAttribute("text", "opacity", "1");
                fronttext_2.setAttribute("text", "opacity", "1");
                
                frontindicator_1.setAttribute("material", "visible", "true");
                frontindicator_2.setAttribute("material", "visible", "true");
                
            } else if (Math.abs(parseInt((rotation.x/90) - (rotation.z/90)) % 4) == 2){
                backtext.setAttribute("text", "opacity", "1");
                backindicator.setAttribute("material", "visible", "true");
                
            } else {
                fronttext_1.setAttribute("text", "opacity", "0");
                fronttext_2.setAttribute("text", "opacity", "0");
                backtext.setAttribute("text", "opacity", "0");
                
                frontindicator_1.setAttribute("material", "visible", "false");
                frontindicator_2.setAttribute("material", "visible", "false");
                backindicator.setAttribute("material", "visible", "false");
                
            }
        });
    }
});

AFRAME.registerComponent("swipe-rotate-component", {
    init: function () {
        var element = document.querySelector('body');
        var model = document.getElementById('parentBox');
        var hammertime = new Hammer(element);
        
        var fronttext_1 = document.getElementsByClassName('the_word_front')[0];
        var fronttext_2 = document.getElementsByClassName('the_word_front')[1];
        var backtext = document.getElementById('the_word_back');
        
        var frontindicator_1 = document.getElementById('top_Diameter');
        var frontindicator_2 = document.getElementById('top_Flatness');
        var backindicator = document.getElementById('bottom_Diameter');

        hammertime.get('swipe').set({
            direction: Hammer.DIRECTION_ALL
        });

        hammertime.on('swipe', function (ev) {
            let rotation = model.getAttribute("rotation");
            switch (ev.direction) {
                case Hammer.DIRECTION_LEFT:
                    rotation.x += 90;
                    break;
                case Hammer.DIRECTION_RIGHT:
                    rotation.x -= 90;
                    break;
                case Hammer.DIRECTION_UP:
                    rotation.z += 90;
                    break;
                case Hammer.DIRECTION_DOWN:
                    rotation.z -= 90;
                    break;
                default:
                    break;
            }
            model.setAttribute('rotation', rotation);            
            
            if (Math.abs(parseInt((rotation.x/90) - (rotation.z/90)) % 4) == 0) {
                fronttext_1.setAttribute("text", "opacity", "1");
                fronttext_2.setAttribute("text", "opacity", "1");
                
                frontindicator_1.setAttribute("material", "visible", "true");
                frontindicator_2.setAttribute("material", "visible", "true");
                
            } else if (Math.abs(parseInt((rotation.x/90) - (rotation.z/90)) % 4) == 2){
                backtext.setAttribute("text", "opacity", "1");
                backindicator.setAttribute("material", "visible", "true");
                
            } else {
                fronttext_1.setAttribute("text", "opacity", "0");
                fronttext_2.setAttribute("text", "opacity", "0");
                backtext.setAttribute("text", "opacity", "0");
                
                frontindicator_1.setAttribute("material", "visible", "false");
                frontindicator_2.setAttribute("material", "visible", "false");
                backindicator.setAttribute("material", "visible", "false");
            }

            // var the_model = document.getElementById('testingZoom');
            // let scale = {
            //     x: "3",
            //     y: "3",
            //     z: "3"
            // }
            // // the_model.setAttribute("scale", scale);
            // console.log("HAHAHA THE MODE:" , the_model);
            // console.log("HAHAHA THE MODE:" , the_model.object3D);

        });
    }
});

AFRAME.registerComponent("pinch-zoom-component", {
    init: function () {

        let minScale = 1;
        let maxScale = 5;
        
        var element = document.querySelector('body');
        var model = document.getElementById('testingZoom');
        var hammertime = new Hammer(element);

        var pinch = new Hammer.Pinch();
        hammertime.add(pinch);

        // get user dynamic scale value
        let currentScaleValue = model.object3D.scale;
        hammertime.on("pinch", (ev) => {
            // let scale = {
            //     x: ev.scale,
            //     y: ev.scale,
            //     z: ev.scale
            // }

            // retrieve the current model scale value
            // looks like {x: 1, y: 1, z: 1}

            console.log("currentscaleValue:", currentScaleValue);

            toScale = ev.scale - 1;
            console.log("current to scale: ", toScale, typeof(toScale))

            if (currentScaleValue.x <= minScale && toScale < 0) {
                currentScaleValue = {
                    x: minScale,
                    y: minScale,
                    z: minScale
                }
            } else if (currentScaleValue.x >= maxScale && toScale > 0) {
                currentScaleValue = {
                    x: maxScale,
                    y: maxScale,
                    z: maxScale
                }
            } else {
                currentScaleValue.x += toScale;
                currentScaleValue.y += toScale;
                currentScaleValue.z += toScale;
            }

            console.log("current model scale:", currentScaleValue.x);
            
        });
    }
});

AFRAME.registerComponent("set_scale_component", {
    init: function () {

        console.log("object registered with 'set_scale_component': ", this.el.id);

        theElementId = this.el.id;
        // this is how you access the components avaialble
        // theElement = document.getElementById(theElementId);
        // theElementComponent = theElement.components;
        // console.log("The components available: ", theElementComponent);

        theObject3D = document.querySelector("#" + theElementId).object3D;
        theObject3D.scale.x = 0.0025;
        theObject3D.scale.y = 0.0025;
        theObject3D.scale.z = 0.0025;
    }
});

AFRAME.registerComponent("list_properties", {
    init: function () {

        allEntityList = document.querySelectorAll("a-entity");

        console.log("<a-entity> detected: ", allEntityList.length);
        for (theEntity of allEntityList) {
            if (!theEntity.id == "") {

                console.log("id:", theEntity.id,
                    "\nscale:", theEntity.object3D.scale,
                    "\ncomponents:", document.querySelector("#" + theEntity.id).components,
                    "\nproperties:", theEntity.object3D);
            }
        }
    }
});


AFRAME.registerComponent("markerhandler", {
    init: function () {
        const animatedMarker = document.querySelector("#the-barcode");
        const aEntity = document.querySelector("#animated-model");
        theCoordsList = [];
        counter = 0;

        animatedMarker.addEventListener("click", function (theEvent) {
            const intersectedElement =
                theEvent && theEvent.detail && theEvent.detail.intersectedEl;

            if (aEntity && intersectedElement === aEntity) {
                console.clear();
                ++counter;
                theCoordsList.push(theEvent.detail.intersection.point);

                console.log("the intersected element: ", intersectedElement);
                console.log("the event: ", theEvent);
                console.log("the event detail: ", theEvent.detail);
                console.log(
                    "the event detail intersectedEl: ",
                    theEvent.detail.intersectedEl
                );

                console.log("Clicked count:", counter);
                console.log("Current Coords: ", theEvent.detail.intersection.point);

                console.log("Coords records: ");
                for (theCoord of theCoordsList) {
                    console.log(theCoord);
                }
                // console.log("Face: ", ev.detail.intersection.face);
                // alert("Coords x: " + ev.detail.intersection.point['x'] +
                //     "\n\nCoords y: " + ev.detail.intersection.point['y'] +
                //     "\n\nCoords z: " + ev.detail.intersection.point['z']);
                // alert("hihihi");

                // window.location.replace("http://stackoverflow.com");

                // const scale = aEntity.getAttribute('scale');
                // Object.keys(scale).forEach((key) => scale[key] = scale[key] + 0.001);
                // aEntity.setAttribute('scale', scale);
            }
        });
    }
});
