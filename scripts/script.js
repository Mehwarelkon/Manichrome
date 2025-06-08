import * as Man from './Manichrome.js';
var i=0
function f(x){
    return (x**2)*i;
}
const main = new Man.Main();
const grid =new Man.Grid(main,50,50,1);
const graph =new Man.LinearGraph(main,f,[-5,5],50,50);
graph.inc=0.01;

function anim(delta){
    i+=0.01;
    grid.draw();
    graph.draw();
}
main.addProcess([anim,0,10000]);
main.refresh();