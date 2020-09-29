var w=20;
var cols,rows;
var grid=[];

var stack=[];

var current;

function setup() {
  createCanvas(500, 500);
  cols= floor(width/w);
  rows=floor(height/w);
  frameRate(100);

  for(var i=0;i< rows ; i++){
    for(var j=0;j< cols;j++){
      var cell=new Cell(j,i);
      grid.push(cell);
    }
  }

  current=grid[0];
}

function draw() {

  background(51);
  for(var i=0;i<grid.length;i++){
    grid[i].show();
  }
  
  // step 1
  current.visited=true;
  current.highlight();
  var next= current.checkNeighnours();
  if(next){
    next.visited=true;
    // step2
    stack.push(current);
    // step 3
    removeWalls(current,next);
    //step 4
    current=next;
  } else if(stack.length >0){
    current=stack.pop();
  }


}




function index(i,j){
  if(i<0 || j<0 || i>cols-1 || j>rows-1){
    return -1;
  }

  return i+j*cols;
}



function Cell(i,j){
this.i= i;
this.j=j;
this.visited=false;
this.walls=[true,true,true,true];

this.highlight=function(){
  var x= this.i * w;
  var y= this.j * w;
  noStroke();
  fill(0,0,255);
  rect(x,y,w,w);

} 


this.checkNeighnours=function(){
  var neighbours=[];
  
  
  var top=grid[index(i,j-1)];
  var right=grid[index(i+1,j)];
  var bottom=grid[index(i,j+1)];
  var left=grid[index(i-1,j)];

  if(top && !top.visited){
    neighbours.push(top);
  }
  if(right && !right.visited){
    neighbours.push(right);
  }
  if(bottom && !bottom.visited){
    neighbours.push(bottom);
  }
  if(left && !left.visited){
    neighbours.push(left);
  }

  if(neighbours.length>0){
    var r=floor(random(0,neighbours.length));
    return neighbours[r];
  }else{
    return undefined;
  }
}


this.show=function(){
var x=this.i * w;
var y=this.j*w;
stroke(255,0,0);

if(this.walls[0]){
  line(x,y,x+w,y)
}

if(this.walls[1]){
line(x+w,y,x+w,y+w)
}

if(this.walls[2]){
line(x,y+w,x+w,y+w)
}

if(this.walls[3]){
line(x,y+w,x,y)
}

if(this.visited){
  noStroke();
  fill(252, 236, 3);
  rect(x,y,w,w)
}
// noFill();
// rect(x,y,w,w);
}

}





function removeWalls(a,b){
    var x=a.i - b.i;
    if(x == 1){
      a.walls[3]=false;
      b.walls[1]=false;
    }else if(x == -1){
      a.walls[1] = false;
      b.walls[3] = false;
    }

    var y=a.j - b.j;
    if(y == 1){
      a.walls[0]=false;
      b.walls[2]=false;
    }else if(y == -1){
      a.walls[2] = false;
      b.walls[0] = false;
    }


}