var Clock = function(size, color, fast){
	var clockCanvas;
	var context;
	var clockColor;
	var realTimeBool;

	//constructor
	function clockStart(size, color, fast){
		//create canvas
		clockCanvas = document.createElement('canvas');
		clockCanvas.width  = size;
		clockCanvas.height = size;
		document.body.appendChild(clockCanvas);
		context = clockCanvas.getContext("2d");
		//set variables and start clock
		clockColor = color;
		realTimeBool = fast;
		drawTime();
	}
		
	//clock draw
	function drawTime(){
		//prepare redraw
		context.clearRect(0, 0, clockCanvas.width, clockCanvas.height);						
		context.fillStyle = clockColor;
		context.strokeStyle = clockColor;
		
		//draw black circle to connect the hands of the clock
		context.beginPath();
		context.arc(clockCanvas.width / 2, clockCanvas.height / 2, clockCanvas.width / 80, 0, 2 * Math.PI, false);
		context.fill();

		//get date
		var n = Date.now();

		//get timezone offset
		var offset = new Date().getTimezoneOffset() / 60;

		//slow stats with math.floor for slow update of minutes and seconds
		var h = (n % 86400000 / 60 / 60 / 1000) - offset;
		var m = Math.floor(n % 3600000 / 60 / 1000);
		var s = Math.floor((n % 3600000 / 1000) % 60);
		
		//real time
		if(realTimeBool){
			var m = n % 3600000 / 60 / 1000;
			var s = (n % 3600000 / 1000) % 60;
		}
		
		//debug time
		/*var nul = ""
		if(m < 10){nul = "0"}
		console.log(h +":" + nul + m);*/
		
		//line scaling
		var lineLength = 0.45 * clockCanvas.width;

		context.strokeStyle=clockColor;

		//draw the clock itself
		for(var i = 0; i < Math.PI * 18 ; i += 5 ){
			context.beginPath();
			context.lineWidth = clockCanvas.width / 120;
			if(i % 3 == 0){
				context.lineWidth = clockCanvas.width / 50;
			}
			context.moveTo((clockCanvas.width / 2) + Math.sin(i / 60 * 2 * Math.PI) * lineLength * 0.9, (clockCanvas.height / 2) -Math.cos(i / 60 * 2 * Math.PI) * lineLength * 0.9);
			context.lineTo((clockCanvas.width / 2) + Math.sin(i / 60 * 2 * Math.PI) * lineLength, (clockCanvas.height / 2) -Math.cos(i / 60 * 2 * Math.PI) * lineLength);
			context.stroke();
			context.closePath();
		}
		
		//calculate the time in vectors
		var vecHX = Math.sin(h / 12 * 2 * Math.PI);
		var vecHY = -Math.cos(h / 12 * 2 * Math.PI);
		
		var vecMX = Math.sin(m / 60 * 2 * Math.PI);
		var vecMY = -Math.cos(m / 60 * 2 * Math.PI);
		
		var vecSX = Math.sin(s / 60 * 2 * Math.PI);
		var vecSY = -Math.cos(s / 60 * 2 * Math.PI);
		
		//draw the clock hands
		context.strokeStyle = clockColor;
		context.lineWidth = clockCanvas.width / 40;
		
		context.beginPath();
		context.moveTo(clockCanvas.width / 2, clockCanvas.height / 2);
		context.lineTo((clockCanvas.width / 2) + vecHX * lineLength / 1.6, (clockCanvas.height / 2) +  vecHY * lineLength / 1.6);
		context.stroke();
		context.closePath();
		
		context.beginPath();
		context.moveTo(clockCanvas.width / 2, clockCanvas.height / 2);
		context.lineTo((clockCanvas.width / 2) + vecMX * lineLength / 1.2, (clockCanvas.height / 2) +  vecMY * lineLength / 1.2);
		context.stroke();
		context.closePath();
		
		context.strokeStyle = "#FF0000";
		context.lineWidth = clockCanvas.width / 100;
		
		context.beginPath();
		context.moveTo(clockCanvas.width / 2, clockCanvas.height / 2);
		context.lineTo((clockCanvas.width / 2) + vecSX * lineLength, (clockCanvas.height / 2) +  vecSY * lineLength);
		context.stroke();
		context.closePath();
		
		//the little dot on top of the red hand
		context.fillStyle="#FF0000";
		context.beginPath();
		context.arc(clockCanvas.width / 2, clockCanvas.height / 2, clockCanvas.width / 80, 0, 2 * Math.PI, false);
		context.fill();
	}

	//refresh rate
	window.setInterval(function () {
		drawTime();
	}, 50);
	clockStart(size, color, fast);
}
