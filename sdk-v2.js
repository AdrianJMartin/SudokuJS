/* This version is going to use more lists/arrays to map the state of the game and the available numbers */

function range(s, e) {
    var r = [];
    for (var i = s; i < e + 1; i++) r.push(i);
    return new Set(r);
}

function remove(a, v) {
    a.delete(v);
}

const union = (...sets) => {
    let X = new Set();
    sets.forEach(S => S.forEach(e => X.add(e)))
    return X;
};

const intersection = (...sets) => sets.reduce(
    (A, B) => {
        let X = new Set();
        B.forEach((v => { if (A.has(v)) X.add(v) }));
        return X;
    });

function solve(a, r, c, s) {
    r.forEach(v => {
        a.delete(v);
    });

    c.forEach(v => {
        a.delete(v);
    });

    s.forEach(v => {
        a.delete(v);
    });
}

function log() {
    console.log(arguments);
}

var rowOps = [];
var colOps = [];
var cellOps = [];

//https://www.websudoku.com/?level=1&set_id=2401525891
// easy
var game = [
    [5, 0, 2, 6, 0, 0, 3, 0, 0],
    [0, 0, 4, 3, 0, 9, 0, 0, 6],
    [3, 1, 0, 5, 2, 0, 7, 9, 0],
    [0, 0, 8, 0, 0, 6, 0, 3, 7],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [9, 2, 0, 8, 0, 0, 1, 0, 0],
    [0, 7, 3, 0, 6, 1, 0, 2, 9],
    [4, 0, 0, 7, 0, 2, 6, 0, 0],
    [0, 0, 1, 0, 0, 5, 4, 0, 8]
];

// easy
game = [
    [0,0,8,0,0,0,1,0,0],
    [0,0,5,7,1,0,0,0,8],
    [0,1,0,0,0,4,9,0,3],
    [8,0,0,0,2,1,5,0,7],
    [0,7,0,6,0,3,0,4,0],
    [2,0,3,9,7,0,0,0,1],
    [9,0,7,5,0,0,0,1,0],
    [1,0,0,0,9,2,7,0,0],
    [0,0,6,0,0,0,8,0,0]
];

//https://www.websudoku.com/?level=2&set_id=3471253793
//medium
game = [
    [9,5,0,0,8,0,0,0,0],
    [0,0,3,4,5,0,0,0,0],
    [1,0,4,0,0,0,0,0,6],
    [0,4,2,0,0,0,0,0,6],
    [0,0,9,6,0,3,8,0,0],
    [6,0,0,0,0,0,1,4,0],
    [5,0,0,2,0,0,4,0,1],
    [0,0,0,0,3,5,6,0,0],
    [0,0,0,0,7,0,0,3,9]
];







// create arrays for rows and columns potential numbers
for (var i = 0; i < 9; i++) {
    rowOps[i] = new Set();
    colOps[i] = new Set();
};

// and arrays for the super cells
for (var y = 0; y < 3; y++) {
    cellOps[y] = [];
    for (var x = 0; x < 3; x++)
        cellOps[y][x] = new Set();
}


// We will take the numbers from the 'game' object and move them over to the 'grid' object.
var grid = [];

for (var y = 0; y < 9; y++) {
    grid[y] = [];
    for (var x = 0; x < 9; x++) {
        var v = game[y][x];
        if (v == 0) {
            grid[y][x] = range(1, 9);
        } else {
            setCellValue(y, x, v);
        }
    }
}

function setCellValue(y, x, v) {
    grid[y][x] = v;
    rowOps[y].add(v);
    colOps[x].add(v);
    cellOps[Math.floor(y / 3)][Math.floor(x / 3)].add(v);
}

var changed = true;

while (changed) {
    changed = false;
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            var c = grid[y][x];
            if (typeof c == "object") {
                solve(c, rowOps[y], colOps[x], cellOps[Math.floor(y / 3)][Math.floor(x / 3)]);
                if (c.size == 1) {
                    v = c.entries().next().value[0];
                    setCellValue(y, x, v);
                    changed = true;
                }
            }
        }
    }
}

function printGrid(g){
    for( var y = 0 ; y < 3*9 ; y++){
        var l = "";
        for( var x = 0 ; x < 3*9 ; x++ ){
            var a = g[ Math.floor(y/3)][Math.floor(x/3)];
            if(typeof a == "number"){
                if( x % 3 == 1 && y % 3 == 1 ){
                    l += a;
                } else {
                    l += " ";
                }
            } else {
                l += "X";
            }
        }
        console.log(l);
    }

}

printGrid(grid);
//log(grid);
