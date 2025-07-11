# Manichrome  
![Logo](scripts/utils/manichrome.logo.jpg)
### manichrome  
is a js web based library that uses canvas 2d API and other 
to create a user friendly manim like math animations and visuals
in this file we will learn the basics of this library and its potintial

# importing 
to import manichrome you need to find manichrome location 
###### manichrome-main/scripts/manichrome
 then you will first add it to the html as a global variable 
becuse some dependinces are initialized that way 
and you also import it in js 
```js
import * as Man from './Manichrome.js';
```
or if you want spacific elements 
```js
import {Circle,Vec2,Line} from './Manichrome.js';
```
# Main2d
 the Main2d is the Canvas and schedual system 
 it simply create a canvas and handle the process system for animation
 to create one simply 
 ```js
 const main = new Man.Main2d();
 ```
 if you have manichrome as Man
 
 it has methods like 

 ### addProcess(body)
 =>here you add your function that will be processed every frame
 body is an array such that `[function,startTime ms,endTime ms]`
 ### addEvent(body)
 => here you add your function that happens once at a spacific time 
 body is an array such that `[function,startTime]`
 
 ### refresh() 
 => this is the entry point of the animation
 ### hsla(h,s,l,a)
 => its supposed to turn hsla to rgba it does but saturation doesnt work as intended

 ### compile()
 => this compiles the animation into zip of pngs
 
 # Line 
 Line is a class that creates a line and handle its properties
 its initialized as Line({main,point1,point2,thick,color})
 it has defults of 
 thick=2 ; color:Color(0,0,0,1)
 it has properties of 
 ### draw()
 => this draws the actual line
 ### update(r,theta)
 => this update the line to be a r length and angle theta around the point1
 ### getLength()
 => this returns the length of the line 
 ### makeAnimation({point1,point2,thick,color,startTime,endTime,type})
 => this creates an animation at a start time and end time 
 any line property not added to the method wont get animated (wont throw an error)
 type is defulted to "linear"
 type can be (linear easeIn easeOut easeInOut easeInSin easeOutSin easeInOutSin)
# Circle
Circles are same as line 
they have properties that get modefyied 
Circle({main,center,r,startAngle,endAngle,thick,lineColor,isLine,fillColor,isFilled,isClosed});
defults are 
center=Vec2(0,0)
r=100
startAngle=0
endAngle=2*Math.PI
thick=1
lineColor=Color(0,0,0,1)
fillColor=Color(255,0,0,1)
isLine=true
isFilled=false
isClosed=false
it has methods of 
### draw()
=> draws the circle 
### makeAnimation({center,r,startAngle,endAngle,thick,lineColor,fillColor,startTime,endTime,type})
=> the same as line amd type is defulted to linear
# Dot
the dot class constructor parameter is 
({main,point,color,size})
they defult to 
color=Color(0,0,0,1); size=2
its methods are 
### draw()
=>this is what draw is on the canvas 
### makeAnimation({startTime,endTime,size,color,point,type})
=>it creates an animation from the current properties to the new desired ones
type defults to linear 
# Grid
grid's constructor parameters are 
({main,px,py,d,axisColor,axisThick,color,thick,dthick})
=> px ,py are how much pixel for each real x increment 
=> d are the devidors (1 for half 2 for thirds etc)
=> thick is the thickness of the grid aside from devidors and axis
=> color affects the non axis grid (even the devidors)
=> dthick is the thickness of the devidors
they defults to 
=>px=50
=>py=50
=>d=0
=>axisColor=Color(0,0,0,1)
=>axisThick=2
=>color=Color(0,0,0,1)
=>thick=1
=>dThick=0.3
Grid has a property of 
### draw()
=>it simply draws the grid

