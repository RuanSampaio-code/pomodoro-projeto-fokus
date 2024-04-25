//Documento HTML
const html = document.querySelector('html')

//Botoes individuais
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')

//imagem
const banner = document.querySelector('.app__image')

//titulo
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')

//botao de ativar musica
const musicaFocoInput = document.querySelector('#alternar-musica')

//Play e Pause
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon") 

//elemento de temporizador da tel
const tempoNaTela = document.querySelector('#timer')

//Sons
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

//repetindo musica
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

//adicionando evento de ligar a musica
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }else{
        musica.pause();
    }
})

//eventos para adicionar class para mudar imagem - Modo Foco
focoBt.addEventListener('click', () => {

    //cada 'tela' um tempo diferente de estado
    tempoDecorridoEmSegundos = 1500

    //chama função para alterar o contexto
    alterarContexto('foco')

    //ativa o contexo corrente
    focoBt.classList.add('active')
})

//eventos para adicionar class para mudar imagem - Modo descanso curto
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})


//função que alterar o contexto do estado das 3 situações: modo foco, descanso curto e descanso longo
function alterarContexto(contexto) {
    mostrarTempo()

    //percorre os elementos e remove a class que nao participan do contexo corrente
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })

    //seta atributos em data-attribute e imagem do contexto corrente
    html.setAttribute('data-contexto',  contexto );
    banner.setAttribute('src',`/imagens/${contexto}.png`);

    //Modificaçao em textos de cada contexto
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = ` Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            
            titulo.innerHTML = `Que tal dar uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;     
        
        case 'descanso-longo':
            
            titulo.innerHTML = `Hora de voltar a superfície. <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;     
    
        default:
            break;
    }

}

//----------------------------- Logica do temporizador -------------------------------//

const contagemRegressiva = () => {
    
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo() 

/* 
dia 8 
3 min
individual
pppt

dia 6 link portifolio */
