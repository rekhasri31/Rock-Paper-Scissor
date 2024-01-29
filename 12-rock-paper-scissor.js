let score = JSON.parse(localStorage.getItem('score')) || 
        {
            wins:0,
            losses:0,
            ties:0
        };

       UpdateScoreElement();

        if (!score){
            score={
                wins:0,
                losses:0,
                ties:0
            };
        }

        let isAutoplaying=false;
        let intervalId;
        function autoplay(){
            if(!isAutoplaying){
                let intervalID=setInterval(function(){
                    const playerMove=pickComputerMove();
                    playgame(playerMove);
                },1000);
            }
            else{
                clearInterval(intervalId);
                isAutoplaying=false;
            }
        }

        document.body.addEventListener('keydown',(event) => {
            if(event.key ==='r'){
                playgame('rock');
            }
            else if(event.key ==='p'){
                playgame('paper');
            }
            else if(event.key ==='s'){
                playgame('scissors');
            }
        })
        function playgame(playerMove){
            const computerMove=pickComputerMove();
            let result='';
            if (playerMove === 'scissors'){
                if (computerMove === 'rock'){
                result='You lose.';
                }
                else if(computerMove === 'paper'){
                    result='You win.';
                }
                else if(computerMove === 'scissor'){
                    result='Tie.';
                }
            }
            else if(playerMove === 'paper'){
                if (computerMove ==='rock'){
                result='You win.';
                }
                else if(computerMove === 'paper'){
                    result='Tie.';
                }
                else if(computerMove === 'scissor'){
                    result='You lose.';
                }
            }
            else if(playerMove === 'rock'){
                if (computerMove === 'rock'){
                result='Tie.';
                }
                else if(computerMove === 'paper'){
                    result='You lose.';
                }
                else if(computerMove === 'scissor'){
                    result='You win.';
                }
            }

            if(result === 'You win.'){
                score.wins += 1;
            }
            else if(result === 'You lose.'){
                score.losses += 1;
            }
            else if(result === 'Tie.'){
                score.ties += 1;
            }

            localStorage.setItem('score',JSON.stringify(score));
            
           UpdateScoreElement();

           document.querySelector('.js-result').innerHTML=result;

           document.querySelector('.js-moves').innerHTML=`You
            <img src="images/${playerMove}.png" class="move-icon">
            <img src="images/${computerMove}.png" class="move-icon">
            Computer`;
        }
        
        function UpdateScoreElement(){
            document.querySelector('.js-score')
            .innerHTML= `Wins:${score.wins},Losses:${score.losses},Ties:${score.ties}`;

        }

        function pickComputerMove(){
            const randomNumber=Math.random();

            let computerMove='';

            if (randomNumber >=0 && randomNumber < 1/3)
            {
                computerMove='rock';
            }
            else if(randomNumber >=1/3 && randomNumber < 2/3)
            {
                computerMove='paper';
            }
            else if(randomNumber >=2/3 && randomNumber < 1)
            {
                computerMove='scissor';
            } 
            return computerMove;
        }