
const AlphaChallengeModule = (() => {
    const exports = {};

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const ENDPOINT = "https://alphaapi2.azurewebsites.net/api/scores?code=Qw7J9s4pjDi-ktVSBuVKsjGajh6FQxvonj-CMJzIUBCpAzFui2BVfw==";

    let boardElm = null;
    let scoreElm = null;
    let highScoresElm = null;
    let letters = [];
    let index = 0;
    let startTime = null;
    let scoreFormElm = null;
    let latestScore = null;
    let bottomHighScore = 9999999; // must be less than this score to submit
    exports.Init = () => {
        boardElm = document.getElementById('letters');
        scoreElm = document.getElementById('score');
        scoreFormElm = document.getElementById('score-form');
        highScoresElm = document.getElementById('highscore-list');
        generateNewGame();
        document.onkeydown = handleKeyDown;
        scoreFormElm.onsubmit = handleScoreSubmit;

        updateHighScores();
    }


    const updateHighScores = () =>{
        highScoresElm.innerHTML = '';

        fetch(ENDPOINT)
        .then((res)=>res.json())
        .then((scores)=>{
            if(scores.length>=5){
                bottomHighScore = scores[0].score;
            }
            scores.forEach((hs)=>{
                var elm = document.createElement('li');
                elm.innerHTML = `${hs.user}....${hs.score}ms`;
                highScoresElm.append(elm);
                // set bottom highest score to highest score loaded in
                bottomHighScore = Math.max(bottomHighScore, hs.score);
            });
        })
        
    }

    const generateNewGame = () => {
        boardElm.innerHTML = '';
        letters = [];
        index = 0;
        clearScore();
        alphabet.forEach((letter) => {
            var elm = document.createElement('mark');
            elm.textContent = letter;
            boardElm.append(elm);
            letters.push(elm);
        });
        latestScore = null;
        console.log('created new game');
        window.scroll({top:0});
        scoreFormElm.classList.add('hidden');
    }

    const handleKeyDown = (kbEvt) => {
        if (kbEvt.repeat || !kbEvt.isTrusted) {
            return;
        }
        if (kbEvt.keyCode === 32) {
            generateNewGame();
            boardElm.focus();
            kbEvt.preventDefault();
            return;
        }


        // if user has entered next expected character advance index forward
        if (kbEvt.key === alphabet[index]) {
            if (index === 0) {
                // game starting
                startTime = performance.now();
            }

            letters[index].classList.add('complete');
            letters[index].classList.remove('next');

            index++;

            // game complete
            if (index >= alphabet.length) {
                const time = performance.now() - startTime;
                

                setScore(time);
                
                // if better than worst score on score board allow user to submit 
                if(time < bottomHighScore){
                    showScoreForm();
                }
                return;
            }

            letters[index].classList.add('next');
        }
        // if user has double types previous key just ignore
        if (index === 0 || kbEvt.key === alphabet[index - 1]) {
            return;
        }

        boardElm.innerHTML = 'GAME OVER';
    }

    const setScore = (time)=>{
        scoreElm.textContent = `${time.toFixed(2)}ms`;
        latestScore = time;
        highScoresElm.scrollIntoView({behavior:'smooth', block:'end'});
    }

    const clearScore = ()=>{
        scoreElm.textContent = '';
    }

    const showScoreForm = ()=>{
        scoreFormElm.classList.remove('hidden');
    }


    const handleScoreSubmit =  async (evt) =>{
        evt.preventDefault();

        const user = document.getElementById('user').value;
        const score = latestScore;
        if(!user || !score){
            return;
        }

        const body = JSON.stringify({user, score});
        

        fetch(ENDPOINT,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body
        }).then(()=>{
            document.location.href = "";
        })

        return false;

    }

    return exports;
})();

window.onload = AlphaChallengeModule.Init;