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

        hammertime.on('pan', (ev) => {
            let containerRotation = model.getAttribute("rotation");
            switch (ev.direction) {
                case 2:
                    //left
                    containerRotation.x += 4;
                    break;
                case 4:
                    //right
                    containerRotation.x -= 4;
                    break;
                case 8:
                    //up
                    containerRotation.z += 4;
                    break;
                case 16:
                    //down
                    containerRotation.z -= 4;
                    break;
                default:
                    break;
            }
            model.setAttribute("rotation", containerRotation);
        });
    }
});

AFRAME.registerComponent("swipe-rotate-component", {
    init: function () {
        var element = document.querySelector('body');
        var model = document.getElementById('parentBox');
        var hammertime = new Hammer(element);

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

            console.log("rotation: ", rotation);
        });
    }
});

AFRAME.registerComponent("pinch-zoom-component", {
    init: function () {
        var element = document.querySelector('body');
        var model = document.getElementById('parentBox');
        var hammertime = new Hammer(element);

        var pinch = new Hammer.Pinch();
        hammertime.add(pinch);

        hammertime.on("pinch", (ev) => {
            let scale = {
                x: ev.scale,
                y: ev.scale,
                z: ev.scale
            }
            model.setAttribute("scale", scale);
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
