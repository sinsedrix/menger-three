/**
 * @author sinsedrix / https://github.com/sinsedrix
 */

var twoPi = Math.PI * 2;

function updateGroupGeometry( mesh, geometry ) {

	if ( geometry.isGeometry ) {

		geometry = new THREE.BufferGeometry().fromGeometry( geometry );

		console.warn( 'THREE.GeometryBrowser: Converted Geometry to BufferGeometry.' );

	}

	mesh.children[ 0 ].geometry.dispose();
	mesh.children[ 0 ].geometry = geometry;

	// these do not update nicely together if shared

}

var guis = {

	MengerBoxGeometry: function ( mesh ) {

		var data = {
			side: 18,
			level: 2
		};

		function generateGeometry() {

			updateGroupGeometry( mesh,
				new MengerBoxGeometry(
					data.side, data.level
				)
			);

		}

		var folder = gui.addFolder( 'MengerBoxGeometry' );

		folder.add( data, 'side', 6, 36 ).onChange( generateGeometry );
		folder.add( data, 'level', 0, 8 ).step(1).onChange( generateGeometry );

		generateGeometry();

	},
	MengerTetraGeometry: function ( mesh ) {

		var data = {
			side: 6,
			level: 2
		};

		function generateGeometry() {

			updateGroupGeometry( mesh,
				new MengerTetraGeometry(
					data.side, data.level
				)
			);

		}

		var folder = gui.addFolder( 'MengerTetraGeometry' );

		folder.add( data, 'side', 4, 24 ).onChange( generateGeometry );
		folder.add( data, 'level', 0, 8 ).step(1).onChange( generateGeometry );

		generateGeometry();

	},
	TetraGeometry: function ( mesh ) {

		var data = {
			radius: 6
		};

		function generateGeometry() {

			updateGroupGeometry( mesh,
				new TetraGeometry(
					data.radius
				)
			);

		}

		var folder = gui.addFolder( 'TetraGeometry' );

		folder.add( data, 'radius', 1, 10 ).onChange( generateGeometry );

		generateGeometry();

	}

};

function chooseFromHash( mesh ) {

	var selectedGeometry = window.location.hash.substring( 1 ) || "MengerTetraGeometry";

	if ( guis[ selectedGeometry ] !== undefined ) {

		guis[ selectedGeometry ]( mesh );

	}

	//No configuration options
	return {};

}
