import * as Man from './manichrome.js';
/*
// Section 1: Static Rendering
// This example shows how to render a simple static image using Manichrome.

// Step 1: Create the renderer (Main handles the canvas)
// Ensure your HTML body is empty when using Main
const main = new Man.Main(); 

// Step 2: Create a line from (0, 0) to (100, 100)
const line1 = new Man.Line(main, [0, 0, 100, 100]);

// Step 3: Draw the line on the canvas
line1.draw();
*/
/*
// Section 2: Animating
// This example shows how to animate a line using Manichrome

const main = new Man.Main();

// Create a line from (0, 0) to (100, 100)
const line1 = new Man.Line(main, [0, 0, 100, 100]);

// Define the animation function (called every frame)
function anim() {
    line1.draw();

    // Move the y2 coordinate up by 10 pixels per second
    // (30 pixels/second ÷ 60 FPS = 0.5 per frame)
    line1.point[3] -= 30 / 60;
}

// Add the animation to the process list
// Format: [function, startTime(ms), endTime(ms)]
// Note: animation functions should take no parameters
main.addProcess([anim, 0, 10000 / 3]);

// Start the animation loop
// Note: `refresh()` clears the canvas every frame,
// so all draw calls must be inside process functions
main.refresh();
*/
/*
// Section 3: Other Objects & More Complex Animations

const main = new Man.Main();

// Create a line from (0, 0) to (60, 80)
const line1 = new Man.Line(main, [0, 0, 60, 80]);

// Create a circle centered at (0, 0) with radius 100 and full angle (2π)
const cir = new Man.Circle(main, [0, 0], 100, 2 * Math.PI);

// Initial static draw (just to show them once before animation)
line1.draw();
cir.draw();

let i = 0;

// Animate: Move the end point of the line along a circular path
// Using line1.update(radius, angle), which updates x2, y2
function anim() {
    line1.update(100, i); // Move the line's end point around a circle
    line1.draw();
    cir.draw(); // Keep redrawing the static circle for reference

    i += Math.PI / 30; // Increment angle for smooth circular motion
}

// Add the animation to run for 3 seconds (3000 ms)
main.addProcess([anim, 0, 3000]);

// Start the animation loop
main.refresh();
*/
/*
// Section 4: Rotation, Fading, and Multiple Objects

const main = new Man.Main();

// Create basic objects
const line = new Man.Line(main, [200, 0, 100, 0]); // A line from (200,0) to (100,0)
const cir = new Man.Circle(main, [0, 0], 100, 2 * Math.PI); // Full circle at (0,0)
const rect = new Man.Rect(main, 160, 120, [0, 0]); // Rectangle centered at (0,0)
const dot = new Man.Dot(main, [100, 0]); // Dot starting at (100,0)

// Initial setup
let i = 0;     // Angle
let j = 0;     // Green channel for rect color
let dir = true; // Direction of green fade (true = increasing)

// Rectangle styling
rect.isFilled = true;
rect.fillColor = [0, 0, 0, 0]; // Transparent initially

// Line styling
line.color = [255, 0, 255, 1]; // Magenta

// Circle styling
cir.isFilled = true;
cir.fillColor = [255, 0, 0, 0.1]; // Red with low opacity
cir.lineColor = [0, 0, 255, 1];   // Blue outline

function anim() {
    // Draw all shapes
    line.draw();
    rect.draw();
    cir.draw();
    dot.draw();

    // Update green color value between 0 and 255
    dir ? j++ : j--;
    if (j >= 255 || j <= 0) dir = !dir;

    // Animate angle
    i += Math.PI / 120;

    // Move line's end point in a circle
    line.point[2] = Math.cos(i) * 100;
    line.point[3] = Math.sin(i) * 100;

    // Rotate the rectangle
    rect.theta = i;

    // Move the dot in a circle
    dot.point = [Math.cos(i) * 100, Math.sin(i) * 100];

    // Fade in/out green-filled rectangle
    rect.fillColor = [0, j, 0, j / 255];
}

main.addProcess([anim, 0, 10000]);
main.refresh();
*/
/*
// note in the [func ,start, finish]
// you can make finish = undifined for infinit loop 
// triangles and vectors is being worked on 
// there is an intention for event listeners

var i = 0;
const main = new Man.Main();
const Pi = new Man.PixelMod(main, 150, 255, [0, 0]); // width=150, height=255, top-left origin

// Set pixel color based on position and animation frame
function P(x, y) {
    Pi.currentPixelColor = [
        Math.abs(Math.cos(i) * (255 - y)), // Red fades with y
        0,
        Math.abs(Math.sin(i) * y),         // Blue increases with y
        255                                // Fully opaque
    ];
}
Pi.loop = P;

// Animation function (called each frame)
function frames(delta) {
    Pi.draw();
    i += Math.PI / 60; // Advance angle
    console.log(delta); // Print frame time
}

main.addProcess([frames, 0, 10000]);
main.refresh();
*
/*
// section 6: Using Sprites with Other Objects

const main = new Man.Main();

// Load a sprite image at position [0, 0]
const spr = new Man.Sprite(main, [0, 0], './scripts/THK.jpeg');

// Create a circle centered at [0, 0] with radius 100
const cir = new Man.Circle(main, [0, 0], 100, Math.PI * 2);

// Note: circle is not filled by default
// cir.isFilled = true;

function D() {
    // Draw the sprite first (it will appear behind the circle if overlapped)
    spr.draw();

    // Draw the circle on top
    cir.draw();
}

// Add the draw function to the animation loop (start at 0ms, end after 10 seconds)
main.addProcess([D, 0, 10000]);

// Start the render loop
main.refresh();

// Important: Sprites should not be used statically with other objects.
// Their draw order may get overridden unless part of an animation loop.
*/
/*
//section 7
 
// Create the main canvas and engine object
const main = new Man.Main();

// Create a full circle centered at (0,0) with radius 100
const cir = new Man.Circle(main, [0, 0], 100, Math.PI * 2);

// Create a horizontal line (X-axis)
const X = new Man.Line(main, [-200, 0, 200, 0]);

// Create a vertical line (Y-axis) starting and ending at offset from center
const Y = new Man.Line(main, [100, 200, 100, -200]);

// Create a diagonal line starting from center
const lineA = new Man.Line(main, [0, 0, 200, 200]);

// Create a dot placed initially at (0, 100)
const dot = new Man.Dot(main, [0, 100]);

// Create a rectangle with width=160, height=120, centered at (0,0)
const rect = new Man.Rect(main, 160, 120, [0, 0]);

// Extra dot for future use (currently unused)
const RDot = new Man.Dot(main, [50, 0]);

// Create a triangle pointing upwards with its center roughly at origin
const tri = new Man.Triangle(main, [-80, -60, 80, -60, 0, 100]);

// Create a vector starting from center and pointing to the right
const vec = new Man.Vector(main, [0, 0, 100, 0]);
vec.tipSize = 5; // Make the arrow tip small and clear

// Initialize the animation angle variable
let i = 0;
const step = Math.PI / 120; // Increment angle slowly for smooth motion

// First animation: runs for 2 seconds
function circle(delta) {
    // Draw all static objects
    cir.draw();
    X.draw();
    Y.draw();
    dot.draw();
    lineA.draw();

    // Increase angle slightly
    i += step;

    // Animate vertical movement of X line's ends
    X.point[1] = X.point[3] = Math.sin(i) * 100;

    // Animate horizontal movement of Y line's ends
    Y.point[0] = Y.point[2] = Math.cos(i) * 100;

    // Rotate the diagonal line endpoint in a circle
    lineA.update(100, i);

    // Rotate the rectangle around its center
    rect.scale = [1, 1]; // Keep size the same
    rect.theta = i;      // Rotate by angle i
    rect.draw();

    // Move the dot in a circular path
    dot.point = [Math.cos(i) * 100, Math.sin(i) * 100];

    // Rotate the triangle around origin
    tri.theta = i;
    tri.draw([0, 0]);
}

// Second animation: shows after the first 2 seconds (until 10s)
function Vect(delta) {
    // Update the vector to point in a rotating direction
    vec.update(100, i);
    vec.draw();

    // Optionally, draw the circle as background reference
    cir.draw();

    // Continue updating angle
    i += step;
}

// Run the circle animation from 0 to 2 seconds
main.addProcess([circle, 0, 2000]);

// Then run the vector animation from 2 seconds to 10 seconds
main.addProcess([Vect, 2000, 10000]);

// Start the animation loop and rendering
main.refresh();
*/
/*
  // section 8 static path remdring
// Create the main canvas or scene manager
const main = new Man.Main();

// Create an empty linear path (a series of connected line segments)
const path = new Man.LinearPath(main, []);

// Loop to generate 100 points forming the path
for (let i = 0; i < 100; i++) {
    // Add a point (x, y) to the path
    // x = i, y = 2i => this forms a straight line with slope 2
    path.points.push(i);     // x-coordinate
    path.points.push(2 * i); // y-coordinate

    // Assign a color for each segment (makes it a gradient)
    // Red increases gradually from 0 to 255 as i increases
    path.color.push([i * 2.55, 0, 0, 1]); // RGBA (red gradient, fully opaque)
}

// Create a vector (arrow) starting from (0,0) to (100,100)
const vec = new Man.Vector(main, [0, 0, 100, 100]);
vec.color = [255, 0, 0, 1]; // Red color, fully opaque

// Draw the path (a red gradient line following y = 2x)
path.draw();

// Draw the vector (a red arrow)
vec.draw();
*/
/*
// Create the canvas context
const main = new Man.Main();

// Create four vectors that will be chained end-to-start
const vec = new Man.Vector(main, [0, 0, 0, 0]);
const vec2 = new Man.Vector(main, [0, 0, 0, 0]);
const vec3 = new Man.Vector(main, [0, 0, 0, 0]);
const vec4 = new Man.Vector(main, [0, 0, 0, 0]);

// Create a path to trace the tip of the last vector (vec4)
const path = new Man.LinearPath(main, []);

let i = 0;   // angle/time controller
let j = -1;  // decay index

function anim(delta) {
    // === Update the vector chain ===

    // Update vec to rotate with angle i and length 50
    vec.update(50, i);

    // vec2 starts where vec ends
    vec2.point[0] = vec.point[2];
    vec2.point[1] = vec.point[3];
    vec2.update(40, i * 2);

    // vec3 starts where vec2 ends
    vec3.point[0] = vec2.point[2];
    vec3.point[1] = vec2.point[3];
    vec3.update(25, -i); // opposite direction

    // vec4 starts where vec3 ends
    vec4.point[0] = vec3.point[2];
    vec4.point[1] = vec3.point[3];
    vec4.update(40, -2 * i); // even faster opposite

    // === Trace the motion ===

    // Add the end point of vec4 to the path
    path.points.push(vec4.point[2]);
    path.points.push(vec4.point[3]);

    // Assign color based on i (animated hue)
    // NOTE: hsla's S (saturation) parameter is **ignored** in Man engine
    path.color.push(main.hsla(i * 20, 1, 0.5, 1));

    // === Decay Effect ===

    // Gradually reduce alpha of earlier path points to create a fading trail
    for (let k = 0; k < j; k++) {
        path.color[k][3] -= 1 / 255; // reduce alpha
    }

    // === Draw Everything ===

    vec.draw();
    vec2.draw();
    vec3.draw();
    vec4.draw();
    path.draw();

    // === Update time and decay index ===
    i += delta * Math.PI / 3000;
    j++;

    // === Clear faded points ===

    // If the first point in the trail is fully transparent, remove it
    if (path.color[0][3] <= 0) {
        path.color.shift();     // remove first color
        path.points.shift();    // remove x
        path.points.shift();    // remove y
        j--;                    // decay index should follow
    }

    // Log time delta between frames (useful for debugging performance)
    console.log(delta);
}

// Add the animation process and start
main.addProcess([anim, 0, undefined]);
main.refresh();
*/
/*
const main = new Man.Main(); // Initialize the drawing engine

// Create a pixel canvas (200×260 pixels), centered at [0,0]
const vis = new Man.PixelMod(main, 200, 260, [0, 0]);

let i = 0; // A time variable to animate colors

// === Pixel Coloring Function ===
// This will be called automatically for each pixel (x, y)
function loop(x, y) {
    // x ranges from 0 to 199, y from 0 to 259

    // Use a formula to generate a changing color based on pixel position and time
    // main.hsla(hue, saturation, lightness, alpha)
    // NOTE: saturation = 1 is always forced in this engine (others are ignored)
    vis.currentPixelColor = main.hsla((y + 2 * x) * 360 / 460 + i, 1, 1, 255);
    // Explanation:
    // (y + 2x): creates diagonal color gradient
    // *360/460: maps values into a hue range
    // +i: animates the hue over time
}
vis.loop = loop; // Assign the loop function to the pixel module

// === Animation Loop ===
function anim(delta) {
    i += 60 * delta / 1000; // Increase hue offset over time (delta is in ms)
    vis.draw();             // Redraw the pixel canvas with updated hue
    console.log(delta);     // Print time difference between frames (optional)
}

// Add the animation process to run continuously
main.addProcess([anim, 0, 10000]);
main.refresh(); // Start the rendering loop
*/
/*
// Visualizing a density function: density = y * cos(x * y)
const main = new Man.Main();
const vis = new Man.PixelMod(main, 200, 200, [0, 0]);

function loop(x, y) {
    // Calculate the density value at pixel (x,y) using y * cos(x*y)
    // This gives a varying pattern depending on x and y

    // Normalize density to a hue angle (0 to 360 degrees):
    // We multiply by 360/200 to scale y values to fit into hue range
    // We subtract from 360 to reverse the colors so high density values get red,
    // and low values get blue/green. This inversion is for better visual contrast.
    const density = y * Math.cos(x * y);
    const hue = 360 - density * 360 / 200;

    // Set pixel color using HSLA:
    // hue = calculated from density,
    // saturation = 1 (full color),
    // lightness = 1 (bright),
    // alpha = 255 (fully opaque)
    vis.currentPixelColor = main.hsla(hue, 1, 1, 255);
}

vis.loop = loop;
vis.draw();
*/