/**
 * @author sinsedrix / https://github.com/sinsedrix
 */

// MengerBoxGeometry

function MengerBoxGeometry( radius, level, primitive ) {

	THREE.Geometry.call( this );

	this.type = 'MengerBoxGeometry';

	this.parameters = {
		radius: radius,
		level: level,
		primitive: primitive
	};

	var scope = this;

	radius = radius || 3;
	level = level || 1;
	primitive = primitive || THREE.BoxGeometry;

	// build geometry
	
	function spongeCube(n, c, x, y, z) {
		if(!n) {
			var geometry = new primitive( c, c, c );
			geometry.translate(x, y, z);
			scope.merge( geometry );
		} else {
			c /= 3;
			n--;
			//
			spongeCube(n, c, x, y, z);
			spongeCube(n, c, x+c, y, z);
			spongeCube(n, c, x+2*c, y, z);
			
			spongeCube(n, c, x, y+c, z);
			spongeCube(n, c, x+2*c, y+c, z);
			
			spongeCube(n, c, x, y+2*c, z);
			spongeCube(n, c, x+c, y+2*c, z);
			spongeCube(n, c, x+2*c, y+2*c, z);
			//
			spongeCube(n, c, x, y, z+c);
			spongeCube(n, c, x+2*c, y, z+c);
			
			spongeCube(n, c, x, y+2*c, z+c);
			spongeCube(n, c, x+2*c, y+2*c, z+c);
			//
			spongeCube(n, c, x, y, z+2*c);
			spongeCube(n, c, x+c, y, z+2*c);
			spongeCube(n, c, x+2*c, y, z+2*c);
			
			spongeCube(n, c, x, y+c, z+2*c);
			spongeCube(n, c, x+2*c, y+c, z+2*c);
			
			spongeCube(n, c, x, y+2*c, z+2*c);
			spongeCube(n, c, x+c, y+2*c, z+2*c);
			spongeCube(n, c, x+2*c, y+2*c, z+2*c);
			
		}				
	}
	
	spongeCube(level, radius, -radius/2, -radius/2, -radius/2);
}

MengerBoxGeometry.prototype = Object.create( THREE.Geometry.prototype );
MengerBoxGeometry.prototype.constructor = MengerBoxGeometry;

// MengerTetraGeometry

function MengerTetraGeometry( radius, level, primitive ) {

	THREE.Geometry.call( this );

	this.type = 'MengerTetraGeometry';

	this.parameters = {
		radius: radius,
		level: level,
		primitive: primitive
	};

	var scope = this;
	
	var sqrt2 = Math.sqrt(2);
	var sqrt3 = Math.sqrt(3);
	
	radius = radius || 1;
	level = level || 1;
	primitive = primitive || TetraGeometry;

	// build geometry
	
	function spongeTetra(n, r, x, y, z) {
		if(!n) {
			var geometry = new primitive(r);
			geometry
				.translate(x, y, z)
				.scale(r,r,r)
				;
			scope.merge( geometry );
		} else {
			r /= 2;
			n--;
			//var c1 = r*(1/2+sqrt3/6);
			var dx = r*0.78;
			var dz = r*0.45;
			spongeTetra(n, r, x-dx,   y-r*sqrt2/3, z+dz);
			spongeTetra(n, r, x+dx,   y-r*sqrt2/3, z+dz);
			spongeTetra(n, r,    x,   y-r*sqrt2/3, z-2*dz);
			spongeTetra(n, r,    x, y+r*2*sqrt2/3, z);
		}				
	}
	
	spongeTetra(level, radius, 0,0,0);
}

MengerTetraGeometry.prototype = Object.create( THREE.Geometry.prototype );
MengerTetraGeometry.prototype.constructor = MengerTetraGeometry;

//export { MengerBoxGeometry, MengerTetraGeometry };
