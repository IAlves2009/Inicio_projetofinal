const url_cad = "https://bora-14220-default-rtdb.firebaseio.com/";

const cargo ='user'
let cpf_usado=document.getElementById("cpf_usado")

btn_cadastro.addEventListener('click',e=>{
    let usuario={
        'cargo':cargo,
        'nome':(nome.value).toUpperCase(),
        'cpf':cpf.value,
        'email':(email.value).toUpperCase(),
        'nick':(nick.value).toUpperCase(),
        'nome':nome.value,
        'nasci_data':nasci_dta.value,
        'senha':senha.value
    }


fetch(url_cad+'user.json')
.then(resposta =>resposta.json())
.then(dados =>{
    for (const key in dados) {
        if(dados[key].cpf == usuario.cpf){
           alertando(cpf_usado)
        }if(dados[key].nick == usuario.nick){
            alertando(NIck_usado)
        }if(dados[key].email == usuario.email){
            alertando(email_usado)
        }else{
            if(senha.value != senha_comfirma.value){
                alertando(senha_nãobate)
            }if(email.value != email_comfirma.value){
                alertando(email_nãobate)
            }else{
                fetch(url_cad+'user.json',{method:'POST',body:JSON.stringify(usuario)})
                window.location.href="http://127.0.0.1:5500/ht/Cocecta.html";
            }
        }

    }
})

})

function alertando(n){
    n.classList.remove('esconde');
            setTimeout(()=>{
            n.classList.add('esconde')
            },4000)
}