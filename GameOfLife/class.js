class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        //console.log(emptyCells);
        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}
class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 25;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            this.y = newCell[1];
            this.x = newCell[0];
            this.energy--;
        }
        if (this.energy <= 0) {
            this.die(i);
        }
    }
    eat() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;

            for (var i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.y = newCell[1];
            this.x = newCell[0];

            this.energy++;
            if (this.energy >= 40) {
                this.mul();
                this.energy = 25;
            }
            else if (this.energy <= 0) {
                this.die(i);
                //console.log("die");
            }

        }
        else {
            this.move();
        }
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrasEater = new GrassEater(newX, newY, 2);
            grassEater.push(newGrasEater);
        }
    }
    die(i) {
        // matrix[this.y][this.x] = 0;
        // grassEater.splice(i, 1);
        for (var i in grassEater) {
            if (this.x == grassEater[i].x && this.y == grassEater[i].y) {
                matrix[this.y][this.x] = 0;
                grassEater.splice(i, 1);
                //console.log(this.energy);
                break;
            }
        }
    }
}
class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 50;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        // console.log("111");
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        // console.log("222");
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        //console.log("333");
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;
            this.y = newCell[1];
            this.x = newCell[0];
            this.energy--;
        }
        if (this.energy <= 0) {
            this.die(i);
        }
    }
    eat() {
        // console.log("444");
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;

            for (var i in grassEater) {
                if (newCell[0] == grassEater[i].x && newCell[1] == grassEater[i].y) {
                    grassEater.splice(i, 1);
                    break;
                }
            }
            this.y = newCell[1];
            this.x = newCell[0];

            this.energy++;
            if (this.energy >= 53) {
                this.mul();
                this.energy = 50;
            }
            else if (this.energy <= 0) {
                this.die(i);
                //console.log("die");
            }

        }
        else {
            this.move();
            // console.log("aaa");
        }
    }
    mul() {
        // console.log("555");
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newPredator = new Predator(newX, newY, 3);
            predatorArr.push(newPredator);
        }
    }
    die(i) {
        console.log("666");
        // matrix[this.y][this.x] = 0;
        // grassEater.splice(i, 1);
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                matrix[this.y][this.x] = 0;
                predatorArr.splice(i, 1);
                //console.log(this.energy);
                break;
            }
        }
    }
}
class Paladin {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 0;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        //4x4 movement
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character) {
        // console.log("222");
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        //console.log("333");
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 4;
            this.y = newCell[1];
            this.x = newCell[0];
            this.energy++;
        }
        if (this.energy >= 50) {
            this.mulGE();
            this.energy = 0;
            this.die(i);
        }
        else if (this.energy == 20) {
            this.mul();
        }
    }
    mulGE() {
        for (var i = 0; i < 7; i++) {
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 2;
            }

            var newGrasEater = new GrassEater(newX, newY, 2);
            grassEater.push(newGrasEater);
        }
    }
    die(i) {
        //console.log("666");
        // matrix[this.y][this.x] = 0;
        // grassEater.splice(i, 1);
        for (var i in paladinsArr) {
            if (this.x == paladinsArr[i].x && this.y == paladinsArr[i].y) {
                matrix[this.y][this.x] = 0;
                paladinsArr.splice(i, 1);
                //console.log(this.energy);
                break;
            }
        }
    }
    mul() {
        // console.log("555");
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newPaladin = new Paladin(newX, newY, 4);
            paladinsArr.push(newPaladin);
        }
    }
}
class Death {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        //4x4 movement
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(char1, char2, char3, char4) {
        // console.log("222");
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char1 || matrix[y][x] == char2 || matrix[y][x] == char3 || matrix[y][x] == char4) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        //console.log("333");
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 5;
            this.y = newCell[1];
            this.x = newCell[0];
            this.energy++;
        }
        // if (this.energy >= 50) {
        //     this.mulGE();
        //     this.energy = 0;
        //     this.die();
        // }
        // else if (this.energy == 20) {
        //     this.mul();
        // }
    }
    eat() {
        // console.log("444");
        this.getNewCoordinates();
        var emptyCells1 = this.chooseCell(1,2,3,4);
        var newCell = random(emptyCells1);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 5;

            for (var i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            for (var i in predatorArr) {
                if (newCell[0] == predatorArr[i].x && newCell[1] == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            for (var i in grassEater) {
                if (newCell[0] == grassEater[i].x && newCell[1] == grassEater[i].y) {
                    grassEater.splice(i, 1);
                    break;
                }
            }

            for (var i in paladinsArr) {
                if (newCell[0] == paladinsArr[i].x && newCell[1] == paladinsArr[i].y) {
                    paladinsArr.splice(i, 1);
                    break;
                }
            }

            this.y = newCell[1];
            this.x = newCell[0];

            this.energy++;
            if (this.energy >= 50) {
                this.mul();
            }
            else if (this.energy >= 100) {
                this.die(i);
                //console.log("die");
            }

        }
        else {
            this.move();
            // console.log("aaa");
        }
    }
    die(i) {
        //console.log("666");
        // matrix[this.y][this.x] = 0;
        // grassEater.splice(i, 1);
        for (var i in deathArr) {
            if (this.x == deathArr[i].x && this.y == deathArr[i].y) {
                matrix[this.y][this.x] = 0;
                deathArr.splice(i, 1);
                //console.log(this.energy);
                break;
            }
        }
    }
    mul() {
        // console.log("555");
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newDeath = new Death(newX, newY, 5);
            deathArr.push(newDeath);
        }
    }
}
