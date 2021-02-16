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
        // 1st triangle
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        //2nd triangle
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        //3rd triangle
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        //4th triangle
        vec3(0.5, 0.2, 0.3),
        vec3(0.2, 0.1, 0.7),
        vec3(0.4, 0.4, 0.2),
        //5th triangle
        vec3(0.4, 0.3, 0.3),
        vec3(0.2, 0.2, 0.6),
        vec3(0.1, 0.4, 0.5),
    ];

    points = [
        // 1st triangle
        vec2(-1, 1),
        vec2(0.5, 1),
        vec2(-0.5, 0),
        // 2nd triangle
        vec2(1, 1),
        vec2(-0.5, 1),
        vec2(0.5, 0),
        // 3rd triangle
        vec2(-0.5, 1),
        vec2(0.5, 1),
        vec2(0, 0),
        // 4th triangle
        vec2(-1, -1),
        vec2(-1, 0.25),
        vec2(0.5, -0.5),
        // 5th triangle
        vec2(1, -1),
        vec2(1, 0.25),
        vec2(-0.5, -0.5),
        
    ];

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

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
    gl.drawArrays(gl.TRIANGLES, 0, 15);

}

