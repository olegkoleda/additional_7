module.exports = function solveSudoku(matrix) {
  var arr = matrix;
  sudokuSolver([0, 0]);
  return arr;

  // find closest empty square, return arr of indexes of this square
  function findClosestEmpty (indexArray) {
    var wR, wC, found = false;
    row = indexArray[0];
    col = indexArray[1];
    emptyArr = [];
    for ( var i = col + 9 * row; i < 81; i++ ) {
        wR = Math.floor(i / 9);
        wC = i % 9;
        if (arr[wR][wC] == 0) {
            found = true;
            emptyArr.push(wR,wC);
            return emptyArr;
        }
    }
}
  // find legal values

  function findLegalVal (emptyArr) {
    var legalVal, legalNum, val;
     row = emptyArr[0];
     col = emptyArr[1];
    var sectorRow = Math.floor( row / 3);
    var sectorCol = Math.floor( col / 3);

    legalNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // check in col
    for (var i = 0; i < 9; i++) {
        val = arr[row][i];
        if (val > 0) {
            if (legalNum.indexOf(val) > -1) {
                legalNum.splice(legalNum.indexOf(val), 1);
            }
        }
    }

    //check in rows
    for (var i = 0; i < 9; i++) {
        val = arr[i][col];
        if (val > 0) {
            if (legalNum.indexOf(val) > -1) {
                legalNum.splice(legalNum.indexOf(val), 1);
            }
        }
    }
    
    //check in sector
   var sectorRow = Math.floor(row / 3);
   var sectorCol = Math.floor(col / 3);

   for (i = sectorRow * 3; i < (sectorRow * 3) + 3 ; i++) {
       for ( var j = sectorCol * 3; j < (sectorCol * 3) + 3; j++) {
           val = arr[i][j];
           if (val > 0) {
               if (legalNum.indexOf(val) > -1) {
                legalNum.splice(legalNum.indexOf(val), 1);
            }
           }
       }
   
   }


  return legalNum;
   }
  
       //sudoku solver
       function sudokuSolver (indexArray) {
        var nextSquare;
        var sqRow, sqCol, cval;
        
        nextSquare = findClosestEmpty(indexArray);
        if ( !nextSquare ) {
            return true;
        }
        else {
            sqRow = nextSquare[0];
            sqCol = nextSquare[1];
            var legalVal = findLegalVal(nextSquare);
            
            for ( var i =0; i < legalVal.length; i++) {
                cval = legalVal[i];
                //nextSquare = cval;
                arr[sqRow] [sqCol] = cval;

                if (sudokuSolver ([sqRow, sqCol])) {
                    return true;
                }
                else {
                    arr[sqRow] [sqCol] = 0; 
                }

            }

        }
        return false;     
    }


}
