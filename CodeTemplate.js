$(document).ready(function(){
	
document.body.onmousedown = function() { return false; } //so page is unselectable

	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();


	var galaxy;
	var spaceshipWidth = 200;
	var spaceshipHeight = 200;
	var maxSpeed = 15;
	var acceleration = 1;
	var gameOver = false;
	var down = false;
	var up = false;
	var left = false;
	var right = false;
	var accelx = 2, accely = 2, speedx = 0, speedy = 0;


    var travelBoundaryLeft = (-4)*w;
    var travelBoundaryRight = w*4;
    var travelBoundaryTop = (-3)*h;

    var asteroidimage = new Image();

    var wx = Math.floor(Math.random() * (w - 80) + 40);
    var wy = Math.floor(Math.random() * (h - 80) + 40);
    var ww = 300;
    var wh = 300;
    var w2x = Math.floor(Math.random() * (w - 80) + 40);
    var w2y = Math.floor(Math.random() * (h - 80) + 40);

    var time111 = 0;

    var firstpage = new Image();
    var secondpage = new Image();
    var gameoverpage = new Image();
  	var victorypage = new Image();
	var background = new Image();
	var shipImage = new Image();
	var wormholeImage = new Image();
    var planet1 = new Image();
    var planet2 = new Image();
    var planet3 = new Image();
    var planet4 = new Image();
    var planet5 = new Image();
    var planet6 = new Image();
    var planet7 = new Image();
    var planet8 = new Image();


	background.src = 'images/backgroundsp.png';
	shipImage.src = 'images/spaceship.png';
    wormholeImage.src = 'images/wormhole.png';
    asteroidimage.src = 'images/asteroid.png';
    firstpage.src = 'images/firstview.png';
    secondpage.src = 'images/secondview.png';
    gameoverpage.src = 'images/gameover.png' 
    victorypage.src = 'images/victory.png'


    planet1.src = 'images/planet1.png';
    planet2.src = 'images/planet2.png';
    planet3.src = 'images/planet3.png';
    planet4.src = 'images/planet4.png';
    planet5.src = 'images/planet5.png';
    planet6.src = 'images/planet6.png';
    planet7.src = 'images/planet7.png';
    planet8.src = 'images/planet8.png';
  	var thruster = new Audio('images/thrusters.wav');
    // var theme = new Audio('musicback.wav');
	// heart.src = 'images/heart.png';
	// endpoint.src='images/earth.png';

    var  spaceshipPosX = (w/2) - spaceshipWidth/2;
	var  spaceshipPosY = h*(3/2) - spaceshipHeight*4;

	//Planet Variables
	var cxShip; 
	var cyShip; 
	var cxPlanet = [];
	var cyPlanet = [];
	var multi = [];
	

	var planet = [];
	var numPlanet = 40;



	var scrollSpeed = 0.8;
	var leftPerimeter = 300;
	var firstLeftPerimeter = 350;
	var rightPerimeter = w - 300;
	var topPerimeter = 1200;
	var bottomPerimeter = h - 1200;
	var timer = 0;
	var transportShip = false;
	var transportSwitch = false;

	var firstView = true;
	var secondView = false;
	var gamePlay = false;
	var gameOver = false;
	var victory = false;
	var makeAsteroids = true;

	var endpoint = new Image();

	var health = 3;
	var heart = new Image();

	//stops page from scrolling
	window.addEventListener("keydown", function(e) 
	{
    	// space and arrow keys
    	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) 
    	{
        	e.preventDefault();
    	}
	}, false);
	
	/////////////////////////////////
	////////////////////////////////
	////////	GAME INIT
	///////	Runs this code right away, as soon as the page loads.
	//////	Use this code to get everything in order before your game starts 
	//////////////////////////////
	/////////////////////////////
	function init()
	{
		
	//////////
	///STATE VARIABLES


	
	//////////////////////
	///GAME ENGINE START
	//	This starts your game/program
	//	"paint is the piece of code that runs over and over again, so put all the stuff you want to draw in here
	//	"60" sets how fast things should go
	//	Once you choose a good speed for your program, you will never need to update this file ever again.

	if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}

	// Planets

	
		//////////////////////Ctreating Planets
	function makePlanet(px,py,pt){

	var pw =  Math.floor(Math.random() * (600 - 400) + 400);
	var ph = pw;
	var pr = pw*1.5
    return {
	    x:px,
	    y:py,
	    w:pw,
	    h:ph,
	    r:pr,//radius of field 
	    pt:pt,
	    colour:'blue',
	    
	    drawPlanet:function(){
	        ctx.fillStyle = this.colour;
	        ctx.drawImage(this.pt,this.x,this.y,this.w,this.h);
	        // ctx.fillRect(this.x,this.y,this.w,this.h);
	        }
		};
	}

	var spaceShip = makeSpaceShip();
	
	for(var i=0; i < numPlanet; i++){

		var px = getRandomArbitrary(-5210,4096);
		var py = getRandomArbitrary(-8548,8548);
		var pt;
		for(var j=0; j<planet.length;j++){
			if(Math.abs(py - planet[j].y)<1000 && Math.abs(px - planet[j].x)<1000 || Math.abs(px - spaceShip.x) < 2800 && Math.abs(py - spaceShip.y) < 4600){
				var px = getRandomArbitrary(-5210,4096);
				var py = getRandomArbitrary(-8548,8548);
			}
		}

		var rand = Math.round(getRandomArbitrary(0,6));

		if(rand == 0){
			pt = planet1
		}
		else if(rand == 1){
			pt = planet2
		}
		else if(rand == 2){
			pt = planet8
		}
		else if(rand == 3){
			pt = planet4
		}
		else if(rand == 4){
			pt = planet5
		}
		else if(rand == 5){
			pt = planet6
		}
		else if(rand == 6){
			pt = planet7
		}
		

		planet.push(makePlanet(px,py,pt));
	}


	// Asteroids
	function createAsteroid()
	{
		if(getRandomArbitrary(0,1) > 0.5){	
			var rx = getRandomArbitrary(spaceShip.x-w*1.5,spaceShip.x-w)
			console.log('spawned left');

			var speedX=getRandomArbitrary(5,15);
			var speedY=getRandomArbitrary(5,15);
		}
		else{
			var rx = getRandomArbitrary(spaceShip.x+w*1,spaceShip.x+w*1.5);
			console.log('spawned right');

			var speedX=getRandomArbitrary(-5,-15);
			var speedY=getRandomArbitrary(5,15);
		}

		var ry = getRandomArbitrary(spaceShip.y-h,spaceShip.y+h);
		var rw = getRandomArbitrary(50,340);
		var radius = getRandomArbitrary(100,150)

		return {
			x:rx,
			y:ry,
			w:radius,
			h:radius,
			r:spaceShip.w,
			speedx:speedX,
			speedy:speedY,
			drawAsteroid:function()
			{
				ctx.drawImage(asteroidimage, this.x, this.y, this.w, this.h);
				// ctx.fillRect(this.x, this.y, this.w, this.h);
			},
			moveAsteroid:function(){
				this.x+=this.speedx;
				this.y+=this.speedy;
			}
		};
	}

	function healthPoints(x1,y1){
		return{
			x:x1,
			y:y1,
			drawHealthPoints:function(){
				ctx.drawImage(heart,this.x,this.y,50,50);
			}
		};
	}

	var lives = [];

	lives.push(healthPoints(w/2 - 25, 4550));
	lives.push(healthPoints(w/2 - 75, 4550));
	lives.push(healthPoints(w/2 + 25, 4550));

	function makeTrail(color)
    {
    return {
            x:spaceShip.x,
            y:spaceShip.y,
            w:2.5,
            h:2.5,
            color:color,
            drawTrail:function()
            {
                ctx.fillStyle = color;
                if(color == 'red')
                    ctx.fillRect(this.x + (Math.random() * 30) - 15 + (spaceShip.w), this.y + (Math.random() * 30) - 15 + (spaceShip.h/2) - this.h/2, this.w + (Math.random() * 25), this.h + (Math.random() * 5));
                if(color == 'green')
                    ctx.fillRect(this.x - (Math.random() * 30) - 15 - this.w, this.y + (Math.random() * 30) - 15 + (spaceShip.h/2) - this.h/2, this.w + (Math.random() * 25), this.h + (Math.random() * 5));
                if(color == 'yellow')
                    ctx.fillRect(this.x + (Math.random() * 30) - 15 - this.w/2 + (spaceShip.w/2), this.y + (Math.random() * 30) - 15 - this.h, this.w + (Math.random() * 5), this.h + (Math.random() * 25));
                if(color == 'blue')
                    ctx.fillRect(this.x + (Math.random() * 30) - 15 - this.w/2 + (spaceShip.w/2), this.y + (Math.random() * 30) - 15 + spaceShip.h, this.w + (Math.random() * 5), this.h + (Math.random() * 25));                
            }
        };
    }
    
    
            
    var trail = [];
    function trailArray(color)
    {
        for(var i = 0; i < 50; i++)
        {
            trail[i] = makeTrail(color);
            trail[i].drawTrail();
        }        
    }

	function createEndPoint(){
		var ex=getRandomArbitrary(-1024,1044);
		var ey=getRandomArbitrary(2*(-4608),1.5*(-4408));
		return{
			x:ex,
			y:ey,
			w:350,
			h:350,
			drawEndPoint:function(){
				ctx.drawImage(planet3, this.x,this.y,this.w,this.h);
			}
		};
	}

	earth = createEndPoint();

	// Create the spaceship
	function makeSpaceShip()
	{
		return {
			x:spaceshipPosX,
			y:spaceshipPosY,
			w:spaceshipWidth,
			h:spaceshipHeight,
			xpos:spaceshipPosX,
			ypos:spaceshipPosY,
			drawSpaceShip:function()
			{
				ctx.drawImage(shipImage, this.x, this.y, this.w, this.h);
			}
		};
	}

	//Background Scrolling
	function createBackground(xPos,yPos){

		return{
			x:xPos,
			y:yPos,
			drawBackground:function(){
				// ctx.drawImage(background, this.x, 10, w - 20, h - 20);
				ctx.drawImage(background,this.x, this.y,w,h)
			}
		};
	}

	function scrollBackground(){

			spaceShip.xpos += speedx;
			spaceShip.ypos += speedy;
			if(speedy < 0){
		        	wy-=speedy;
		        	earth.y-=speedy;
				for(var i=0; i <space.length;i++){
		        		space[i].y-=speedy*scrollSpeed;
		        	}
		        for(var i=0; i <asteroids.length;i++){
		        		asteroids[i].y-=speedy*scrollSpeed;
		        }
		        for(var i=0; i <planet.length;i++){
		        	planet[i].y-=speedy
		        }
			}
			else if(speedy>0){
	        		wy-=speedy;
		        	earth.y-=speedy;
				for(var i=0; i <space.length;i++){
		        		space[i].y-=speedy*scrollSpeed;
		        	}
		        for(var i=0; i <asteroids.length;i++){
		        		asteroids[i].y-=speedy*scrollSpeed;
		        }
		        for(var i=0; i <planet.length;i++){
		        	planet[i].y-=speedy
		        }
			}
			if(speedx < 0){
	        		wx-=speedx;
	        		earth.x-=speedx;
				for(var i=0; i <space.length;i++){
		        		space[i].x-=speedx*scrollSpeed;
		        	}
		        for(var i=0; i <asteroids.length;i++){
		        		asteroids[i].x-=speedx*scrollSpeed;
		        }
		        for(var i=0; i <planet.length;i++){
		        	planet[i].x-=speedx
		        }
			}
			else if(speedx>0){
	        		earth.x-=speedx;
	        		wx-=speedx;
				for(var i=0; i <space.length;i++){
		        		space[i].x-=speedx*scrollSpeed;
		        	}
		        for(var i=0; i <asteroids.length;i++){
		        		asteroids[i].x-=speedx*scrollSpeed;
		        }
		        for(var i=0; i <planet.length;i++){
		        	planet[i].x-=speedx
		        }
			}
	}

	function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
	}

	function transport(){
		spaceShip.x = w2x;
    	spaceShip.y = w2y;
	}

		
