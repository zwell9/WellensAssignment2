// Zach Wellens
// 2/15/2021
// CS 147 Assignment 2

"use strict";

var gl;
var points;
var colors;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext("webgl2");

    colors = [
        vec3(1.0, 0.0, 0.0), 
        vec3(1.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0)
    ];

    // And, add our vertices point into our array of points
    points = [
        vec2(-1, -1 ), //1st triangle
        vec2( 0, 1 ), 
        vec2(1,  -1) 
        ];

    // colors = [
    //     1.0, 0.0, 0.0,
    //     1.0, 0.0, 0.0,
    //     1.0, 0.0, 0.0,
        
    // ];

    // points = [
    //     -1, -1,
    //     0, 1,
    //     1, -1
    // ];

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(.9, .9, .9, 1.0); //make background light grey

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);

}

