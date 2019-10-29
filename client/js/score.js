let campoPontuacao = document.querySelector("#pontosDisponiveis");

let avisoPontuacao = document.querySelector("#avisoPontuacao");

function mostrarAviso(textoAviso){        
  avisoPontuacao.textContent = textoAviso;        
  avisoPontuacao.classList.remove("fadeOut");
  avisoPontuacao.classList.add("fastFadeIn");
  campoPontuacao.classList.add("pontuacaoInvalida");    
};

function esconderAviso(){       
  avisoPontuacao.textContent = "";
  avisoPontuacao.classList.remove("fastFadeIn");        
  avisoPontuacao.classList.add("fadeOut");
  campoPontuacao.classList.remove("pontuacaoInvalida"); 
}

function atualizaPontosDisponiveis(pontosDisponiveis, pontuacaoValida){
    if(pontuacaoValida)
      esconderAviso();   

    if(pontosDisponiveis < 10){
      campoPontuacao.value = "0"+pontosDisponiveis;
    }else{
      campoPontuacao.value = pontosDisponiveis;
    }
}

function criarPontuacao(limite) {
    let _limite = limite;
    let _pontos = 0;
    atualizaPontosDisponiveis(limite, true);

    return {

      getLimite() {
        return _limite;
      },
      getPontos() {
        return _pontos;
      },
      verificarPontosUtilizados(){
        if(_pontos == _limite){
          return true;
        }
        else{
          mostrarAviso("* Distribua todos os pontos.");
          return false;
        }
      },
      reiniciarPontuacao() {
        _pontos = 0;
        atualizaPontosDisponiveis(_limite, true);
      },      
      adicionarPontos(pontosAdicionais) {
        let novaPontuacao = _pontos + pontosAdicionais;
        if (_limite >= novaPontuacao && novaPontuacao >= 0){
            _pontos = novaPontuacao;
            atualizaPontosDisponiveis(_limite - _pontos, true);
            return true;
        }  
        else{
            mostrarAviso("* Não há pontos suficientes para isto.");
            setTimeout(function (){ esconderAviso() }, 2000);
            return false;
        }    
      }
      
    };
}

const pontuacaoAtributos = criarPontuacao(20);