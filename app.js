/**
 * Lista de números sorteados anteriormente.
 * @type {number[]}
 */
let listaNumerosSorteados = [];

/**
 * Limite máximo para o número secreto.
 * @type {number}
 */
let numeroLimites = 100;

/**
 * Número secreto gerado aleatoriamente.
 * @type {number}
 */
let numeroSecreto = gerarNumeroAleatorio();

/**
 * Contador de tentativas do usuário.
 * @type {number}
 */
let tentativas = 1;

/**
 * Exibe um texto em um elemento HTML e utiliza a síntese de fala para narrar o texto.
 * @param {string} tag - Seletor do elemento HTML onde o texto será exibido.
 * @param {string} texto - Texto a ser exibido e narrado.
 */
function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if('speechSynthesis' in window){
        let fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 2.0;
        window.speechSynthesis.speak(fala);
    } else {
        console.log('Não foi possível falar!');
    }
}

/**
 * Exibe a mensagem inicial do jogo.
 */
function exibirMensagem(){
    exibirTexto('h1', 'Jogo Do Número Secreto');
    exibirTexto('p', 'Tente adivinhar o número secreto entre 1 e 100.');
}
exibirMensagem();

/**
 * Verifica o chute do usuário e exibe a mensagem correspondente.
 */
function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentetivas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;  
        exibirTexto('p', mensagemTentetivas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('h1', 'O número secreto é menor!');
        } else {
            exibirTexto('h1', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

/**
 * Gera um número aleatório entre 1 e o limite definido e verifica se já foi sorteado anteriormente.
 * @returns {number} - Número aleatório gerado.
 */
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimites + 1);
    let quantidadeDeElementosaNaLista = listaNumerosSorteados.length;
    if(quantidadeDeElementosaNaLista == numeroLimites){
        listaNumerosSorteados = [];
    }
    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

/**
 * Limpa o campo de input.
 */
function limparCampo(){
    document.querySelector('input').value = '';
}

/**
 * Reinicia o jogo, gerando um novo número secreto e resetando as tentativas.
 */
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagem();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
