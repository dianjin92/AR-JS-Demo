const pan_angle = 1;
const minScale = 1;
const maxScale = 5;

AFRAME.registerComponent('track_marker_component-on', {
    init: function () {
        let theSceneElement = this.el;

        console.log("track_marker element:", theSceneElement);

        theSceneElement.addEventListener('markerFound', function (theEvent) {
            console.log("markers found");
        });

        theSceneElement.addEventListener('markerLost', function (theEvent) {
            console.log("markers lost");
        });
    }
});


AFRAME.registerComponent('resize_component-on', {
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

        // this.data is the schema above, either using values delcared by user through or the default above if not declared by user
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

AFRAME.registerComponent("click_component-on", {
    init: function () {
        // retrieving the model by its ID
        theElement = document.querySelector("#" + this.el.id);


        theElement.addEventListener("click", function (theEvent) {
            console.log("Item Clicked:\n", theEvent.target.id, "\n\nProperties:\n", theEvent);
            // console.log(
            // "\n\nItem clicked: " +
            //     theEvent.target.id +
            //     "\n\ntheEvent: ", theEvent,
            //     "\n\n3D Properties: ", document.querySelector("#" + theEvent.target.id).object3D,
            //     "\n\ntheElement: ", document.querySelector("#" + theEvent.target.id));

            // Example of setAttribute()
            // document.querySelector("#" + theEvent.target.id).setAttribute('material', 'visible', 'false');
        });

        theElement.addEventListener("mouseenter", function (theEvent) {
            //   console.log("mouse entered:", theEvent.target.id);
              console.log("mouse entered:", theEvent.target);
              if(theEvent.target.classList.contains("buttonType")){
                theEvent.target.setAttribute('material', 'color', 'gray')

                theEvent.target.addEventListener("mouseleave", function(theEvent){
                    theEvent.target.setAttribute('material', 'color', 'black')
                
                });
              }

        });
    }
});


AFRAME.registerComponent('raycaster_listen_component-on', {
    init: function () {

        theTaggedElement = this.el;

        theTaggedElement.addEventListener("raycaster-intersected", function(theEvent) {
            console.log("raycaster intersected: ", theEvent.target.id);
        });
        theTaggedElement.addEventListener("raycaster-intersected-cleared", function(theEvent) {
            this.raycaster = null;
        });
    },

//    tick: function () {
//        console.log("intersection", this.raycaster);
//        if (!this.raycaster) {
//            return;
//        } // Not intersecting.
//
//        let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
//        if (!intersection) {
//            return;
//        }
//        console.log("intersection2", intersection.point);
//    }
});


AFRAME.registerComponent("pan_rotate_component-on", {
    init: function () {
        var element = document.querySelector('body');
        var model = document.getElementById('parentBox');
        var hammertime = new Hammer(element);

        var messageElement = document.getElementById('parentMessage');

        var fronttext_1 = messageElement.children[0];
        var fronttext_2 = messageElement.children[1];
        var backtext = messageElement.children[2];

        var frontindicator_1 = model.children[1];
        var frontindicator_2 = model.children[2];
        var backindicator = model.children[3];

        hammertime.on('pan', (ev) => {
            let rotation = model.getAttribute("rotation");
            switch (ev.direction) {
                case 2:
                    //left
                    rotation.x += pan_angle;
                    break;
                case 4:
                    //right
                    rotation.x -= pan_angle;
                    break;
                case 8:
                    //up
                    rotation.z += pan_angle;
                    break;
                case 16:
                    //down
                    rotation.z -= pan_angle;
                    break;
                default:
                    break;
            }
            model.setAttribute("rotation", rotation);

            // toggle front facing stuffs on
            if (getModelFace(rotation.x, rotation.z, true) == 0) {
                fronttext_1.setAttribute("text", "opacity", "1");
                fronttext_2.setAttribute("text", "opacity", "1");

                frontindicator_1.setAttribute("material", "visible", "true");
                frontindicator_2.setAttribute("material", "visible", "true");

            // toggle back facing stuffs on
            } else if (getModelFace(rotation.x, rotation.z) <= 3 && getModelFace(rotation.x, rotation.z) >= 1.5) {
                backtext.setAttribute("text", "opacity", "1");
                backindicator.setAttribute("material", "visible", "true");
                backindicator.setAttribute("material", "opacity", "1");
            
            // fallback code: toggle anything else off
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

AFRAME.registerComponent("swipe_rotate_component-on", {
    init: function () {
        var element = document.querySelector('body');
        var model = document.getElementById('parentBox');
        var hammertime = new Hammer(element);
        
        var messageElement = document.getElementById('parentMessage');

        var fronttext_1 = messageElement.children[0];
        var fronttext_2 = messageElement.children[1];
        var backtext = messageElement.children[2];

        var frontindicator_1 = model.children[1];
        var frontindicator_2 = model.children[2];
        var backindicator = model.children[3];

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

            if (getModelFace(rotation.x, rotation.z, true) == 0) {
                fronttext_1.setAttribute("text", "opacity", "1");
                fronttext_2.setAttribute("text", "opacity", "1");

                frontindicator_1.setAttribute("material", "visible", "true");
                frontindicator_1.setAttribute("material", "opacity", "1");
                frontindicator_2.setAttribute("material", "visible", "true");
                frontindicator_2.setAttribute("material", "opacity", "1");

            } else if (getModelFace(rotation.x, rotation.z, true) == 2) {
                backtext.setAttribute("text", "opacity", "1");
                backindicator.setAttribute("material", "visible", "true");
                backindicator.setAttribute("material", "opacity", "1");

            } else {
                fronttext_1.setAttribute("text", "opacity", "0");
                fronttext_2.setAttribute("text", "opacity", "0");
                backtext.setAttribute("text", "opacity", "0");

                frontindicator_1.setAttribute("material", "visible", "false");
                frontindicator_1.setAttribute("material", "opacity", "0");
                frontindicator_2.setAttribute("material", "visible", "false");
                frontindicator_2.setAttribute("material", "opacity", "0");
                backindicator.setAttribute("material", "visible", "false");
                backindicator.setAttribute("material", "opacity", "0");
            }

        });
    }
});

AFRAME.registerComponent("pinch_scroll_zoom_component-on", {
    init: function () {

        var element = document.querySelector('body');
        var model = document.getElementById('zoomArea');
        var hammertime = new Hammer(element);

        var pinch = new Hammer.Pinch();
        hammertime.add(pinch);

        // get user dynamic scale value
        let currentScaleValue = model.object3D.scale;
        hammertime.on("pinch", (ev) => {
            toScale = ev.scale - 1;
            console.log("current to scale: ", toScale, typeof (toScale))

            if (currentScaleValue.x <= minScale && toScale < 0) {
                currentScaleValue.x = minScale;
                currentScaleValue.y = minScale;
                currentScaleValue.z = minScale;
            } else if (currentScaleValue.x >= maxScale && toScale > 0) {
                currentScaleValue.x = maxScale;
                currentScaleValue.y = maxScale;
                currentScaleValue.z = maxScale;
            } else {
                currentScaleValue.x += toScale;
                currentScaleValue.y += toScale;
                currentScaleValue.z += toScale;
            }

            console.log("current model scale:", currentScaleValue.x);

        });

        element.addEventListener("wheel", scroll);
    }
});

function scroll(event) {
    var scroll = event.deltaY;
    var model = document.getElementById('zoomArea');

    let currentScaleValue = model.object3D.scale;

    var toScale = 0.2;

    if (scroll > 0) {
        if (currentScaleValue.x <= minScale) {
            currentScaleValue.x = minScale;
            currentScaleValue.y = minScale;
            currentScaleValue.z = minScale;
        } else {
            currentScaleValue.x -= toScale;
            currentScaleValue.y -= toScale;
            currentScaleValue.z -= toScale;
        }

    } else {
        if (currentScaleValue.x >= maxScale) {
            currentScaleValue.x = maxScale;
            currentScaleValue.y = maxScale;
            currentScaleValue.z = maxScale;
        } else {
            currentScaleValue.x += toScale;
            currentScaleValue.y += toScale;
            currentScaleValue.z += toScale;
        }
    }
}

AFRAME.registerComponent("list_properties_component-on", {
    init: function () {

        allEntityList = document.querySelectorAll("a-entity");

//        console.log("<a-entity> detected: ", allEntityList.length);
        for (theEntity of allEntityList) {
            if (!theEntity.id == "") {

//                console.log("id:", theEntity.id,
//                    "\nscale:", theEntity.object3D.scale,
//                    "\ncomponents:", document.querySelector("#" + theEntity.id).components,
//                    "\nproperties:", theEntity.object3D);
            }
        }


        let theSceneElement = this.el;

        theSceneElement.addEventListener('loaded', function (theEvent) {
            console.log("all loaded!");

            // trying to fix the onload interacted issue with this function
        });
    }
});


AFRAME.registerComponent('check_size-on', {
    init: function () {
        let theSceneElement = this.el;
        let theSceneModel = theSceneElement.object3D;

        theSceneElement.addEventListener('model-loaded', function (theEvent) {
            var box = new THREE.Box3().setFromObject(theSceneModel);
            var size = box.getSize();
            console.log(theSceneElement.id, " size:", size);
        });
    }
});

function getModelFace(x, z, returnInt=false) {
    
    result = Math.abs(((x / 90) - (z / 90)) % 4);
    
    if (returnInt) {
        return parseInt(result);
    } else {
        return result;
    }
}
