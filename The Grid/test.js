
	    // Diese Funktion wird ausgefuehrt, sobald die HTML-Seite geladen ist :
	    function meinWebGLStart()
	    {
	        var canvas = document.getElementById("meineWebGLCanvas"); // canvas
																		// ist
																		// die
																		// "Leinwand"
																		// auf
																		// die
																		// gezeichnet
																		// werden
																		// kann
	        var gl;
	        try {
	         gl = canvas.getContext("experimental-webgl"); // Falls der Browser
															// es unterstuetzt,
															// wir hier WebGL
															// erstmalig an-
	                                                                   // gesprochen
																		// und
																		// der
																		// "WebGL-Context"
																		// in
																		// dem
																		// Objekt
																		// gl
																		// gespeichert.
	        }
	        catch(e) {}
	        if(!gl) {
	         alert("Fehler: WebGL-Context konnte nicht initialisiert werden");
	        }
	        
	        var MeinShaderProgramObjekt = gl.createProgram(); // Das
																// Shader-Program-Objekt
																// fasst spaeter
																// den Vertex-
																// und Fragment-
	                                                                   // Shader
																		// zusammen.
	        
	        // Der folgende String enthaelt den kompletten Quellcode fuer einen
			// minimalistischen Vertex-Shader:
	        var vShaderQuellcode = 'attribute vec4 vPosition; \n\
	                                void main() \n\
	                                { \n\
	                                    gl_Position = vPosition; \n\
	                                } \n' ;
	        vShader = gl.createShader(gl.VERTEX_SHADER); // Das
															// Vertex-Shader-Objekt
															// wird angelegt
	        gl.shaderSource(vShader,vShaderQuellcode); // - mit seinem
														// Quelltext verknuepft
	        gl.compileShader(vShader); // - kompiliert
	        gl.attachShader(MeinShaderProgramObjekt,vShader); // - dem
																// Shader-Program-Objekt
																// hinzugefuegt
	                
	        // Nochmal das gleiche Vorgehen wie fuer den Vertex-Shader; analog
			// fuer den Fragment-Shader:
	        var fShaderQuellcode = 'precision mediump float;\n\
	                                void main() \n\
	                                { \n\
	                                    gl_FragColor = vec4 ( 1.0, 1.0, 1.0, 1.0 );\n\
	                                } \n';
	        fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader,fShaderQuellcode);
	        gl.compileShader(fShader);
	        gl.attachShader(MeinShaderProgramObjekt,fShader);
	       
	        gl.linkProgram(MeinShaderProgramObjekt); // Das
														// Shader-Program-Objekt
														// ist vollstaendig und
														// muss gelinkt werden.
	        gl.useProgram(MeinShaderProgramObjekt); // Da theoretisch mehrere
													// Shader-Program-Objekte
													// moeglich sind, muss
	                                                                  // angegeben
																		// werden,
																		// welches
																		// benutzt
																		// werden
																		// soll.
	        
	        gl.clearColor ( 0.0, 0.0, 0.0, 1.0 ); // RGB-Alpha Farbe zum
													// loeschen des
													// Hintergrundes
	        gl.clear ( gl.COLOR_BUFFER_BIT ); // Hintergrund loeschen
	      
	        var vertexAttribLoc = gl.getAttribLocation( MeinShaderProgramObjekt, "vPosition"); // Die
																								// Verknuepfung
																								// zwischen
																								// JavaScript
	                                                                                            // und
																								// dem
																								// Shader-Attribut
        
	        // Ein Array mit den Koordinaten, der Eckpunkte des Dreiecks das
			// dargestellt wird.
	        var vVertices = new Float32Array([ 0.0, 0.1, 0.0,
	                                         -0.1, -0.1, 0.0,
	                                          0.1, -0.1, 0.0 ]);
	        vertexPosBufferObjekt = gl.createBuffer(); // ein
														// WebGL-Buffer-Objekt
														// wird erzeugt
			gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBufferObjekt); // ...und
																	// als
																	// aktives
																	// Objekt
																	// gesetzt
	        gl.bufferData(gl.ARRAY_BUFFER, vVertices, gl.STATIC_DRAW); // die
																		// Arraydaten
																		// werden
																		// an
																		// den
																		// aktiven
																		// Puffer
																		// uebergeben
	        
	        gl.vertexAttribPointer(vertexAttribLoc, 3, gl.FLOAT, false, 0, 0);
	        gl.enableVertexAttribArray(vertexAttribLoc);
	
	        gl.drawArrays ( gl.TRIANGLES, 0, 3 );
	    }