AFRAME.registerComponent('check_size', {
	init: function() {
	  var el = this.el;
	  // this.data is the schema above, either delcared by user or default

	  var model = el.object3D;
	  el.addEventListener('loaded', function(e) {
		var box = new THREE.Box3().setFromObject( model );
		var size = box.getSize();
		console.log(el.id, " size:" , size);
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
	init: function() {
	  var el = this.el;

	  // this.data is the schema above, either delcared by user or default
	  var data = this.data;
	  var model = el.object3D;
	  el.addEventListener('model-loaded', function(e) {
		var box = new THREE.Box3().setFromObject( model );
		var size = box.getSize();

		// retrieving the original size of the model in a box
		var x = size.x;
		var y = size.y;
		var z = size.z;
		
		// checking if user wants to alter the x, y or z value
		if(data.axis === 'x') {
		  var scale = data.value / x;
		}
		else if(data.axis === 'y') {
		  var scale = data.value / y;
		}
		else {
		  var scale = data.value / z;
		}
		el.setAttribute('scale', scale + ' ' + scale + ' ' + scale);
	  });
	}
  });

AFRAME.registerComponent("click_component", {
  init: function() {
    console.log("object registered with 'click_componen': ", this.el.id);

    // retrieving the model by its ID
    theElement = document.querySelector("#" + this.el.id);

    theElement.addEventListener("click", function(theEvent) {
      console.log(
        "The item clicked is: #" +
          theEvent.target.id +
          "\nProperties can be used: ", theEvent);
    });

    theElement.addEventListener("mouseenter", function(theEvent) {
      console.log("intersected!!!");
      console.log("Current Coords: ", theEvent.detail.intersection.point);
    });
  }
});

AFRAME.registerComponent("drag-rotate-component", {
  schema: {
    speed: {
      default: 3
    }
  },
  init: function() {
    console.log("object registered with 'drag-rotate-component': ", this.el.id);
    this.a = false;
    this.x_cord = 0;
    this.y_cord = 0;
    document.addEventListener("mousedown", this.OnDocumentMouseDown.bind(this));
    document.addEventListener("mouseup", this.OnDocumentMouseUp.bind(this));
    document.addEventListener("mousemove", this.OnDocumentMouseMove.bind(this));
  },
  OnDocumentMouseDown: function(event) {
    this.a = true;
    this.x_cord = event.clientX;
    this.y_cord = event.clientY;
  },
  OnDocumentMouseUp: function() {
    this.a = false;
  },
  OnDocumentMouseMove: function(event) {
    if (this.a) {
      var temp_x = event.clientX - this.x_cord;
      var temp_y = event.clientY - this.y_cord;
      if (Math.abs(temp_y) < Math.abs(temp_x)) {
        this.el.object3D.rotateY((temp_x * this.data.speed) / 1000);
      } else {
        this.el.object3D.rotateX((temp_y * this.data.speed) / 1000);
      }
      this.x_cord = event.clientX;
      this.y_cord = event.clientY;
    }
  }
});

AFRAME.registerComponent("set_scale_component", {
  init: function() {

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


AFRAME.registerComponent("check_scale", {
  init: function() {

		allEntityList = document.querySelectorAll("a-entity");

		console.log("<a-entity> detected: ", allEntityList.length);
		for(theEntity of allEntityList) {

			if(!theEntity.id == ""){
				console.log("id:", theEntity.id, "\nscale:", theEntity.object3D.scale);
			}
		}
    }
});


AFRAME.registerComponent("markerhandler", {
  init: function() {
    const animatedMarker = document.querySelector("#the-barcode");
    const aEntity = document.querySelector("#animated-model");
    theCoordsList = [];
    counter = 0;

    animatedMarker.addEventListener("click", function(theEvent) {
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