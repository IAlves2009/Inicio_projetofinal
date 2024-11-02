const url_cad = "https://bora-14220-default-rtdb.firebaseio.com/";
const id_usuario = localStorage.getItem("chave");

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


let crotole = "";

fetch(url_cad+'user/'+id_usuario+'.json')
.then(resposta => resposta.json())
.then(dados =>{
    usuarionome.innerHTML = dados.nome;
})

try{
  mapear_predios()
}catch(err){
 console.log('0mapas')
}

offpg.addEventListener('click',e=>{
  localStorage.clear();
  window.location.href="http://127.0.0.1:5500/ht/Cocecta.html";
})

adiciona_predio.addEventListener('click', e=>{
  fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
  .then(resposta => resposta.json())
  .then(dados =>{

    predio ={
      'nome':nome.value,
      'tipo':tipo.value,
      'descricao':descricao.value,
      'casa_nu':casa_nu.value,
      'cep':cep.value,
      'rua':dados.logradouro,
      'bairro':dados.bairro,
      'clicks':0
    }
    if(crotole ==""){
    fetch(url_cad+'user/'+id_usuario+'/predio.json',{method:'POST',body:JSON.stringify(predio)})
    mapear_predios()
  }else{
    fetch(url_cad+'user/'+id_usuario+'/predio/'+crotole+'.json',{
      method: 'PUT', body: JSON.stringify(predio)})
      mapear_predios()
      crotole="";
  }

})

})
  
function mapear_predios(){
  mapas.innerHTML ="";
  fetch(url_cad+'user/'+id_usuario+'/predio.json')
  .then(resposta => resposta.json())
  .then(dados =>{
    for (const key in dados) {

      mapas.innerHTML += ` <div class="card" style="width: 18rem;">
                    <img src="${dados[key].foto}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${dados[key].nome}</h5>
                      <p class="card-text">${dados[key].descricao}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">${dados[key].tipo}</li>
                      <li class="list-group-item">${dados[key].cep}</li>
                    </ul>
                    <div class="card-body">
                        <button type="button" class="btn btn-danger" onclick="deleta('${key}')">deletar</button>
                      <button type="button" class="btn btn-warning" onclick="muda('${key}')">alterar</button>
                    </div>
                  </div>`
    }

  })

}

function deleta(n) {
    fetch(url_cad+'user/'+id_usuario+'/predio/' + n + '.json', { method: "DELETE" })
    .then(resposta=>resposta.json())    
    .then(dados=>(
      mapear_predios()
        )
        )

}

function muda(n){
  fetch(url_cad+'user/'+id_usuario+'/predio/' + n + '.json')
    .then(resposta=>resposta.json())    
    .then(dados=>{
      nome.value=dados.nome
      tipo.value=dados.tipo
      descricao.value=dados.descricao
      casa_nu.value=dados.casa_nu
      cep.value=dados.cep
      crotole = n
      document.getElementById('formulario').click();
    }
      )
}


drawChart()

function drawChart() {
  var grafi_predios =[]
  fetch(url_cad+'user/'+id_usuario+'/predio.json')
  .then(resposta => resposta.json())
  .then(dados =>{
    for (const key in dados) {
      grafi_predios.push([dados[key].nome ,dados[key].clicks ])
    }
    
  })

  var data = google.visualization.arrayToDataTable([
    grafi_predios
  ]);
  
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');



  var options = {
    title: 'visitas pelo app'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}