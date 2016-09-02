var country = null;

function getJson() {
    let url = `http://192.168.0.100:9000/country-medals.json`;
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

document.querySelector('#pesquisar').addEventListener('click', search, false);
function search(event) {
    event.preventDefault();
    var buscaValue = document.querySelector("#buscador").value;
    var re = new RegExp("brasil", "gi");
    console.log(buscaValue);
    console.log(re);
    country.forEach(function(cty, cont = 1) {
        var str = `${cty.name}`;
        //console.log("cty: " + str);
        if (str.match(re) !== null) {
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
        }
    });
    return false;
}

getJson();