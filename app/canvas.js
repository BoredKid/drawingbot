let pathsTable = [];
let sizeTable = {
    "petit": 0.5,
    "moyen": 1,
    "grand": 2
};

let directionTable = {
    "haut": "up",
    "bas": "down",
    "droite": "right",
    "gauche": "left"
};

function makeUpPath(color, size) {
    // on calcule la nouvelle hauteur d'arrivée avec prise en compte de la taille demandée
    let newHeight = lastPosition[1] - Math.floor(standardLineSize * sizeTable[size]);

    // on trace le trait
    context.beginPath();
    context.moveTo(lastPosition[0], lastPosition[1]);
    context.lineTo(lastPosition[0], newHeight);
    context.lineWidth = 3;
    context.strokeStyle = color; // on utilise la couleur choisie
    context.stroke();

    lastPosition[1] = newHeight;
}

function makeDownPath(color, size) {
    // on calcule la nouvelle hauteur d'arrivée avec prise en compte de la taille demandée
    let newHeight = lastPosition[1] + Math.floor(standardLineSize * sizeTable[size]);

    // on trace le trait
    context.beginPath();
    context.moveTo(lastPosition[0], lastPosition[1]);
    context.lineTo(lastPosition[0], newHeight);
    context.lineWidth = 3;
    context.strokeStyle = color; // on utilise la couleur choisie
    context.stroke();

    lastPosition[1] = newHeight;
}

function makeLeftPath(color, size) {
    // on calcule la nouvelle largeur d'arrivée avec prise en compte de la taille demandée
    let newWidth = lastPosition[0] - Math.floor(standardLineSize * sizeTable[size]);

    // on trace le trait
    context.beginPath();
    context.moveTo(lastPosition[0], lastPosition[1]);
    context.lineTo(newWidth, lastPosition[1]);
    context.lineWidth = 3;
    context.strokeStyle = color; // on utilise la couleur choisie
    context.stroke();

    lastPosition[0] = newWidth;
}

function makeRightPath(color, size) {
    // on calcule la nouvelle largeur d'arrivée avec prise en compte de la taille demandée
    let newWidth = lastPosition[0] + Math.floor(standardLineSize * sizeTable[size]);

    // on trace le trait
    context.beginPath();
    context.moveTo(lastPosition[0], lastPosition[1]);
    context.lineTo(newWidth, lastPosition[1]);
    context.lineWidth = 3;
    context.strokeStyle = color; // on utilise la couleur choisie
    context.stroke();

    lastPosition[0] = newWidth;
}

function makePath(direction, color, size) {

    let orientation = directionTable[direction];
    switch (orientation) {
        case 'up':
            makeUpPath(color.toLowerCase(), size);
            break;
        case 'down':
            makeDownPath(color.toLowerCase(), size);
            break;
        case 'right':
            makeRightPath(color.toLowerCase(), size);
            break;
        case 'left':
            makeLeftPath(color.toLowerCase(), size);
            break;
    }

}

// dessine le dessin complet
function draw() {
    // initialisation de la variable de position initiale qui est le milieu
    lastPosition = [Math.floor(canvas.width / 2), Math.floor(canvas.height / 2)];

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (path of pathsTable) {
        makePath(path[0], path[1], path[2]);
    }
}

function analyseResponse(result) {
    let parameters = result['parameters'];
    // si on veut tracer un trait et on a toutes les données on trace un trait
    if (result['metadata']['intentName'] === "Tracer un trait" &&
        parameters['Directions'].length > 0 &&
        parameters['Couleurs'].length > 0 &&
        parameters['Tailles'].length > 0
    ) {
        // traçage du trait
        let path = [parameters['Directions'].toLowerCase(), parameters['Couleurs'], parameters['Tailles'].toLowerCase()];
        pathsTable.push(path);
        draw();
        $(".jumbotron").css("background-color",parameters['Couleurs']);
    }
    else if (result['metadata']['intentName'] === "Effacer") {
        pathsTable = [];
        draw();
    }
}


// initialisation canvas
let canvas = document.getElementById('feuille');
canvas.height = Math.floor(window.innerHeight * (0.8));
canvas.width = Math.floor(window.innerWidth);
// initialisation de la taille standard d'un trait
let standardLineSize = Math.floor(canvas.height / 10);
let lastPosition;
let context = canvas.getContext('2d');









