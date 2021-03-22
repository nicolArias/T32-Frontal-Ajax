
document.querySelector('#btnAll').addEventListener('click', function () {
    Consultar('v2/all',1);
});
document.querySelector('#btnNom').addEventListener('click', function () {
    var nombre = $('#nomPais').val();
    console.log(nombre);
    Consultar(`v2/name/${nombre}`,2);

});
document.querySelector('#btnxCod').addEventListener('click', function () {
    var codigo = $('#codPais').val();
    console.log(codigo);
    Consultar(`v2/alpha/${codigo}`,2);
});

document.querySelector('#btnCxCodigos').addEventListener('click', function () {
    var cod1 = $('#codPais1').val();
    var cod2 = $('#codPais2').val();
    var cod3 = $('#codPais3').val();

    Consultar(`v2/alpha?codes=${cod1};${cod2};${cod3}`,1);
});
document.querySelector('#btnCurrency').addEventListener('click', function () {
    var currency = $('#codCurrency').val();
    Consultar(`v2/currency/${currency}`);
});

document.querySelector('#btnLang').addEventListener('click', function () {
    var lang = $('#lang').val();
    Consultar(`v2/lang/${lang}`,1);
});

document.querySelector('#btnCapital').addEventListener('click', function () {
    var capital = $('#capital').val();
    Consultar(`v2/capital/${capital}`,2);
});

document.querySelector('#btnCallingC').addEventListener('click', function () {
    var callingC = $('#callingCode').val();
    Consultar(`v2/callingcode/${callingC}`,1);
});

document.querySelector('#btnRegion').addEventListener('click', function () {
    var region = $('#region').val();
    Consultar(`v2/region/${region}`,1);
});

document.querySelector('#btnRegionalB').addEventListener('click', function () {
    var regionalB = $('#regionalB').val();
    Consultar(`v2/regionalbloc/${regionalB}`,3);
});


document.querySelector('#btnAll2').addEventListener('click', function () {
    var nom2 = $('#nomPais2').val();
    var capital2 = $('#capitalPais2').val();
    var divisa2 = $('#divisaPais2').val();

    Consultar(`v2/all?fields=${nom2};${capital2};${divisa2}`,3);
});

function Consultar(valor,op) {
    let url = `https://restcountries.eu/rest/${valor}`;

    //Constante
    const api = new XMLHttpRequest();//Instanciamos el objeto
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            
            let datos = JSON.parse(this.responseText);
         

            let resultado = document.querySelector('#dataBody');
            resultado.innerHTML = '';
            let header = document.querySelector('#dataHead');
            
            let idiomas = `<select class="custom-select">`;
            
        
            if(op==1){
                for (var i=0;i<datos.length;i++) {
                    console.log(datos[i]);
                   for (var j=0;j<=datos[i].languages.lenght;j++) {
                        idiomas += `<option>${datos[i].languages[j].name}</option>`;
                        console.log(datos[i].languages[j]);
                    }
                    header.innerHTML = `<tr>
                    <th scope="col">Codigo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Capital</th>
                    <th scope="col">Area</th>
                    <th scope="col">Region</th>
                    <th scope="col">Lenguajes</th>
                    </tr>`;
                   // console.log(datos);
                    resultado.innerHTML += `<tr>` +
                        `<td>${datos[i].alpha3Code}</td>` +
                        `<td>${datos[i].name}</td>` +
                        `<td>${datos[i].capital}</td>` +
                        `<td>${datos[i].area}</td>` +
                        `<td>${datos[i].region}</td>` +
                        `<td>${idiomas}</select></td>` +
                        `</tr>`

                    idiomas = `<select class="custom-select">`;
                }
            }else if(op==2){
               
                    //console.log("Lenguaje  "+datos[i].languages[j].name);
                    idiomas += `<option>${datos[0].languages[0].name}</option>`;
                    console.log(datos[0].languages[0]);
                    header.innerHTML = `<tr>
                    <th scope="col">Codigo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Capital</th>
                    <th scope="col">Area</th>
                    <th scope="col">Region</th>
                    <th scope="col">Lenguajes</th>
                    </tr>`;

               // console.log(datos);
                resultado.innerHTML += `<tr>` +
                    `<td>${datos[0].alpha3Code}</td>` +
                    `<td>${datos[0].name}</td>` +
                    `<td>${datos[0].capital}</td>` +
                    `<td>${datos[0].area}</td>` +
                    `<td>${datos[0].region}</td>` +
                    `<td>${idiomas}</select></td>` +
                    `</tr>`

                idiomas = `<select class="custom-select">`;
            }else if(op==3){
                for (var i=0;i<datos.length;i++) {
                    header.innerHTML = `<tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Capital</th>
                    <th scope="col">Divisa</th>
                    </tr>`;

                   // console.log(datos);
                    resultado.innerHTML += `<tr>` +
                        `<td>${datos[i].name}</td>` +
                        `<td>${datos[i].capital}</td>` +
                        `<td>${datos[i].currencies[0].name}</td>` +
                        `</tr>`

                    idiomas = `<select class="custom-select">`;
                }
            }
               
             
        }
    }



}

