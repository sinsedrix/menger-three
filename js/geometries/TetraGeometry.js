/**
 * @author sinsedrix / https://github.com/sinsedrix
 */

//import { Geometry } from '../core/Geometry.js';
//import { PolyhedronBufferGeometry } from './PolyhedronGeometry.js';

// TetraGeometry

function TetraGeometry( radius, detail ) {

	THREE.Geometry.call( this );

	this.type = 'TetraGeometry';

	this.parameters = {
		radius: radius,
		detail: detail
	};

	this.fromBufferGeometry( new TetraBufferGeometry( radius, detail ) );
	this.mergeVertices();

}

TetraGeometry.prototype = Object.create( THREE.Geometry.prototype );
TetraGeometry.prototype.constructor = TetraGeometry;

// TetraBufferGeometry
var sqrt3 = Math.sqrt(3);
var sqrt2 = Math.sqrt(2);
	
function TetraBufferGeometry( radius, detail ) {
	
	var vertices = [
		sqrt3/2, -sqrt2/3, 1/2, 	- sqrt3/2, -sqrt2/3, 1/2, 	0, -sqrt2/3, - 1, 	0, 2*sqrt2/3, 0
	];

	var indices = [
		2, 1, 0, 	0, 3, 2,	1, 3, 0,	2, 3, 1
	];

	THREE.PolyhedronBufferGeometry.call( this, vertices, indices, radius, detail );

	this.type = 'TetraBufferGeometry';

	this.parameters = {
		radius: radius,
		detail: detail
	};

}

TetraBufferGeometry.prototype = Object.create( THREE.PolyhedronBufferGeometry.prototype );
TetraBufferGeometry.prototype.constructor = TetraBufferGeometry;


//export { TetraGeometry, TetraBufferGeometry };
