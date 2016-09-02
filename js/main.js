var country = null;

function getJson() {
    let url = `http://10.0.55.145:9000/country-medals.json`;
    makeRequest({
        url: url,
        sucessfulCallback: (response) => {
            //console.log(response);
            country = JSON.parse(response);
            //console.log(country[0]['pokemons'][] );
            country.forEach(function(cty, cont = 1) {
                //document.querySelector('#tbl-ranking-tbody').innerHTML += `
                var newRow = `<tr>
                                    <td class="text-center">${cont+1}</td>
                                    <td>${cty.name}</td>
                                    <td class="text-center">${cty.abr}</td>
                                    <td class="text-center"><img class="flag" src="img/flags/${cty.abr}.png"</td>
                                    <td class="text-center">${cty.gold}</td>
                                    <td class="text-center">${cty.silver}</td>
                                    <td class="text-center">${cty.bronze}</td>
                                    <td class="text-center ">${cty.total}</td>
                                </tr>`;
                $('#tbl-ranking-tbody').append(newRow);
                cont += 1;
            });
        }
    });
};

function makeRequest({
    method = 'get',
    url = '/',
    data = null,
    sucessfulCallback = () => {},
    errorCallback = () => {},
    headers = null // [["Content-Type", "application/json"],...]
}){
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {
            sucessfulCallback(xhr.responseText);
        } else {
            errorCallback();
        }
    }
    if(headers){
        headers.forEach((header) => xhr.setRequestHeader(...header));
    }
    xhr.open(method, url, true);
    xhr.send(data);
}

// var busca = document.querySelector("#buscador");
// function search() {
//     let buscaValue = busca.value;
//     pokemons.forEach(function(pk) {
//         if(/^([a-zA-Z])$/.test(buscaValue) === pk.name) {
//             document.querySelector('#dados').innerHTML += `
//                     <div class="row">
//                         <div class="col-sm-6 col-md-4">
//                             <div class="thumbnail">
//                                 <img src="http://localhost:9000/${pk.img}">
//                                 <div class="caption">
//                                     <h3>${pk.name}</h3>
//                                     <p>R$ ${parseFloat(pk.price).toFixed(2)}</p>
//                                     <p><a href="#" class="btn btn-primary" role="button">Comprar</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>`;
//         }
//     });
// };

//document.querySelector('#cadastrar').onclick = function(){
function search() {
    let buscaValue = document.querySelector("#buscador").value;
    console.log(buscaValue);
    country.forEach(function(cty) {
        if (cty.name.matches()) {
            var newRow = `<tr>
                    <td>${cty.name}</td>
                    <td class="text-center">${cty.abr}</td>
                    <!--<td class="text-center"></td>-->
                    <td class="text-center">${cty.gold}</td>
                    <td class="text-center">${cty.silver}</td>
                    <td class="text-center">${cty.bronze}</td>
                    <td class="text-center ">${cty.total}</td>
                </tr>`;
            $('#tbl-ranking-tbody').append(newRow);
        }
    });
};

getJson();