import {esconderPontosAdicionais} from './bonusPoints.mjs';
import {abrirSanfona, fecharSanfona, mostrarPerfil, esconderPerfil} from './accordion.mjs';

function validaForm(pontuacaoAtributos, formulario){
    let temErros = false;

    temErros = !(pontuacaoAtributos.verificarPontosUtilizados());

    let nome = formulario.nome;
    if (nome.value == "") {
        temErros = true;
        nome.classList.add("pontuacaoInvalida"); 
    }

    let sexo = formulario.sexo;
    if (sexo.value == "") {
        temErros = true;
        sexo.classList.add("pontuacaoInvalida");  
    }
    
    let nascimento = formulario.nascimento;
    if (nascimento.value == "") {
        temErros = true;
        nascimento.classList.add("pontuacaoInvalida");   
    }
    
    let comportamento = formulario.comportamento;
    if (comportamento.value == "") {
        temErros = true;
        comportamento.classList.add("pontuacaoInvalida");   
    }
    
    let indole = formulario.indole;
    if (indole.value == "") {
        temErros = true;
        indole.classList.add("pontuacaoInvalida");  
    }
    
    let hobby = formulario.hobby;
    if (hobby.value == "") {
        temErros = true;
        hobby.classList.add("pontuacaoInvalida"); 
    }

    return !temErros;
}

function montaForm(formulario){
    let data = {};
    console.log(formulario)
    for (let i = 0; i < formulario.length; ++i) {
        let input = formulario[i];
        let pontos = document.querySelectorAll("[name='"+input.name+"']");
        if (pontos.length > 1) {
            let qntPontos = 0;
            pontos.forEach(function(ponto){
                if (ponto.checked)
                    qntPontos++;          
            });
            data[input.name] = qntPontos;            
        }
        else
        {
            if(!isNaN(input.value) && input.value) {
                data[input.name] = parseInt(input.value);                     
            }                            
            else {
                data[input.name] = input.value;
            }                
        }
    }
    console.log('form_data', data)
    return data;
};

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function enviaForm(method, action, data){
    fetch(action, {
        headers: {'Content-type' : 'application/json',
                  'X-CSRFToken': getCookie('csrftoken')},
        method: method,
        credentials: 'same-origin',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(personagem => {
        console.log(personagem)
        abrirSanfona();
        document.querySelector("audio").play();
        setTimeout(() => mostrarPerfil(personagem["imagem"], personagem["perfil"]), 4750);        
    }); 
}

export function prepararEnvioDoFormulario(formulario, botaoEnviaFormulario, pontuacaoAtributos) {
    for (let i = 0; i < formulario.length; ++i) {
        formulario[i].addEventListener("change",function(){
            this.classList.remove("pontuacaoInvalida");
        });
    }
    
    formulario.onsubmit = function (event){
        event.preventDefault();
    
        if (validaForm(pontuacaoAtributos, this)) {
            let dadosForm = montaForm(this);
            console.log(dadosForm);
            enviaForm(this.method, this.action, dadosForm);
            botaoEnviaFormulario.disabled = true;
        }  
    };
}

export function prepararLimpezaDoFormulario(formulario, botaoEnviaFormulario, pontuacaoAtributos) {
    let botaoLimpaForm = document.querySelector("#limpaForm");

    botaoLimpaForm.addEventListener("click",function(event){
        event.preventDefault(); 
    
        formulario.reset();
    
        for (let i = 0; i < formulario.length; ++i) {
            formulario[i].classList.remove("pontuacaoInvalida");
        }
    
        esconderPontosAdicionais(); 
    
        pontuacaoAtributos.reiniciarPontuacao();
    
        fecharSanfona();
    
        esconderPerfil();    
        
        botaoEnviaFormulario.disabled = false;
    });
}