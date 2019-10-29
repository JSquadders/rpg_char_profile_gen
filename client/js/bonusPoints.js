let pontosAdicionais = document.querySelectorAll(".info-adicional");

pontosAdicionais.forEach(function(pontoAdicional){

    let campoAdicional = pontoAdicional.querySelector(".adicional"); 

    let botaoAdicionarAtributo = pontoAdicional.querySelector(".adicionar-atributo");

    botaoAdicionarAtributo.addEventListener("click", function(event){
        event.preventDefault();       
    
        if (campoAdicional.value == "") {
            if (pontuacaoAtributos.adicionarPontos(+1))
                campoAdicional.value = "+1";                
        }
        else if (campoAdicional.value >= 1 && campoAdicional.value <= 4) {
            if (pontuacaoAtributos.adicionarPontos(+1)){
                campoAdicional.value = parseInt(campoAdicional.value)+1;
                campoAdicional.value = "+" + campoAdicional.value;
            }                           
        }
            
        console.log(pontuacaoAtributos.getPontos());
    });
    
    // --------------------------------------------------------------------------------------------------------------
    
    let botaoRemoverAtributo = pontoAdicional.querySelector(".remover-atributo");
    
    botaoRemoverAtributo.addEventListener("click", function(event){
        event.preventDefault();       
    
        if (campoAdicional.value == 1) {
            if (pontuacaoAtributos.adicionarPontos(-1))
                campoAdicional.value = "";                
        }
        else if (campoAdicional.value > 1 && campoAdicional.value <= 5) {
            if (pontuacaoAtributos.adicionarPontos(-1)){
                campoAdicional.value = parseInt(campoAdicional.value)-1;
                campoAdicional.value = "+" + campoAdicional.value; 
            }                      
        }

        console.log(pontuacaoAtributos.getPontos());
    });   

}); 

// --------------------------------------------------------------------------------------------------------------

function verificarPontosAdicionais(idAtributo, habilitar){
    let atributoAtual = document.querySelector("#"+idAtributo);
    let pontoAdicional = atributoAtual.querySelector(".info-adicional");
    let campoPontoAdicional = pontoAdicional.querySelector(".adicional");

    if (habilitar) {
        pontoAdicional.classList.remove("invisivel");
        pontoAdicional.classList.remove("fadeOut");
        pontoAdicional.classList.add("fastFadeIn");
    }
    else {
        pontoAdicional.classList.add("fadeOut");
        pontoAdicional.classList.add("invisivel");
        pontoAdicional.classList.remove("fastFadeIn");
        if (campoPontoAdicional.value != "")
            pontuacaoAtributos.adicionarPontos(parseInt(campoPontoAdicional.value) * -1);
    }
    
    campoPontoAdicional.value = "";
}

// --------------------------------------------------------------------------------------------------------------

function esconderPontosAdicionais(){
    pontosAdicionais.forEach(function(pontoAdicional){
        pontoAdicional.classList.remove("fastFadeIn");
        pontoAdicional.classList.add("invisivel");
    });
}

