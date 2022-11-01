import {criarPontuacao} from './score.mjs';
import {prepararComponentesDePontuacao} from './attributePoints.mjs';
import {prepararComponentesDePontosBonus} from './bonusPoints.mjs';
import {prepararEnvioDoFormulario, prepararLimpezaDoFormulario} from './form.mjs';

let pontuacaoAtributos = criarPontuacao(20);

prepararComponentesDePontuacao(pontuacaoAtributos);

prepararComponentesDePontosBonus(pontuacaoAtributos);

let formulario = document.querySelector("#form-adiciona");

let botaoEnviaFormulario = document.querySelector("input[type='submit']");

prepararEnvioDoFormulario(formulario, botaoEnviaFormulario, pontuacaoAtributos);

prepararLimpezaDoFormulario(formulario, botaoEnviaFormulario, pontuacaoAtributos);