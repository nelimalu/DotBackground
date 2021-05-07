var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var colours = ["paleturquoise", "deepskyblue", "lightblue", "darkturquoise", "lavender", "mustardyellow"];
// ["paleturquoise", "white", "red", "moccasin"];
var background = "rgba(32,32,32,1)";

function randint(min, max) {
	return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

function choice(iterable) {
	return iterable[randint(0, iterable.length)];
}

/*
c.fillStyle = 'rgba(255,0,0,0.1)';
c.fillRect(20,20,100,100);


c.beginPath();
c.moveTo(50, 300);
c.lineTo(400, 500);
c.strokeStyle = "rgba(250,0,250,1)";
c.stroke();


for (var i = 0; i < 50; i++) {
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	c.beginPath();
	c.arc(x, y, 30, 0, Math.PI * 2, false);

	var colour = "rgba(" + randint(0,255).toString() + "," + randint(0,255).toString() + "," + randint(0,255).toString() + ")"
	c.strokeStyle = colour;
	c.stroke();
}
*/

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
var mouseRadius = 50;

window.addEventListener('mousemove',
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
	});

function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.minRadius = radius;
	this.dx = (Math.random() - 0.5) * 0.5;
	this.dy = (Math.random() - 0.5) * 0.5;
	this.colour = choice(colours);

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.colour;
		c.fill();
	}

	this.move = function() {
		this.x += this.dx;
		this.y += this.dy;

		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		// interactivity

		if (mouse.x - this.x < mouseRadius && mouse.x - this.x > -mouseRadius
			&& mouse.y - this.y < mouseRadius && mouse.y - this.y > -mouseRadius) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1
		}

	}

}

var circles = [];

for (var i = 0; i <= 800; i++) {
	var radius = randint(2,8)
	var x = randint(0 + radius, innerWidth - radius);
	var y = randint(0 + radius, innerHeight - radius);
	circles.push(new Circle(x, y, radius));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	c.fillStyle = background;
	c.fillRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circles.length; i++) {
		circles[i].draw();
		circles[i].move();
	}

}

animate();
