const { randomInt } = require("crypto");
const tf = require("@tensorflow/tfjs");

//Se define la dimension las matrices. Ejemplo: matriz de 3x3
const filas = 3
const columnas = 3

//Se crean las matrices
function crearMatrizBidimencional(paramFilas, paramColumnas) {
  const array = [];
  for (let i = 0; i < paramFilas; i++) {
    array[i] = [];
    for (let j = 0; j < paramColumnas; j++) {
      array[i][j] = randomInt(1, 100);
    }
  }
  return array;
}

//Se crea la funcion que realiza la multiplicacion de las matrices
function multiplicacionMatrices(paramMatriz1, paramMatriz2) {
  const matriz3 = [0];
  for (let i = 0; i < paramMatriz1.length; i++) {
    matriz3[i] = [0];
    for (let j = 0; j < paramMatriz2[0].length; j++) {
      matriz3[i][j] = 0;
      for (let k = 0; k < paramMatriz1[0].length; k++) {
        matriz3[i][j] += paramMatriz1[i][k] * paramMatriz2[k][j];
      }
    }
  }
  return matriz3;
}

//Se guarda en una constante el resultado de la creacion de la primer  matriz
const matriz1 = crearMatrizBidimencional(filas, columnas);

//Se guarda en una constante el resultado de la creacion de la segunda  matriz
const matriz2 = crearMatrizBidimencional(columnas, filas);

//Se guarda en una constante el resultado de la multiplicacion de las matrices
const Resultado = multiplicacionMatrices(matriz1, matriz2);

const resultadoTensorFlow = tf.matMul(matriz1, matriz2).dataSync();
//Se imprimen las dos matrices a operar y el resultado de la multiplicacion de las mismas


console.log(
  "--------------------------MULTIPLICACION DE MATRICES-----------------------------"
);
console.log("Matriz 1");
console.table(matriz1);
console.log("-------------------------------------------------------");
console.log("Matriz 2");
console.table(matriz2);
console.log("-------------------------------------------------------");
console.log("Resultado: Matriz 3");
console.table(Resultado);
console.log("-------------------------------------------------------");
console.log("Constatar Resultado con las Funcion de Tensorflow");
console.log(resultadoTensorFlow);
console.log("-------------------------------------------------------");


console.log(" Los resultados de las operaciones",( JSON.stringify(tf.tensor(Resultado).dataSync()) === JSON.stringify(resultadoTensorFlow)) ? "Son iguales" : "No son iguales");
