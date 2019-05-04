var matrix = [
    // [0, 0, 1, 0, 0],
    // [1, 2, 0, 2, 0],
    // [0, 1, 0, 3, 0],
    // [0, 0, 1, 0, 0],
    // [1, 1, 0, 0, 3],
    // [1, 1, 0, 0, 0],
    // [1, 1, 0, 0, 0]
    // [0, 0, 0, 0, 0],
    // [0, 0, 1, 0, 0],
    // [0, 0, 5, 0, 0],
    // [0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0]
];

var grassArr = [];
var grassEater = [];
var predatorArr = [];
var paladinsArr = [];
var deathArr = [];

var side = 10;

function Matrix(n, m) {
    for (var y = 0; y < n; y++) {
        matrix.push([]);
        for (var x = 0; x < m; x++) {
           matrix[y][x] = random([0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,3,3,4,5]);
        }
    }
}
//random([0,0,0,0,0,1,1,1,2,3]);
function setup() {
    Matrix(50, 50);
   // console.log(matrix);
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix.length; y++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gr_eat = new GrassEater(x, y, 2);
                grassEater.push(gr_eat);
            }
            else if(matrix[y][x] == 3){
                var predator = new Predator(x,y,3);
                predatorArr.push(predator);
            }
            else if(matrix[y][x] == 4){
                var paladin = new Paladin(x,y,4);
                paladinsArr.push(paladin);
            }
            else if(matrix[y][x] == 5){
                var death = new Death(x,y,5);
                deathArr.push(death);
            }
        }
    }
    //console.log(grassArr);
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("white");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }

        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
        //console.log("mul");
    }
    for (var i in grassEater) {
        grassEater[i].eat();

    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for(var i in paladinsArr){
        paladinsArr[i].move();
    }
    for(var i in deathArr){
        deathArr[i].eat();
    }
}
