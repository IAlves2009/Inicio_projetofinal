const url_card = "https://bora-14220-default-rtdb.firebaseio.com/user";

var map = L.map('map').setView([-23.621701, -45.411322], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



function marca_local(lo,la,chave){
    L.marker([la,lo]).addTo(map).bindPopup(`<button onclick="adiciona('${chave}' >Visitar</button>`).openPopup();
}

//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var popup = L.popup()
    .setLatLng([-23.621701, -45.411322])
    .setContent("I am a standalone popup.")
    .openOn(map);

    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }
    
    map.on('click', onMapClick);

    var popup = L.popup();


    
    map.on('click', onMapClick);

fetch(url_card+".json").then(resposta => resposta.json())
.then(dados =>{
    for (const key in dados) {
       for (const key2 in dados[key].predio) {

        let predio = dados[key].predio[key2]

        console.log("predio aqui",predio)
        

        let achar_loc = predio.bairro+" "+predio.rua+" "+predio.casa_nu;
        console.log(dados[key].predio.bairro)
        geocodeAddress(achar_loc)
       }
    }
})

async function geocodeAddress(N) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(N)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            let { lat, lon } = data[0];
            marca_local(lon,lat)
            return { latitude: lat, longitude: lon };
        } else {
            console.error('Endereço não encontrado.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}