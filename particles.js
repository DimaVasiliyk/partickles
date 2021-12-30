(function (){

	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext("2d");

	let With = window.innerWidth;
	let Height = window.innerHeight;
	canvas.width = With;
	canvas.height = Height;

	particles = [];

	properties = {
		bgColor : 'rgba(17,17,19,1)',
		particleColor: 'rgba(255,0,0,1)',
		particleRadius: 3,
		particleCount: 200,
		particleMaxVelocity: 0.5,
		lineLenght : 200,
		particlesLife : 6
	}


	document.querySelector('body').appendChild(canvas)

	window.onresize = function(){
		let With = window.innerWidth;
		let Height = window.innerHeight;
		canvas.width = With;
		canvas.height = Height;
	}

	class Particle{
		constructor(){
			this.x = Math.random()*With;
			this.y = Math.random()*Height;
			this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity
			this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity
			this.life = Math.random()*properties.particlesLife*60
		}

		position(){
			this.x + this.velocityX > With && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0?  this.velocityX *=-1 :this.velocityX
			this.y + this.velocityY > Height && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0?  this.velocityY *=-1 :this.velocityY
			this.x += this.velocityX
			this.x += this.velocityX
		}

		reDraw(){
			ctx.beginPath();
			ctx.arc(this.x, this.y,properties.particleRadius,0,Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = properties.particleColor;
			ctx.fill();
		}
	
		reCalculateLife(){
			if(this.life < 1){
				this.x = Math.random()*With;
				this.y = Math.random()*Height;
				this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity
				this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity
				this.life = Math.random()*properties.particlesLife*60
			}
			this.life--;
		}
	}

	function redDrewBackground(){
		ctx.fillStyle = properties.bgColor;
		ctx.fillRect(0,0,With,Height);
	}

	function drewLines(){
		let x1,y1,x2,y2,length,opacity;
		for(let i in particles){
			for(j in particles){
				x1 = particles[i].x;
				y1 = particles[i].y;
				x2 = particles[j].x;
				y2 = particles[j].y;
				length = Math.sqrt(Math.pow(x2-x1 ,2) + Math.pow(y2-y1, 2));

				if(length<properties.lineLenght){
					opacity = 1-length/properties.lineLenght
					ctx.lineWidth = '0,5';
					ctx.strokeStyle = 'rgba(255,0,0,'+opacity+')'  
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.closePath();
					ctx.stroke();
				}
			}
		}
	}

	function redDrewParticles(){
		for(let i in particles){
			particles[i].reCalculateLife()
			particles[i].position()
			particles[i].reDraw()
		}
	}

	function loop(){
		redDrewBackground();
		redDrewParticles();
		requestAnimationFrame(loop);
		drewLines();
	}


	function init(){
		for(let i = 0; i < properties.particleCount; i++){
			particles.push(new Particle)
		}
		loop();
	}

	init()

})()