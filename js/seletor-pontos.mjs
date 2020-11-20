import {placarPontosDisponiveis} from './placar-pontos.mjs';

class SeletorPontos extends HTMLElement{
    constructor() {
        super();

        this._pontos = 0;
        this._limitePontosExtras = 0;

        this.attachShadow({mode: 'open'}); 
    }

    _definirFuncionalidadeCheckbox(){
        this.shadowRoot.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                let pontuacaoIncremento;
                let listaCheckboxAtualSelecionados = checkbox.parentNode.querySelectorAll("input[type='checkbox']:checked");
                let pontuacaoAtual = listaCheckboxAtualSelecionados.length + (checkbox.checked ? - 1 : 1);
        
                //Verifica a nova pontuação que será atribuída
                if (!checkbox.checked && checkbox.value == pontuacaoAtual)
                    pontuacaoIncremento = - 1;
                else
                    pontuacaoIncremento = checkbox.value - pontuacaoAtual;
        
                let pontuacaoNova = pontuacaoAtual + pontuacaoIncremento;
                
                //Se a nova pontuação for válida, preenche os pontos na página
                if (placarPontosDisponiveis.adicionarPontos(pontuacaoIncremento)){
                    this._pontos = pontuacaoNova;    

                    let listaCheckboxAtual = checkbox.parentNode.querySelectorAll("input[type='checkbox']");
                    listaCheckboxAtual.forEach(checkbox => checkbox.checked = (checkbox.value <= pontuacaoNova));
    
                    let pontoAdicional = checkbox.parentNode.querySelector(".info-adicional");
                    let campoPontoAdicional = pontoAdicional.querySelector(".adicional");
                
                    if (pontuacaoNova == listaCheckboxAtual.length) {
                        pontoAdicional.classList.remove("invisivel", "fadeOut");
                        pontoAdicional.classList.add("fastFadeIn");
                    }
                    else {
                        pontoAdicional.classList.add("fadeOut", "invisivel");
                        pontoAdicional.classList.remove("fastFadeIn");
                        if (campoPontoAdicional.value != "")
                            placarPontosDisponiveis.adicionarPontos(parseInt(campoPontoAdicional.value) * -1);
                    }
                    
                    campoPontoAdicional.value = "";                
                }
                else{
                    checkbox.checked = !checkbox.checked;
                }
            });             
        });      
    }

    _definirFuncionalidadeBotoesPontosExtras(){
        this.shadowRoot.querySelectorAll(".info-adicional").forEach(pontoAdicional => {
            let campoAdicional = pontoAdicional.querySelector(".adicional"); 
    
            let botaoAdicionarAtributo = pontoAdicional.querySelector(".adicionar-atributo");
        
            botaoAdicionarAtributo.addEventListener("click", event => {
                event.preventDefault();       
            
                if (campoAdicional.value == "") {
                    if (placarPontosDisponiveis.adicionarPontos(+1)){
                        this._pontos++;
                        campoAdicional.value = "+1";
                    }
                                      
                }
                else if (campoAdicional.value >= 1 && campoAdicional.value <= this._limitePontosExtras-1) {
                    if (placarPontosDisponiveis.adicionarPontos(+1)){
                        this._pontos++;
                        campoAdicional.value = parseInt(campoAdicional.value)+1;
                        campoAdicional.value = "+" + campoAdicional.value;
                    }                           
                }
            });
            
            let botaoRemoverAtributo = pontoAdicional.querySelector(".remover-atributo");
            
            botaoRemoverAtributo.addEventListener("click", event => {
                event.preventDefault();       
            
                if (campoAdicional.value == 1) {
                    if (placarPontosDisponiveis.adicionarPontos(-1)){
                        this._pontos--;
                        campoAdicional.value = ""; 
                    }                   
                }
                else if (campoAdicional.value > 1 && campoAdicional.value <= this._limitePontosExtras) {
                    if (placarPontosDisponiveis.adicionarPontos(-1)){
                        this._pontos--;
                        campoAdicional.value = parseInt(campoAdicional.value)-1;
                        campoAdicional.value = "+" + campoAdicional.value; 
                    }                      
                }
            });             
        }); 
    }

    _definirFuncionalidadeComponentes(){
        this._definirFuncionalidadeCheckbox();

        this._definirFuncionalidadeBotoesPontosExtras();
    }

    _gerarListaDeCheckbox(nomeDoAtributo, quantidade){
        let listaDeCheckBox = '';
        for (let contador = 1; contador <= quantidade; contador++) {
            listaDeCheckBox += `
                <input type="checkbox" name="${nomeDoAtributo}" value="${contador}" ${this._pontos >= contador ? 'checked':''} />
            `;
        }
        return listaDeCheckBox;
    }

    _renderizar(){
        this.shadowRoot.innerHTML = '';

        const atributo = this.getAttribute('atributo');
        const titulo = this.getAttribute('titulo');
        const maxPontos = this.getAttribute('max-pontos');
        this._limitePontosExtras = this.getAttribute('max-pontos-extras');

        const divInfoCategoria = document.createElement('div');

        divInfoCategoria.setAttribute('id', atributo);
        divInfoCategoria.setAttribute('class', 'info-categoria');

        divInfoCategoria.innerHTML = `
            <label for="${atributo}">${titulo}</label>
            ${this._gerarListaDeCheckbox(atributo, maxPontos)}
            <div class="info-adicional invisivel fadeOut">
                <button class="botao remover-atributo">-</button>
                <input type="text" name="${atributo + "adicional"}" placeholder="+0" class="campo-redondo adicional" readonly/>
                <button class="botao adicionar-atributo">+</button>
            </div>        
        `;

        const estilo = document.createElement('style');

        estilo.textContent = `@import "css/index.css";`;

        this.shadowRoot.append(estilo, divInfoCategoria);

        this._definirFuncionalidadeComponentes();
    }

    connectedCallback() {
        this._renderizar();
    }

    attributeChangedCallback(nome, antigoValor, novoValor) {
        // console.log(nome, antigoValor, novoValor);

        // this._renderizar();
    }

    static get observedAttributes() { return ['atributo', 'titulo', 'max-pontos', 'max-pontos-extras']; }

    reiniciarPontuacao(){
        this._pontos = 0;
        this._renderizar();    
    }

    // A fazer: atribuição na propriedade pontos deve gerar mudanças necessárias no componente gráfico
    // set pontos(novoValor){
    //     this._pontos = novoValor;
    // }

    get pontos(){
        return this._pontos;
    }
}

export function criarComponenteSeletorDePontos(){
    customElements.define('seletor-pontos', SeletorPontos);
}