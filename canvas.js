
let canvas = document.getElementById('feuille');
canvas.height= 720;
canvas.width = 1080 ;
let context = canvas.getContext('2d');

context.beginPath();
context.moveTo(540, 360);

// line 1
context.lineTo(200, 160);

// line 2
context.lineTo(500, 90);

context.lineWidth = 5;
context.strokeStyle = 'blue';
context.stroke();

