
AFRAME.registerComponent('click_component', {
        init: function() {
			console.log("The model attached with 'click_component' is: ", this);
			
			// retrieving the model by its ID
			theElement = document.querySelector("#" + this.el.id);
			console.log("the element retrieved: ", theElement);

			theElement.addEventListener('click', 
			function(theEvent){
				console.log("The item clicked is: #" + theEvent.target.id +
							"\nProperties can be used: ", theEvent);
			});

			theElement.addEventListener('mouseenter', 
			function(theEvent){
				console.log("intersected!!!");
				console.log("Current Coords: ", theEvent.detail.intersection.point);
			
			});
        },
    });

	AFRAME.registerComponent('drag-rotate-component', {
		schema: {
			speed: {
				default: 3
			}
		},
		init: function() {
			console.log("this is: ", this);
			this.a = false;
			this.x_cord = 0;
			this.y_cord = 0;
			document.addEventListener('mousedown', this.OnDocumentMouseDown.bind(this));
			document.addEventListener('mouseup', this.OnDocumentMouseUp.bind(this));
			document.addEventListener('mousemove', this.OnDocumentMouseMove.bind(this));
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
					this.el.object3D.rotateY(temp_x * this.data.speed / 1000);
				} else {
					this.el.object3D.rotateX(temp_y * this.data.speed / 1000);
				}
				this.x_cord = event.clientX;
				this.y_cord = event.clientY;
			}
		}
	});

AFRAME.registerComponent('markerhandler', {

init: function() {
	const animatedMarker = document.querySelector("#the-barcode");
	const aEntity = document.querySelector("#animated-model");
	theCoordsList = [];
	counter = 0;

	animatedMarker.addEventListener('click', 
	function(theEvent){
		const intersectedElement = theEvent && theEvent.detail && theEvent.detail.intersectedEl;
			
		if (aEntity && intersectedElement === aEntity) {
			console.clear();
			++counter;
			theCoordsList.push(theEvent.detail.intersection.point);
			
			console.log("the intersected element: ", intersectedElement);
			console.log("the event: ", theEvent);
			console.log("the event detail: ", theEvent.detail);
			console.log("the event detail intersectedEl: ", theEvent.detail.intersectedEl);


			console.log("Clicked count:", counter);
			console.log("Current Coords: ", theEvent.detail.intersection.point);

			console.log("Coords records: ");
			for(theCoord of theCoordsList){
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
}});



	

function setAttribute() {
	console.clear();
	// console.log("Console cleared");
	var theObject = document.querySelectorAll('a-entity')[1].object3D;
	// console.log("The object ", theObject.el, " : ", theObject)

	theObject.scale.set(0.0025, 0.0025, 0.0025)


}