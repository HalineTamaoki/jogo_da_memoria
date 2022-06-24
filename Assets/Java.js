//declaracoes pra o jogo //
const cartas = document.querySelectorAll('.carta');
let cartaVirada = false
let carta1, carta2 = ""
let lockBoard=false
let imagensViradas = 0

//declaracoes pra o cronometro//
let seg = 0
let min = 0
let cron;
let recorde=0
let primeiraCartaCron = false //cronometro ativa só com a primeira carta do jogo


//inicia o cronometro//
if (primeiraCartaCron){
cartas.forEach(card => card.addEventListener('click',virarCarta))
}

else {
    cron=setInterval(()=>{cronometro();console.log(seg)},1000)
    cartas.forEach(card => card.addEventListener('click',virarCarta))
}

//Ativa os botoes//
function virarCarta(){
    if (lockBoard) return
    this.classList.toggle('virar')

    if(!cartaVirada){
        carta1 = this
        cartaVirada=true
        carta1.removeEventListener('click',virarCarta)
        return;
    }

    carta2=this
    lockBoard =true
    cartasIguais()

//Reseta o jogo quando todas as cartas estão viradas//
    if (imagensViradas === 8) {
        novoJogo()
    }
}

//Verifica se as cartas são iguais//
function cartasIguais(){
    if(carta1.dataset.framework ===carta2.dataset.framework){
        desativarCartas()
        imagensViradas = imagensViradas + 1
        return;
    }

    desvirarCartas()
}

//Se as cartas forem iguais, desativa elas para que não possam ser usadas de novo//
function desativarCartas(){
    carta1.removeEventListener('click',virarCarta)
    carta2.removeEventListener('click',virarCarta)
    reset()
}

//Se não forem iguais, volta a carta para a posição inicial//
function desvirarCartas(){
    lockBoard=true

    setTimeout(()=>{
        carta1.classList.remove('virar')
        carta1.addEventListener('click',virarCarta)
        carta2.classList.remove('virar');
        reset()
    }, 500);
}

//reseta as configurações para que uma nova rodada comece//
function reset(){
    [cartaVirada, lockBoard] = [false, false];
    [carta1, carta2] = [null, null]
}

//Finaliza o jogo e mostra o resultado e a opção de jogar de novo//
function novoJogo(){
    setTimeout(()=>{
        document.getElementsByClassName('botoes')[0].classList.add('esconder');
    },1000);
    document.getElementsByClassName('resultado')[0].classList.remove('esconder');

    //falar tempo
    clearInterval(cron);
    primeiraCartaCron=false
    let tempoFinal=(min==0?"":min)+(min==0?"":"min")+seg+"seg";
    document.getElementById('tempo-nesse-jogo').innerHTML=tempoFinal

    if(min*60+seg<recorde||recorde==0){
        recorde = min*60+seg;
        document.getElementById('tempo-recorde').innerHTML=tempoFinal
    }

    //botao jogar novamente//
    document.getElementById('button-reset').addEventListener('click',voltarInicio)
    
}

//Ao clicar em jogar de novo, volta ao tabuleiro original//
function voltarInicio(){
    cartas.forEach(card => card.classList.remove('virar'))
    imagensViradas = 0
    embaralhar();
    document.getElementsByClassName('resultado')[0].classList.add('esconder');
    document.getElementsByClassName('botoes')[0].classList.remove('esconder');
    seg=0
    min=0

    if (primeiraCartaCron){
        cartas.forEach(card => card.addEventListener('click',virarCarta))
        }
        
        else {
            cron=setInterval(()=>{cronometro();console.log(seg)},1000)
            cartas.forEach(card => card.addEventListener('click',virarCarta))
        }
}

//Embaralha as cartas para um novo jogo//
function embaralhar(){
    cartas.forEach(card =>{
        let aleatorio = Math.floor(Math.random()*16);
        card.style.order = aleatorio;        
    })
}

//Ativa o cronomêtro//
function cronometro(){
    primeiraCartaCron=true

    seg++;

    if (seg==60){
        min++;
        seg = 0
    }
}


