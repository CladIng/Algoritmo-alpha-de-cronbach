"use strict"
/*
¿Cuántos números de tres cifras con
repetición se pueden formar usando
todos los siguientes dígitos 7, 4, 8, 5, 3?

Solucion: 5³
*/
//Dibujar la matriz
function  coeficiente( ){
	//items, personas
	var n = 0
	var m = 0
	n = document.getElementById('sample1').value
	m = document.getElementById('sample2').value


	//***************************************************************
	// se crea la matriz NxM
	var x = new Array(m)
	var sumaItem = []
	var aux1 = 0
	var sumadora = 0 // almacena cada una de la suma de los Items
	for (var i = 0; i < m; i++) {
	  x[i] = new Array(n)
	}
	// se llena la matriz con valores aleatorios
	var prueba = new Array( 3,5,5,5,4,5,4,4,5,4,5,3,1,2,2,4,3,3 )
	var cont = 0
	for (var i = 0; i < m; i++) {
		for (var j = 0; j < n; j++) {
			x[i][j] = aleatorio(1,5)
			//x[i][j] = prueba[cont];cont++
			aux1 += x[i][j]
		}
		sumaItem.push(aux1)
		sumadora += aux1
		aux1 = 0
	}
	//***************************************************************




	//*************************************************
	// varianza de la suma de los Items
	var varianzaSumaToal = 0
	for (var i = 0; i < m; i++) {
		varianzaSumaToal += Math.pow( (sumaItem[i] - ( sumadora/m )) , 2 )
	}
	varianzaSumaToal /= (m-1)
	//varianzaSumaToal = varianzaSumaToal.toFixed(2)
	//*************************************************




	var promedioItem = []
	var sumaPer2 = 0
	var sumadora = 0 // almacena cada una de las sumas de las personas
	var bandera = 0
	while( bandera != n ){

		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				
				if ( j == bandera ) {
					sumaPer2 += x[i][j]
				}
			}
		}
		promedioItem.push( sumaPer2/m )
		sumaPer2 = 0
		bandera++
	}

	var sumatoriaVarianzaItem = 0
	var varianzaItem = 0

	var bandera2 = 0
	while( bandera2 != n ){

		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				
				if ( j == bandera2 ){
					varianzaItem += Math.pow( ( x[i][j] - promedioItem[bandera2] ) , 2)
					//document.write(',' + x[i][j])
				}
			}
			
		}
		//document.write('--' + ( varianzaItem/m ) + '--')
		//var ass = varianzaItem/m
		//ass.toFixed(2)
		//console.log(varianzaItem/(m-1))
		sumatoriaVarianzaItem += (varianzaItem/(m-1))
		varianzaItem = 0
		bandera2++
	}
		//console.log(sumatoriaVarianzaItem)
		//console.log(varianzaSumaToal)

		

	/*document.write(varianzaSumaToal)
	document.write("--")
	document.write(sumatoriaVarianzaItem)*/

	//document.write("array completo: " + x)
	//sumatoriaVarianzaItem = sumatoriaVarianzaItem.toFixed(2)
	var coeficiente = ( n / ( n - 1 ) ) * Math.abs( 1 - ( sumatoriaVarianzaItem/varianzaSumaToal ) )
	coeficiente = coeficiente.toFixed(3)
	//document.write( '  El Coeficiente Alpha de Cronbach es: ' + coeficiente )
	//console.log(coeficiente)
	//draw( x , n , m , coeficiente)
	var datos = []
	datos.push(coeficiente,n,m,x)
	return datos
	
}

function calcular(){
	var data
	var bandera = true
	
	while( bandera ){
		data = coeficiente()
		if( data[0] > 0.8 && data[0] < 1 ){
			//draw( x , n , m , coeficiente)
			document.getElementById("contenedor-loading").style.display="none"
			document.getElementById("contenedor-tabla").style.display="block"
			draw( data[0] , data[1] , data[2] , data[3] )
			generar_matriz( data[1] , data[2] , data[3] )
			bandera = false
		}else{
			document.getElementById("contenedor-loading").style.display="block"
			document.getElementById("contenedor-tabla").style.display="none"
		}	

	}

	

}

function generar_matriz( n , m , x ){
	
	var matriz = ''
	for (var i = 0; i < m; i++) {
		for (var j = 0; j < n; j++) {
			
			matriz += String(x[i][j])
			if( j+1 < n ){ matriz += '\t' }
		}
		matriz += '\n'
	}

	document.getElementById('link').onclick = function(code) {
		this.href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(matriz)
	}
}

function draw( coeficiente , n , m , x ){
	document.getElementById('coeficiente').innerHTML = coeficiente
	var tabla = ''

	for (var i = 0; i < m; i++) {
		tabla += '<tr>'
		for (var j = 0; j < n; j++) {
			tabla += '<td>'+x[i][j]+'</td>'
		}
		tabla += '</tr>'
	}
	var thead = '<tr>'
	for (var i = 1; i <= n; i++) {
		thead += '<th>Item '+ i + '</th>'
	}
	thead += '</tr>'
	document.getElementById('thead').innerHTML = thead
	document.getElementById('tabla').innerHTML = tabla
}




//maneras distintas de organizar la matriz
function permutacion( num ){
	var y = 1
	for (var i = num; i>0; i--){
        y *= 5
    }
    return y
}

// creando numero aleatorio
function aleatorio(inferior,superior){
	var matrizItem = new Array()
    var numPosibilidades = superior - inferior
    var aleat
	aleat = Math.random() * numPosibilidades
    aleat = Math.round(aleat)
    return aleat+1
} 
/*
var x = new Array(m)
	var tabla=''
	var aux
	for (var i = 0; i < m; i++) {
	  x[i] = new Array(n);
	}
	//x[2][2] = 3.0;
	for (var i = 0; i < m; i++) {
		tabla += '<tr>'
		for (var j = 0; j < n; j++) {
			aux = aleatorio(1,5)
			x[i][j] = aux
			tabla += '<td>'+aux+'</td>'
		}
		tabla += '</tr>'
	}
	//document.write(x)
	console.log(x)
	document.getElementById('tabla').innerHTML = tabla
*/