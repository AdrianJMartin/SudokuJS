/**

 */




var xsize = 3;
var ysize = 3;


//https://www.websudoku.com/?level=1&set_id=2401525891
var numbers = [
[5,0,2,6,0,0,3,0,0],
[0,0,4,3,0,9,0,0,6],
[3,1,0,5,2,0,7,9,0],
[0,0,8,0,0,6,0,3,7],
[0,0,0,0,0,0,0,0,0],
[9,2,0,8,0,0,1,0,0],
[0,7,3,0,6,1,0,2,9],
[4,0,0,7,0,2,6,0,0],
[0,0,1,0,0,5,4,0,8]
];


var changes = 1;

while (changes > 0 ) {

    console.log( "Changes:" + changes );
    console.log( numbers );

    changes = 0 ;

    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {

            if( numbers[y][x] != 0 ) break;

            var a = [];
            for (var i = 1; i <= 9; i++) a.push(i);

            for (var i = 0; i < 9; i++) {

                // used numbers across
                var n = numbers[y][i];
                if (n != 0 && a.indexOf(n) > -1) {
                    a.splice(a.indexOf(n), 1);
                }

                // used numbers vertically
                n = numbers[i][x];
                if (n != 0 && a.indexOf(n) > -1) {
                    a.splice(a.indexOf(n), 1);
                }
            }

            // used numbers in same super-cell
            var sx = Math.floor( x / 3 ) ;
            var sy = Math.floor( y / 3 ) ;
            for (var yy = sy * 3 ; yy < sy * 3 + 3 ; yy++ )
                for (var xx = sx * 3 ; xx < sx + 3 ; xx++ ) {
                    n = numbers[yy][xx];
                    if (n != 0 && a.indexOf(n) > -1)
                        a.splice(a.indexOf(n), 1);
                }

            if (a.length == 1) {
                numbers[y][x] = a[0];
                changes++;
            }

        }
    }
    console.log( "- - - - - - - - - - - - - - - - - - - - - - ");
}

console.log( "complete");

console.log( numbers );