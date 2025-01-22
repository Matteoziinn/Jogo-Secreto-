let listaNumerosSorteados = [];
let numeroLimites = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if('speechSynthesis' in window){
        let fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 0.5;
        window.speechSynthesis.speak(fala);
    } else {
        console.log('Não foi possível falar!');
    }
}

function exibirMensagem(){
    exibirTexto('h1', 'Jogo Do Número Secreto');
    exibirTexto('p', 'Tente adivinhar o número secreto entre 1 e 100.');
}

exibirMensagem();

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

function limparCampo(){
    document.querySelector('input').value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagem();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}