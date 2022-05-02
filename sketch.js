let angle = 0;
let importedImage;
let screenW = 1200;
let screenH = 800;
let planeW = 800;
let planeH = 800;
// let screenW;
// let screenH;
// let planeW;
// let planeH;

var symbolSize = 20;
var streams = [] ;

let graphics;
let writingPanel;

function preload() {
  //importedImage = loadImage('dummy_name.jpg');
}

function setup() {
  //screenH = window.innerWidth;
  //screenW = window.innerHeight;
  //planeW = screenW * 0.8;
  //planeH = screenH * 0.8;
  createCanvas(screenW, screenH, WEBGL);
  graphics = createGraphics(planeW, planeH);
  graphics.background(255);
  
  
  var x = 0;
//  var y = -symbolSize;

  for (var i = 0; i <= planeW/symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, -symbolSize));
    streams.push(stream);
    x += symbolSize;
  }

  writingPanel = createGraphics(planeW, planeH);
  writingPanel.background('rgba(80%,70%,80%,0.7)');
  writingPanel.fill('rgba(80%,70%,0%,0.8)'); //255);
  //writingPanel.textAlign(CENTER);
  writingPanel.textSize(symbolSize);
  writingPanel.text('writingPanel', 300, 300);
}

function draw() {
  background(0);
  //background('rgba(80%,70%,0%,0.8)');
  writingPanel.background('rgba(0%,0%,0%,0.5)');
  //writingPanel.fill('rgba(80%,70%,0%,0.8)');
  graphics.fill(255, 0, 255);
  graphics.ellipse(mouseX, mouseY, 20);
  ambientLight(200);
  directionalLight(255, 255, 255, 0, 0, 1);
  rotateX(angle);
  rotateY(angle * 1.3);
  rotateZ(angle * 0.7);
  //
  
  // either texture importedImage with box, or texture writingPanel with plane
//   texture(importedImage);
//   box(250);
  streams.forEach(function(stream) {
    stream.render();
  });

  texture(writingPanel);
  //box(planeH/2);
  plane(planeW, planeH);

  angle += 0.015;
}



function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(5, 10);
  
  this.generateSymbols = function (x, y) {
    var first = round(random(0, 4)) == 1; //20 percent
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new S_ymbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;    // put next symbol one height above the last
      first = false;
    }
  }

  this.render = function () {
    this.symbols.forEach(function(symbol) {    //anonymous function...?
      if (symbol.first) {
        writingPanel.fill(220, 255, 220);
      } else {
        writingPanel.fill(0, 255, 70);
      }
      writingPanel.text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  };
}

function S_ymbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value = "";
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  this.first = first;

  this.setToRandomSymbol = function () {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(0x30a0 + round(random(0, 96)));
    }
  }; //Katakana

  this.rain = function() {
    if (this.y >= planeH+symbolSize) {
      this.y = -symbolSize; 
    } else {this.y += this.speed;}
  }
    
}
