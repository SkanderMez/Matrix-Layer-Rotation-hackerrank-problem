'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function getFirstRow(matrix,m,n,number){
    let firstRow = []
    for(let i = number;i < n-number; i++){
        firstRow.push(matrix[number][i]);
    }


    return firstRow;
}
function getLastRow(matrix,m,n,number){
    let lastRow = []

      for (let i = (n - number - 1); i >= number; i--) {
        lastRow.push(matrix[m-1-number][i]);
    }

    return lastRow;
}
//get first column without first and last elements
function getFirtColumn(matrix,m,n,number){
    let firstColumn = []
  for (let i = m - number - 2; i > number; i--) {
        firstColumn.push(matrix[i][number]);
    }

    return firstColumn;
}
function getLastColumn(matrix,m,n,number){
    let lastColumn = []
    for(let i = number + 1;i < m-1-number; i++){
        lastColumn.push(matrix[i][n-1-number]);
    }

    return lastColumn;
}






function printMatrix(matrix){

    for (var i = 0; i < matrix.length; i++) { 
    for (var j = 0; j < matrix[i].length; j++)    { 
        process.stdout.write(matrix[i][j] + " "); 
    } 
    console.log(""); 
}  
}

function getLayer(matrix,layerNumber,m,n){
 
  // get first row 
  let firstRow = getFirstRow(matrix,m,n,layerNumber);
  // get last row 
  let lastRow = getLastRow(matrix,m,n,layerNumber);
  // get first column
  let firstColumn = getFirtColumn(matrix,m,n,layerNumber);
  //get last column
  let lastColumn = getLastColumn(matrix,m,n,layerNumber);

  let layer = [...firstRow,...lastColumn, ...lastRow,...firstColumn];

  return layer;
}

function getAllMatrixLayers(matrix,m,n){
    let layersList = [];
    for (let layerIndex = 0; layerIndex < Math.min(m / 2, n / 2); layerIndex++) {

    let layer = getLayer(matrix, layerIndex, m, n);
 
    layersList.push(layer);
  }
 
  return layersList;
}

// Rotate one layer 
function rotateOneLayer(layersList,r,layerIndex){
  let layer = layersList[layerIndex];
  for(let i=0; i<r;i++){
    const firstElement = layer.shift();
    layer.push(firstElement)
  } 
  layersList[layerIndex] = layer;
}

// Rotate all layers
function rotateAllLayers(layersList,r){
  for (let layerIndex = 0; layerIndex < layersList.length; layerIndex++) {

    rotateOneLayer(layersList, r, layerIndex);
  }
 
  return layersList;
}

// Convert layers back to matrix
function convertLayersToMatrix(rotatedLayers,m,n){
  let matrix = [];
 
  for (let layerIndex = 0; layerIndex < rotatedLayers.length; layerIndex++) {
 
    // get a layer
    let layer = rotatedLayers[layerIndex];
 
    for (let i = 0; i < layer.length;) {
 
      // first Row
      for (let col = layerIndex; col < (n - layerIndex); col++) {
        if( typeof matrix[col] == 'undefined' ) matrix[col] = []
        matrix[layerIndex][col] = layer[i++];
      }
 
      // last Column
      for (let row = layerIndex + 1; row < (m - layerIndex); row++) { 
          if( typeof matrix[row] == 'undefined' ) matrix[row] = []
          matrix[row][n - layerIndex - 1] = layer[i++]; 
          } 
      // last Row
        for (let col = (n - layerIndex - 2); col >= layerIndex; col--) {
            if( typeof matrix[col] == 'undefined' ) matrix[col] = []
        matrix[m - layerIndex - 1][col] = layer[i++];
      }
 
      // first Column
      for (let row = m - layerIndex - 2; row > layerIndex; row--) {
          if( typeof matrix[row] == 'undefined' ) matrix[row] = []
        matrix[row][layerIndex] = layer[i++];
      }
    }
  }
 
  return matrix;
}
// Complete the matrixRotation function below.
function matrixRotation(matrix, r) {
    // set row number m and column number
    let m = matrix.length;
    let n = matrix[0].length;
    /*
        A layer represents all elements in the edge of the matrix
        In order to rotate all matrix , we will rotate layer by layer 

    */
    let layersList = getAllMatrixLayers(matrix, m, n);
    // Rotate all layers
    let rotatedLayers = rotateAllLayers(layersList,r);
    //get final matrix
    let rotatedMatrix = convertLayersToMatrix(rotatedLayers, m, n);
    // print matrix as the wished output
    printMatrix(rotatedMatrix);

}

function main() {
    const mnr = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(mnr[0], 10);

    const n = parseInt(mnr[1], 10);

    const r = parseInt(mnr[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r);
}

