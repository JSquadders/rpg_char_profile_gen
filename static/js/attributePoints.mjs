import {verificarPontosAdicionais} from './bonusPoints.mjs';

export function prepararComponentesDePontuacao(pontuacaoAtributos){
    document.querySelectorAll("input[type='checkbox']").forEach(function(checkbox){   
        checkbox.addEventListener("click", function(){
            let pontuacaoIncremento;
            let listaCheckboxAtualSelecionados = this.parentNode.querySelectorAll("input[type='checkbox']:checked");
            let pontuacaoAtual = listaCheckboxAtualSelecionados.length + (this.checked ? - 1 : 1);
    
            //Verifica a nova pontuação que será atribuída
            if (!this.checked && this.value == pontuacaoAtual)
                pontuacaoIncremento = - 1;
            else
                pontuacaoIncremento = this.value - pontuacaoAtual;
    
            let pontuacaoNova = pontuacaoAtual + pontuacaoIncremento;
            
            //Se a nova pontuação for válida, preenche os pontos na página
            if (pontuacaoAtributos.adicionarPontos(pontuacaoIncremento)){
                let listaCheckboxAtual = this.parentNode.querySelectorAll("input[type='checkbox']");
                listaCheckboxAtual.forEach(checkbox => checkbox.checked = (checkbox.value <= pontuacaoNova));
                verificarPontosAdicionais(pontuacaoAtributos, this.parentNode.id, (pontuacaoNova == listaCheckboxAtual.length));
            }
            else{
                this.checked = !this.checked;
            }
        });
    });
}