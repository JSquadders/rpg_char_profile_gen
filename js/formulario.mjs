import {placarPontosDisponiveis} from './placar-pontos.mjs';
import {abrirSanfona, fecharSanfona, mostrarPerfil, esconderPerfil} from './painel-perfil-personagem.mjs';

function validaForm(formulario){
    let temErros = false;

    temErros = !(placarPontosDisponiveis.verificarPontosUtilizados());

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
    
    [...new FormData(formulario)].forEach(([campo, valor]) => data[campo] = valor);

    document.querySelectorAll('seletor-pontos').forEach(seletorDePontos => {
        data[seletorDePontos.getAttribute('atributo')] = seletorDePontos.shadowRoot.querySelectorAll('input[type="checkbox"]:checked').length;
    });

    return data;
};

function enviaForm(method, action, data){
    fetch(action, {
        headers: {'Content-type' : 'application/json'},
        method: method,
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(personagem => {
        abrirSanfona();
        document.querySelector("audio").play();
        setTimeout(() => mostrarPerfil(personagem["imagem"], personagem["perfil"]), 4750);        
    }); 
}

export function prepararEnvioDoFormulario(formulario, botaoEnviaFormulario) {
    for (let i = 0; i < formulario.length; ++i) {
        formulario[i].addEventListener("change",function(){
            this.classList.remove("pontuacaoInvalida");
        });
    }
    
    formulario.onsubmit = function (event){
        event.preventDefault();
    
        if (validaForm(this)) {
            let dadosForm = montaForm(this);
            console.log(dadosForm);
            enviaForm(this.method, this.action, dadosForm);
            botaoEnviaFormulario.disabled = true;
        }  
    };
}

function reiniciarComponentesDePontos(){
    document.querySelectorAll('seletor-pontos').forEach(function(seletorDePontos){
        seletorDePontos.pontos = 0;
    });
}

export function prepararLimpezaDoFormulario(formulario, botaoEnviaFormulario) {
    let botaoLimpaForm = document.querySelector("#limpaForm");

    botaoLimpaForm.addEventListener("click",function(event){
        event.preventDefault(); 
    
        formulario.reset();
    
        [...formulario].forEach(elemento => elemento.classList.remove("pontuacaoInvalida"));

        reiniciarComponentesDePontos(); 
    
        placarPontosDisponiveis.reiniciarPontuacao();
    
        fecharSanfona();
    
        esconderPerfil();    
        
        botaoEnviaFormulario.disabled = false;
    });
}