let cArray = [];
let fr;

let img;
let input;

var attempts = 0;
function preload() {
	img = loadImage('Image.jpeg');
}

function setup() {
  // put setup code here
  createCanvas(img.width,img.height);
  
  
  fr = createP();
  //input = createFileInput(handleFile);
  background(img);
  img.loadPixels();
}

function draw() {
  // put drawing code here
  if (img) {
	  //cArray.push(new Circle(random(width),random(height)));
	  for (let i = 0; i < 20; i++) {
		   newCircle(cArray);
	  }
	 
	  for (let i = cArray.length - 1; i >= 0; i--) {
		 if (cArray[i].growing) {
			  cArray[i].show();
			  for (let other of cArray) {
				  if (cArray[i] != other) {
						cArray[i].checker(other);
				  }
			  }
			  cArray[i].update();
		 }
	  }
  }
 fr.html(floor(frameRate()))
}

function handleFile(file) {
	console.log(file.type);
	
	if (file.type == 'image') {
		img = createImg(file.data, '');
		img.loadPixels();
		resizeCanvas(img.width,img.height);
		
	}
}


function newCircle(arr) {
	let x = int(random(width));
	let y = int(random(height));
	
	let index = (x + y * width)*4;
	let p = img.pixels;
	
	let color_ = {r: p[index], g: p[index + 1], b: p[index + 2]}; 
	
	if (findSpace(x,y)) {
		cArray.push(new Circle(x,y,color_));
		attempts = 0;
	}else if (attempts < 100) {
		newCircle();
		attempts++;
	}else {
		console.log("done");
		noLoop();
	}
}

function findSpace(x,y) {
	for (let c of cArray) {
		let d = dist(x,y,c.x,c.y);
		if (d - 4 < c.r) {
			return false;
		}
	}
	return true;
}

class Circle {
	constructor(x_,y_,color_) {
		this.x = x_;
		this.y = y_;
		this.r = 1;
		this.growing = true;
		this.colour = color_;
	}
	show() {
		fill(this.colour.r,this.colour.g,this.colour.b);
		noStroke();
		ellipse(this.x,this.y,this.r*2,this.r*2);
	}
	update() {
		if (this.growing) {
			this.r += 0.5 * deltaTime/50;
		}
		if (this.x - this.r < 0 || this.x + this.r > width || this.y - this.r < 0 || this.y + this.r > height) {
			this.growing = false;
			
		}
	}
	checker(other) {
		let d = dist(this.x,this.y,other.x,other.y);
		if (d - 1 < this.r + other.r) {
			this.growing = false;
			other.growing = false;
			
		}
	}
}