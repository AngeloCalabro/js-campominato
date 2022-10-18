// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

// Prendo il bottone play
const btnPlay = document.getElementById('play');
const msgFinal = document.getElementById('msg-finale');

// Funzione play
function play() {
    console.log('Inizio gioco...')

    const NUM_BOMB = 16;
    const bombsPosition = [];

    //  variabile SCORE
    let score = 0;

    const displayNoneH2 = document.querySelector('h2');
    displayNoneH2.className = 'd-none';

    let numCell;
    const fieldGame = document.getElementById('field-game');
    fieldGame.innerHTML = '';

    // seleziona livello
    const levelHtml = document.getElementById('livello');
    const level = levelHtml.value;
    switch (level) {
        case 'amator':
        default: numCell = 100;
            break;
        case 'pro': numCell = 81;
            break;
        case 'hardcore': numCell = 49;
            break;
    }

    // Numero massimo di tentativi
    const MAX_ATTEMPT = numCell - NUM_BOMB;

    // Generatore bombe
    while (bombsPosition.length < NUM_BOMB) {
        const bomb = randomNumber(1, numCell);
        if (!bombsPosition.includes(bomb)) {
            bombsPosition.push(bomb);
        }
    }
    console.log(bombsPosition)

    // funzione di ascolto durante il play
    function listenPlay() {
        const num = parseInt(this.querySelector('span').innerText);
        console.log(num)

        // Evita di ricliccare lo stesso numero
        this.removeEventListener('click', listenPlay);

        // Risposta alla scelta del quadrato
        if (!bombsPosition.includes(num)) {
            this.classList.add('green');
            console.log('Clicca un altro')

            // Punteggio di click accumulato
            score++;
            console.log(score);
            msgFinal.innerHTML = `Il tuo attuale punteggio è di : ` + score + ` <br>Continua cosi!`

            if (score === MAX_ATTEMPT) {
                msgFinal.innerHTML = `Hai vinto! Sei stato bravissimo`
                endGame();
            }
        } else {
            this.classList.add('red');
            msgFinal.innerHTML = `Hai perso! Riprova, sarai più fortunato!`
            endGame();
        }
    }

    // Funzione che genera la cella singola
    function drawCell(num) {
        const cellPerSide = Math.sqrt(numCell);
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.style.width = `calc(100% / ${cellPerSide})`;
        cell.style.heigth = `calc(100% / ${cellPerSide})`;
        cell.innerHTML = `<span>${num}</span>`;
        cell.addEventListener('click', listenPlay);
        return cell;
    }

    // funzione che genera il campo di gioco
    function drawGrid() {
        const grid = document.createElement('div');
        grid.className = 'grid';
        for (let i = 1; i <= numCell; i++) {
            const cell = drawCell(i);
            grid.appendChild(cell);
        }
        fieldGame.appendChild(grid);
    }
    // chiamare la funzione
    drawGrid();

    function endGame() {
        const squares = document.querySelectorAll('.square');
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', listenPlay);
            let num = i + 1;
            if (bombsPosition.includes(num)) {
                squares[i].classList.add('red');
            }
        }
        if (score === MAX_ATTEMPT) {
            console.log('Hai vinto!');
        } else {
            console.log('Hai perso!');
        }
    }
}
// Attacco EventListener al bottone play
btnPlay.addEventListener('click', play);