function PlayerMovement()
    {                
        if(74 in keysUp || 68 in keysUp || 80 in keysUp || 81 in keysUp) 
        {
            thruster.pause();
        }
    
		if(74 in keysDown)
		{
		   if(accely > -maxSpeed)
		   {
		       speedy -= accely;
		        thruster.play();
		        trailArray('blue');
		   }
		}
		else if(68 in keysDown)
		{
		   if(accely < maxSpeed)
		   {
		       speedy += accely;
		        thruster.play();
		        trailArray('yellow');
		      } 
		}

		if(80 in keysDown)
		{
		   if(accelx < maxSpeed)
		   {
		       speedx += accelx;
		        thruster.play();
		        trailArray('green');
		   }
		}
		else if(81 in keysDown)
		{
		  if(accelx > -maxSpeed)
		   {
		       speedx -= accelx;
		        thruster.play();
		        trailArray('red');
		   }
		}

		if(spaceShip.x < wx + 200 && spaceShip.x + spaceshipWidth > wx && spaceShip.y < wy + 200 && spaceshipHeight + spaceShip.y > wy)
        {
        	transportShip = true;

        	if(transportSwitch == false){
        		speedy *= 0.15;
				speedx *= 0.15;
				transportSwitch = true;
        	}
        }

        if(spaceShip.x < earth.x + earth.w && spaceShip.x + spaceshipWidth > earth.x && spaceShip.y < earth.y + 200 && spaceShip.h + spaceShip.y > spaceShip.y){
        	gamePlay = false;
        	victory = true;
        }

        //hit detection for 
        for(var i=0; i<asteroids.length;i++){
        	if(spaceShip.x +spaceShip.w > asteroids[i].x  && spaceShip.x < asteroids[i].x + asteroids[i].w && spaceShip.y < asteroids[i].y + asteroids[i].h && spaceShip.y + spaceShip.h > asteroids[i].y){
        		asteroids[i].x=10000000;
        		lives.splice(lives.length-1,lives.length);
        		health-=1;
        	}
        }

        console.log(spaceShip.xpos);

        if(spaceShip.xpos < -2*(w))
        {
            // spaceShip.x = spaceShip.x + 30;
            speedx = 4;
        }
        else if(spaceShip.xpos > 2*(w) - (300 + spaceshipWidth))
        {
            // spaceShip.x = spaceShip.x - 30;
            speedx = -4;
        }

        if(spaceShip.y < 20)
        {
        	spaceShip.y = spaceShip.y + 30;
        	speedy = 0;
        	speedx = 0;
        }
        else if(spaceShip.y > h - (20 + spaceshipHeight))
        {
            spaceShip.y = spaceShip.y - 30;
            speedy = 0;
            speedx = 0;
        }



        if((spaceShip.x < leftPerimeter && speedx < 0 || spaceShip.x > rightPerimeter && speedx > 0) && (spaceShip.y < topPerimeter && speedy < 0 || spaceShip.y > bottomPerimeter && speedy > 0)){

        }
        else{

	    	// if within boundaries
	        if(spaceShip.y < topPerimeter && speedy < 0 || spaceShip.y > bottomPerimeter && speedy > 0){
		        spaceShip.x += speedx;
				spaceShip.xpos += speedx;
	        }
	        else{
		        spaceShip.y += speedy;
		        spaceShip.ypos += speedy;
	        }

			if(spaceShip.x < leftPerimeter && speedx < 0 || spaceShip.x > rightPerimeter && speedx > 0){
		        spaceShip.y += speedy;
		        spaceShip.ypos += speedy;
	        }
	        else{
		        spaceShip.x += speedx;
		        spaceShip.xpos += speedx;
	        }
        }
    }

	init();	

	var ship;
	var asteroids = [];
	

	var space = [];
	for(var i=-5;i<4;i++){
		for(var j=-3; j<1;j++){
			space.push(createBackground(i*w,j*h));
		}
	}


	///////////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	////////	Main Game Engine
	////////////////////////////////////////////////////
	///////////////////////////////////////////////////
	function paint()
	{
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, w, h);
		// theme.play();


		
		if(firstView == true)
	    {
	        ctx.drawImage(firstpage, 0, 0, 1024, 4608);
	        if(13 in keysDown)
	        {
	      
	            firstView = false;
	            secondView = true;
	        	
	        }
	    }
	    
	    if(secondView == true)
	    {
	        ctx.drawImage(secondpage, 0, 0, 1024, 4608);
	        time111 ++;

	        if(time111 > 20){

		        if(13 in keysDown)
		        {
		            secondView = false;
		            gamePlay = true;
		        }
	        }
	    }
		else if(gamePlay){//drawing the space backgrounds


			j++;
			if(j==10){
				setInterval(function(){
					console.log("asteroid created");
					asteroids.push(createAsteroid());
				 }, 800);
			}


			for(var i=0; i < space.length; i++){
				space[i].drawBackground();
			}

			//drawing all of the asteroids
			for(var i=0; i < asteroids.length; i++){
				ctx.fillStyle ='red'
				asteroids[i].moveAsteroid();
				asteroids[i].drawAsteroid();

			}
			
			if(transportShip == true){
				timer++;

				if(timer > 40){
					transport();
					transportShip = false;
					transportSwitch = false;
					timer = 0;
				}	
			}

			ctx.drawImage(wormholeImage, wx, wy, ww, wh);


			spaceShip.drawSpaceShip();
			//if within boundaries 
			PlayerMovement();
			scrollBackground();

			for(var i=0; i<lives.length; i++){
				lives[i].drawHealthPoints();
			}


			//Gravity Code		
		cxShip = spaceShip.x+spaceShip.w/2;
		cyShip = spaceShip.y+spaceShip.h/2;
		
	for(var i=0; i <planet.length;i++){	
		
		
		multi[i] = planet[i].r/600;
	
		cxPlanet[i] = planet[i].x + planet[i].w/2
		cyPlanet[i] = planet[i].y + planet[i].h/2
	
			//Comment Your Code Mitchell(AKA worm hole)
			if(spaceShip.x < cxPlanet[i] + planet[i].r && spaceShip.x + spaceShip.w > cxPlanet[i] - planet[i].r && spaceShip.y < cyPlanet[i] + planet[i].r && spaceShip.h + spaceShip.y > cyPlanet[i]- planet[i].r)  
				{
					console.log(spaceShip.xpos);
					
					if(cxShip > cxPlanet[i] && cyShip < cyPlanet[i] ){
						planet[i].colour='red'
						speedx -= multi[i];
						speedy += multi[i];
						
					}else if (cxShip < cxPlanet[i] && cyShip < cyPlanet[i]){
						planet[i].colour='red'
						speedx += multi[i];
						speedy += multi[i];
						
					}else if (cxShip < cxPlanet[i] && cyShip > cyPlanet[i]){
						planet[i].colour='red'
						speedx += multi[i];
						speedy -= multi[i];	
						
					}else if (cxShip > cxPlanet[i] && cyShip > cyPlanet[i]){
						planet[i].colour='red'
						speedx -= multi[i];
						speedy -= multi[i];	
						
					}else {planet[i].colour='blue'}
		
				}

				planet[i].drawPlanet(); //draws planet
			}
		
			earth.drawEndPoint();
		}

		// else if(victory == true){
		// 	//display gameover view and restartpage
		// 	ctx.drawImage(victorypage,0,0,w,h);
		// }


		
	}////////////////////////////////////////////////////////////////////////////////END PAINT/ GAME ENGINE
	

	//////////////////////////////////
	//////////////////////////////////
	////////	KEY BOARD INPUT
	////////////////////////////////

	var keysDown={};
	var keysUp={};

	addEventListener("keydown",function(e)
	{
		keysDown[e.keyCode]=true;
	},false);
	addEventListener("keyup",function(e)
	{
		delete keysDown[e.keyCode];
		keysUp[e.keyCode]=true;
	},false);

	var keysClicked={};

	addEventListener("keydown",function(e)
	{
		keysClicked[e.keyCode]=true;
	},false);	
})