# LinearGraph
its constructor parameters are 
({main,px,py,color,thick,func,domi,inc)
they defult to 
=>px=50
=>py=50
=>inc=0.1
=>color=Color(0,0,0,1)
=>thick=2
### how to use 
you create it you make a function `f(x){return x**2}` or any other function 
you can then add it to the constructor 
`const g =new Man.LinearGraph({.....func=f})`
or you can keep it undefined and before drawing 
`g.func=f`
you can also use arrow functions etc

dom is the domaine it has two values [a,b] 
these are x numbers not pixels 
you can also change inc which is the increment of x make it smaller for smoother curve (defult is fine)
then you call the method 
### draw()
=> it draws the graph

# LinearPath()
the path constructor's parameters are 
({main,thick,points,color})
they defult to 
=>thick=2
=>points=[]
=>color=[]
### how to use
it porefeed to let color and points empty as defult 
then you create a loop or manully add the color and points 
point are lists of Vec2() and color are also list or Color() the number of color must be equal (or greater ) than the number of points 
point must at least equal 2 or higher 
then you use the property 
### draw()
=> draw it 
it also has a 
### makeAnimation({startTime,endTime,type})
=> this simple animate the end of the path like entring the scene 
type defults to "linear"

# PixelMod
Pixel mode is a short for pixel modefyier
it simply gives you the controll of each pixel in the rectangle starting from [0,0]
to [width-1,height-1]
its parameters are ({main,width,height,center})
it has other properties that we will talk about
### how to use 
after declaring the class ovject as pixel ex
you first create a function loop(x,y) =>you can use arrow function
like this 
```js
function loop(x,y){
pixel.currentPixelColor=Color(x,0,0,y,1)
}
```
then you add it 
`pixel.loop=loop`
and then you call the draw method 
`pixel.draw()
## note 
=> alpha in rgba is 0=> 255 not 1 
# Rect
Rec => short for Rectangle 
({main,width,height,center,lineColor,fillColor,thick,isLine,isFilled,theta})
with defults of 
=>lineColor=Color(0,0,0,1)
=>fillColor=Color(0,0,0,1)
=>thick=2
=>isLine=true
=>isFilled=false
=>theta=0
theta is just to tilt the Rectangle
it has methods of 
### makeAnimation({width,height,center,lineColor,fillColor,thick,theta,startTime,endTime,type})
=> as always it creates an animation for your object 
### draw()
ot draws the rect it self 

# Sprite
parameters ({main,center,dir,scale})
scale defult to [1,1]
dir is the directory to your image relative to your html
 ###### note 
 => sprites may not be drawn at order if staticlly 
 => so they should be drawn in an animation or process
 # Triangle
 's parameters are 
 ({main,point1,point2,point3,lineColor,fillColor,thick,isLine,isFilled,theta})
they defults to 
lineColor=Color(0,0,0,1)
=>fillColor=Color(0,0,0,1)
=>thick=2
=>isLine=true
=>isFilled=false
=>theta=0
it has methods of 
### draw(point)
=> it draws it and rotates by theta arround point
there is no make animation for now but soon 
# Vector 
its parameter are ({main,point1,point2,color,thick,tipSize})
they defaults to 
=>color=Color(0,0,0,1)
=>thick=2
=>tipSize=3
it has methods of 
### draw()
=> draw the vector 
### makeAnimation({tipSize,point1,point2,thick,color,startTime,endTime,type})
=>creates an animation 
=> type defults to linear 
### update(r,angle)
=> update point2 on r, angle,point1

# Data types 
data types consist of two custom types
#Vec2(x,y)
=> this is an array of two numbers thats has methods of 
=> its immutable so methods retuen new Vec2 not modify the original
### add(vec)
=> it add the two vectors 
### dot(vec)
=> the dot product 
### cross(vec)
=> the cross product 
### mul(scalar)
=> multiply the vector by the scalar 
### getLength()
=> returns the length of the vector
### normalize()
=> normalize the vector 
### equal(vec)
=> returns a bool value after checking if the two are equal 
### getAngle()
=> returns the angle of the vector 
### getAngleTo(vec)
returns the angle relative to vec _with sign_
### sub(vec)
=>subtract the two 
### rot(vec,angle)
=> rotates arround vec
### isVec2(vec) _this id a property of Vec2 not a variable of it _
=> checks if vec is an array and its length equals two 
### clone()
=> returns it self 
### type 
=> ="Vec2"

# Color(r,g,b,a)
this hlods tha color and it doesnt have properties ___for the user___ 
but its requires for the library to work 



## this library uses
### canvas 2d API
### fflate

###### all these examples is in the docs.html & scripts/docs.js
### Section 1 
in this section we will make a static rendering for a line  
first we will make the html file which we will use in all of the next scripts
```html
<!DOCTYPE html>

<html>
<head>
  <meta http-equiv="CONTENT-TYPE" content="text/html; charset=UTF-8">
  <title>Hello, World!</title>
</head>
<body>
 <script type="module" src="scripts/Manichrome.js"></script>
  <script type="module" src="scripts/docs.js"></script>
</body>
</html>

``` 
seconde we will make the js part  
```js
// Section 1: Static Rendering
// This example shows how to render a simple static image using Manichrome.

// Step 1: Create the renderer (Main handles the canvas)
// Ensure your HTML body is empty when using Main
const main = new Man.Main2d(); 

// Step 2: Create a line from (0, 0) to (100, 100)
const line1 = new Man.Line({main:main,point1:Man.origin,point2:Man.Vec2(100,100),thick:2,color:Man.Color(0,0,255,1)});

// Step 3: Draw the line on the canvas
line1.draw(); 
``` 
you should see a thin line. 

### Section 2 animating 

where gonna learn how to make basic animations using process like functions 
```js
//Section 2
import * as Man from './manichrome.js';
// This example shows how to animate a line using Manichrome
const main = new Man.Main2d();

// Create a line from (0, 0) to (100, 100)
const line1 = new Man.Line({main:main, point1:Man.Vec2(0,0),point2:Man.Vec2(100,100)});

// Define the animation function (called every frame)
function anim(delta) {//delta is time of the frame 
    line1.draw();
    
    line1.point2[1] -= 100*delta/(10000/3);
}
// Add the animation to the process list
// Format: [function, startTime(ms), endTime(ms)]
// Note: animation functions should take no parameters
main.addProcess([anim, 0, 10000/3]);

// Start the animation loop
// Note: `refresh()` clears the canvas every frame,
// so all draw calls must be inside process functions
main.refresh();
```  
### Section 3 Other Objects & More Complex Animations 
```js
import * as Man from './manichrome.js';
const main = new Man.Main2d();

// Create a line from (0, 0) to (60, 80)
const line1 = new Man.Line({main:main,point1:Man.Vec2(0,0),point2:Man.Vec2(60,80)});

// Create a circle centered at (0, 0) with radius 100 and full angle (2π)
const cir = new Man.Circle({main:main,center:Man.Vec2(0,0),r:100});


let i = 0;

// Animate: Move the end point of the line along a circular path
// Using line1.update(radius, angle), which updates x2, y2
function anim(delta) {
    line1.update(100, i); // Move the line's end point around a circle
    line1.draw();
    cir.draw(); // Keep redrawing the static circle for reference

    i += Math.PI / 30; // Increment angle for smooth circular motion
    //you could increment using delta for more acuraccy
}

// Add the animation to run for 3 seconds (3000 ms)
main.addProcess([anim, 0, 3000]);

// Start the animation loop
main.refresh();
```

### Section 4 Rotation, Fading, and Multiple Objects  
```js
import * as Man from './manichrome.js';
//Section 4
const main = new Man.Main2d();

// Create basic objects
const line = new Man.Line({main:main,point1:Man.Vec2(200,0),point2:Man.Vec2(100,0)}); // A line from (200,0) to (100,0)
const cir = new Man.Circle({main:main,center:Man.origin,r:100}); // circle({main,center,r,startAngle,endAngle,thick,lineColor,isLine,isClosed,isFilled,fillColor}))
const rect = new Man.Rect({main:main,width:160,height:120,center:Man.origin,isFilled:true,fillColor:Man.Color(0,0,0,1)}); // Rectangle centered at (0,0)
const dot = new Man.Dot({main:main,point:Man.Vec2(100,0)}); // Dot starting at (100,0)

// Initial setup
let i = 0;     // Angle
let j = 0;     // Green channel for rect color
let dir = true; // Direction of green fade (true = increasing)

// Rectangle styling
// Line styling
line.color = Man.Color(255,0,255,1); // Magenta

// Circle styling
cir.isFilled = true;
cir.fillColor = Man.Color(255,0,0,0.1)//[255, 0, 0, 0.1]; // Red with low opacity
cir.lineColor = Man.Color(0,0,255,1)//[0, 0, 255, 1];   // Blue outline

function anim(delta) {
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
    line.point2[0] = Math.cos(i) * 100;
    line.point2[1] = Math.sin(i) * 100;

    // Rotate the rectangle
    rect.theta = i;

    // Move the dot in a circle
    dot.point = Man.Vec2(Math.cos(i) * 100, Math.sin(i) * 100);

    // Fade in/out green-filled rectangle
    rect.fillColor = Man.Color(0,j,0,j/255)//[0, j, 0, j / 255];
}

main.addProcess([anim, 0, 10000]);
main.refresh();
// note in the [func ,start, finish,obj] such obj={con:condition}(if obj.con=true it terminates its process)
// you can make finish = undifined for infinit loop 

```
### Section 5 PixelModefyers
```js
import * as Man from './manichrome.js';
//Section 5
var i = 0;
const main = new Man.Main2d();
const Pi = new Man.PixelMod({main:main,width:150,height:255,center:Man.origin}); // width=150, height=255, origin

// Set pixel color based on position and animation frame
function P(x, y) {
    Pi.currentPixelColor = Man.Color(
        Math.abs(Math.cos(i) * (255 - y)), // Red fades with y
        0,
        Math.abs(Math.sin(i) * y),         // Blue increases with y
        255                                // Fully opaque
    );
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

```
### Section 6 using Sprites
```js
import * as Man from './manichrome.js';

//Section 6
const main = new Man.Main2d();

// Load a sprite image at position [0, 0]
const spr = new Man.Sprite({main:main,center:Man.origin,dir:'./scripts/THK.jpeg'});

// Create a circle centered at [0, 0] with radius 100
const cir = new Man.Circle({main:main,center:Man.origin,r:100});

// Note: circle is not filled by default
// cir.isFilled = true;

function anim(delta) {
    // Draw the sprite first (it will appear behind the circle if overlapped)
    spr.draw();

    // Draw the circle on top
    cir.draw();
}

// Add the draw function to the animation loop (start at 0ms, end after 10 seconds)
main.addProcess([anim, 0, 10000]);

// Start the render loop
main.refresh();

``` 
 Important: Sprites should not be used statically with other objects.
 Their draw order may get overridden unless part of an animation loop.
 

 ### section 7 Rotation and Vectors

 ```js
//Section 7
const main = new Man.Main2d();

// Create a full circle centered at (0,0) with radius 100
const cir = new Man.Circle({main:main,center:Man.origin.clone(),r:100});

// Create a horizontal line (X-axis)
const X = new Man.Line({main:main,point1:Man.origin.clone(),point2:Man.origin.clone()});

// Create a vertical line (Y-axis) starting and ending at offset from center
const Y = new Man.Line({main:main,point1:Man.origin.clone(),point2:Man.origin.clone()});

// Create a diagonal line starting from center
const lineA = new Man.Line({main,point1:Man.origin.clone(),point2:Man.origin.clone()});

// Create a dot placed initially at (0, 100)
const dot = new Man.Dot({main:main,point:Man.origin.clone()});

// Create a rectangle with width=160, height=120, centered at (0,0)
const rect = new Man.Rect({main:main,width:160,height:120,center:Man.origin.clone()});

// Extra dot for future use (currently unused)
const RDot = new Man.Dot({main:main,point:Man.origin.clone()});

// Create a triangle pointing upwards with its center roughly at origin
const tri = new Man.Triangle({main:main,point1:Man.origin.clone(),point2:Man.origin.clone(),point3:Man.origin});

// Create a vector starting from center and pointing to the right
const vec = new Man.Vector({main:main,point1:Man.origin.clone(),point2:Man.origin.clone(),tipSize:5});

// Initialize the animation angle variable
let i = 0;
const step = Math.PI / 120; // Increment angle slowly for smooth motion

// First animation: runs for 2 seconds
function circle(delta) {
   console.log(JSON.stringify(cir.center))
    // Draw all static objects
    cir.draw();
    X.draw();
    Y.draw();
    dot.draw();
    lineA.draw();

    // Increase angle slightly
    i += step;

    // Animate vertical movement of X line's ends
    X.point1[1] = X.point2[1] = Math.sin(i) * 100;

    // Animate horizontal movement of Y line's ends
    Y.point1[0] = Y.point2[0] = Math.cos(i) * 100;

    // Rotate the diagonal line endpoint in a circle
    lineA.update(100, i);

    // Rotate the rectangle around its center
    rect.scale = [1, 1]; // Keep size the same
    rect.theta = i;      // Rotate by angle i
    rect.draw();

    // Move the dot in a circular path
    dot.point = Man.Vec2(Math.cos(i) * 100, Math.sin(i) * 100);

    // Rotate the triangle around origin
    tri.theta = i;
    tri.draw(Man.Vec2(0,0));
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
 
 ```
 ### Section 8 paths
 ```js
 import * as Man from './manichrome.js';
 //Section 8
// Create the main canvas
const main = new Man.Main2d();

// Create an empty linear path (a series of connected line segments)
const path = new Man.LinearPath({main:main});

// Loop to generate 100 points forming the path
for (let i = 0; i <= 100; i++) {
    // Add a point (x, y) to the path
    // x = i, y = 2i => this forms a straight line with slope 2
    path.points.push(Man.Vec2(i,2*i));     // x-coordinate
     // y-coordinate

    // Assign a color for each segment (makes it a gradient)
    // Red increases gradually from 0 to 255 as i increases
    path.color.push(Man.Color(i * 2.55, 0, 0, 1)); // RGBA (red gradient, fully opaque)
}
//the number of colors in the array should equal to the number of x or y points in path.point
// Create a vector (arrow) starting from (0,0) to (100,100)
const vec = new Man.Vector({main:main,point1:Man.origin.clone(),point2:Man.Vec2(100,100),color:Man.Color(255,0,0,1)}); // Red color, fully opaque

// Draw the path (a red gradient line following y = 2x)
path.draw();

// Draw the vector (a red arrow)
vec.draw();


 ```
 ### Section 9 Vector rotation Path tracing (4 vectors)
 ```js
 import * as Man from './manichrome.js';

//Section 9
// Create the canvas context

const main = new Man.Main2d();

// Create four vectors that will be chained end-to-start
const vec = new Man.Vector({main:main, point1:Man.origin.clone(),point2:Man.origin.clone()});
const vec2 = new Man.Vector({main:main, point1:Man.origin.clone(),point2:Man.origin.clone()});
const vec3 = new Man.Vector({main:main, point1:Man.origin.clone(),point2:Man.origin.clone()});
const vec4 = new Man.Vector({main:main, point1:Man.origin.clone(),point2:Man.origin.clone()});

// Create a path to trace the tip of the last vector (vec4)
const path = new Man.LinearPath({main:main});

let i = 0;   // angle/time controller
let j = -1;  // decay index

function anim(delta) {
    // === Update the vector chain ===

    // Update vec to rotate with angle i and length 50
    vec.update(50, i);

    // vec2 starts where vec ends
    vec2.point1[0] = vec.point2[0];
    vec2.point1[1] = vec.point2[1];
    vec2.update(40, i * 2);

    // vec3 starts where vec2 ends
    vec3.point1[0] = vec2.point2[0];
    vec3.point1[1] = vec2.point2[1];
    vec3.update(25, -i); // opposite direction

    // vec4 starts where vec3 ends
    vec4.point1[0] = vec3.point2[0];
    vec4.point1[1] = vec3.point2[1];
    vec4.update(40, -2 * i); // even faster opposite

    // === Trace the motion ===

    // Add the end point of vec4 to the path
    path.points.push(Man.Vec2(vec4.point2[0],vec4.point2[1]));// x
    //y

    // Assign color based on i (animated hue)
    // NOTE: hsla's S (saturation) parameter is **broken** in Man engine so keep it 1 
    path.color.push(main.hsla(i * 20, 1, 0.5, 1));
  // console.log(main.hsla(0,1,1,1))
    // === Decay Effect ===

    // Gradually reduce alpha of earlier path points to create a fading trail
    for (let k = 0; k < j; k++) {//each frame the number j increases so the number of pixels decaying increases
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
        path.points.shift();    // remove x  y
        j--;                    // decay index should follow
    }
    //console.log(delta)
}
main.addProcess([anim,1000,undefined]);
main.refresh();
 ```
 ### Section 10 animting on pixelMods
 ```js
 import * as Man from './manichrome.js';

//Section 10
const main = new Man.Main2d(); // Initialize the drawing engine

// Create a pixel canvas (200×260 pixels), centered at [0,0]
const vis = new Man.PixelMod({main:main,width:200,height:260,center:Man.Vec2(0,0)});

let i = 0; // A time variable to animate colors

// === Pixel Coloring Function ===
// This will be called automatically for each pixel (x, y)
function loop(x, y) {
    // x ranges from 0 to 199, y from 0 to 259

    // Use a formula to generate a changing color based on pixel position and time
    // main.hsla(hue, saturation, lightness, alpha)
    // NOTE: saturation = 1 is always forced in this engine (others are almost no diffrence)
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
```
### Section 11 using pixel mods to visualize density
D(x,y)=yCos(xy°);

```js
import * as Man from './manichrome.js';
//Section 11
const main = new Man.Main2d();
const vis = new Man.PixelMod({main:main,width:200,height:260,center:Man.origin.clone()});

function loop(x, y) {
    // Calculate the density value at pixel (x,y) using y * cos(x*y)
    // This gives a varying pattern depending on x and y

    // Normalize density to a hue angle (0 to 360 degrees):
    // We multiply by 360/200 to scale y values to fit into hue range
    // We subtract from 360 to reverse the colors so high density values get red,
    // and low values get blue/green. This inversion is for better visual contrast.
    let density = y * Math.cos(x * y*Math.PI/180);
    let hue = 360 - density * 360 / 200;
    // Set pixel color using HSLA:
    // hue = calculated from density,
    // saturation = 1 (full color),
    // lightness = 1 (bright),
    // alpha = 255 (fully opaque)
    vis.currentPixelColor = main.hsla(hue, 1, 1, 255);
}

vis.loop = loop;
vis.draw();
```
### Section 12 grid and graphs 
```js
import * as Man from './Manichrome.js';
//Section 12
function f(x){//this will be the graph function
   return x**2;
}
const main=new Man.Main2d();//make canvas
const grid=new Man.Grid({main:main,px:50,py:50,d:1})//we create a grid with 50px 50 px margins and divisions of 1
const graph=new Man.LinearGraph({main:main,func:f,dom:[-5,5],px:50,py:50})//we make a graph we paa main ,f(x),[startX,endX],xMargin,yMargin
//change increment for smoother approximation {inc:number}
grid.draw();
graph.draw()
```
### Section 13 TouchEventListener 
```js
import * as Man from './Manichrome.js';
//Section 13
const main =new Man.Main2d();
const dot =new Man.Dot({main:main,point:Man.Vec2(-50,0)});//we create two dots 
const dot2 =new Man.Dot({main:main,point:Man.Vec2(50,0)});
const event =new Man.TouchEventListener({main:main});//we create an event listener 
event.dots.push(dot);
event.dots.push(dot2);//we push the two dot to be draggable
dot.size=10;
dot2.size=10;
event.call();//we call to start
//the toch will snap to the nearest dot 
//event listners only works with dots
function anim(delta){
    dot.draw();
    dot2.draw();//here we show then
}
main.addProcess([anim,0,undefined]);
main.refresh();

```
### Section 14 moving a line
```js
import * as Man from './Manichrome.js';

//Section 14
const main =new Man.Main2d();
const dot =new Man.Dot({main:main,point:Man.Vec2(100,100)});//we create a dot
const line =new Man.Line({main:main,point1:Man.origin.clone(),point2:Man.Vec2(100,100),thick:2})
const event =new Man.TouchEventListener({main:main});
event.dots.push(dot);
event.fun=(e)=>{//this function apply when the touch is moving (one finger only like when the dot moves)
    line.point2[0]=dot.point[0];//we can update line in anim but this is better for no delays
    line.point2[1]=dot.point[1];
};
event.call();
function anim(delta){
    dot.draw();
    line.draw();
}
main.addProcess([anim,0,undefined]);
main.refresh();
```
you could also not draw the dot so it doesnt show ;
### Section 15 

```js
import * as Man from './Manichrome.js';
//Section 15
const main =new Man.Main2d();
const dot =new Man.Dot({main:main,point:[100,0],size:4});
const vec =new Man.Vector({main:main,point1:[0,0],point2:[0,0],tipSize:3});
//vec.tipSize=3;
var V=0;//velocity
var F=0;//force
function anim(delta){
    F=-dot.point[0]/300;
    V+=F;
    dot.point[0]+=V;
    dot.draw();
    vec.point2[0]=dot.point[0];
    vec.draw();//bsiclly we say that F=-alpha *X and update with out solving
    //you can slove it and use trigeometry cos or sin 
}
main.addProcess([anim,0,undefined]);
main.refresh();
}
main.addProcess([anim,0,undefined]);
main.refresh();
 ```
 ### Section 16 built in animation 
 ```js
 //Section 16 
const main =new Man.Main2d();
const line=new Man.Line({main:main,point1:Man.Vec2(-100,-100),point2:Man.Vec2(-100,-100)});
line.makeAnimation({color:Man.Color(255,0,0,1),thick:5,startTime:1000,endTime:3000,type:"linear"});
line.makeAnimation({point1:Man.Vec2(-100,-100),point2:Man.Vec2(100,100),startTime:1000,endTime:3000,type:"easeInOutSin"});

const vec =new Man.Vector({main:main,point1:Man.Vec2(100,100),point2:Man.Vec2(100,100),tipSize:0});
//vec.thick=0;
//vec.color[3]=0;
//vec.tipSize=0;
vec.makeAnimation({point2:Man.Vec2(-100,-100),color:Man.Color(0,0,255,1),thick:3,tipSize:5,startTime:1000,endTime:3000});
function anim(delta){
   line.draw();
    vec.draw();
    //console.log(vec.point[2]);
}
main.addProcess([anim,1000,10000]);
main.refresh(); 

```
 these animations apply to most object and can be stacked like animate point1 linear but point 2 easeIn
type can be [linear,easeIn,easeOut,easeInOut,easeInSin,easeInOutSin,easeOutSin] 

## Section 17 download
you do not need to import the fflate module;

```js
import * as Man from './Manichrome.js';
//Section 18 
const main=new Man.Main2d();
const g=new Man.Grid({main:main,thick:3,dThick:30})
const p=new Man.LinearPath({main:main,thick:2});
for(let i=0;i<=(2)*Math.PI;i+=Math.PI/120){
    p.points.push(Man.Vec2(100*Math.cos(i),Math.sin(i)*100));
    p.color.push(Man.Color(0,0,0,1));
}
p.points.push(Man.Vec2(100*Math.cos(0),Math.sin(0)*100));
p.color.push(Man.Color(0,0,0,1));
const l= new Man.Line({main:main,point1:Man.origin.clone(),point2:Man.Vec2(100,100)})
l.makeAnimation({startTime:1000,endTime:3000,point1:Man.Vec2(100,0),point2:Man.Vec2(0,100)});
//console.log(p.points[p.points.length-1]);
p.makeAnimation({startTime:1000,endTime:3000,type:"linear"});
function anim(delta){
    g.draw()
  p.draw();
l.draw();
    console.log(delta)
 }
main.addProcess([anim,1000,6000,{con:false}]);
main.refresh();

```
