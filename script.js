const PlayerGenerator=(id,symbol)=>{
    return{
        id,symbol
    }
}






const gameCellsDOM=[...document.querySelectorAll('.game-cell')];
const resetButtonDOM=document.getElementById("reset-button");
const playerOneDisplayDOM=document.getElementById("player-one-display");
const playerTwoDisplayDOM=document.getElementById("player-two-display");
const winnerDisplay=document.getElementById("winner-display")

const PLAYER_ONE_WIN_STRING="🎉 Player 1 won the round 🎉"
const PLAYER_TWO_WIN_STRING="🎉 Player 2 won the round 🎉"
const DRAW_STRING="Its a Draw!!"

resetButtonDOM.addEventListener("click",()=>{
    Game.resetState();
    gameCellsDOM.forEach((item)=>{
        item.innerHTML="&nbsp;";
        item.classList.remove("bg-dark");
        item.classList.add("bg-light");
        item.classList.remove("bg-danger");
        item.classList.remove("bg-primary");
        item.classList.add("text-light")
    })
    playerOneDisplayDOM.classList.add("bg-dark","text-light");
    playerTwoDisplayDOM.classList.remove("bg-dark","text-light");
    winnerDisplay.innerHTML="&nbsp;";;
})

gameCellsDOM.forEach((item,idx)=>{
    item.addEventListener("mouseover",()=>{
        item.classList.remove("bg-light");

        if(item.textContent=="X"||item.textContent=="0"){
            
            item.classList.remove("bg-dark");
            item.classList.remove("bg-light");
            
        }else{
            item.classList.remove("bg-light");
            item.classList.add("bg-dark");
        }
        
    })
    item.addEventListener("mouseleave",()=>{
        console.log(item.textContent=="X");
        if(item.textContent=="X"||item.textContent=="0"){
            item.classList.remove("bg-dark");
            item.classList.remove("bg-light");
            
            
        }else {
            item.classList.add("bg-light");
            item.classList.remove("bg-dark");
        }
        
    })
    item.addEventListener("click",()=>{
        //TODO:
        Game.setGameState(idx);
        item.textContent=Game.getGameState()[idx];
        item.classList.remove("bg-dark");
        item.classList.remove("bg-light");
        if(item.textContent=="X"){
            console.log(item.textContent);
            item.classList.add("bg-danger");
        }
        else if(item.textContent=="0")
        item.classList.add("bg-primary")

        item.classList.add("text-light")

    })
})


const Game=(
    function () {

        let gameArray=new Array(9);
        const PlayerOne=PlayerGenerator("PlayerOne","X");
        const PlayerTwo=PlayerGenerator("PlayerTwo","0");
        let CurrentPlayer=PlayerOne;
        let WinningPlayer;
        let isDrawn=false;
        gameArray.fill(" ");

        const getGameState=()=>{
            console.log(gameArray);
            return gameArray;
        }
        const setGameState=(index)=>{
            if(gameArray[index]==" "){
                gameArray[index]=CurrentPlayer.symbol;
                _switchTurns(); 
                _checkState();
            }
        }
        const resetState=()=>{
            isDrawn=false;
            CurrentPlayer=PlayerOne;
            gameArray.fill(" ");
        }
        const _switchTurns=()=>{
            if(CurrentPlayer===PlayerOne){
                CurrentPlayer=PlayerTwo;
            }else {
                CurrentPlayer=PlayerOne;
            }

            ///--------------

            if(CurrentPlayer===PlayerOne){
                playerOneDisplayDOM.classList.add("bg-dark","text-light");
                playerTwoDisplayDOM.classList.remove("bg-dark","text-light");
            }else if(CurrentPlayer===PlayerTwo){
                playerOneDisplayDOM.classList.remove("bg-dark","text-light");
                playerTwoDisplayDOM.classList.add("bg-dark","text-light");
            }

            ///------------


        }
        const _checkState=()=>{
            if(_checkThree(1,2,3)||_checkThree(4,5,6)||_checkThree(7,8,9)||_checkThree(1,5,9)||_checkThree(1,4,7)||_checkThree(2,5,8)||_checkThree(3,6,9)||_checkThree(3,5,7)){
                //-------------
                playerOneDisplayDOM.classList.add("bg-dark","text-light");
                playerTwoDisplayDOM.classList.remove("bg-dark","text-light");
                //-------------
                return;
            }
            const currentState=gameArray.filter(item=>item==" ");
            if(currentState.length==0){
                //-----------
                winnerDisplay.textContent=DRAW_STRING;
                //-----------
                isDrawn=true;
            }
        }
        const _checkThree=(a,b,c)=>{
            a=gameArray[a-1];
            b=gameArray[b-1];
            c=gameArray[c-1];

            if(a==b&&b==c&&(a=="X"||a=="0")){
                if(a=="X"){
                    WinningPlayer=PlayerOne;
                    gameArray.fill("X");
                    gameCellsDOM.forEach((item)=>{
                        item.textContent="X";
                        item.classList.remove("bg-dark");
                        item.classList.remove("bg-light");
                        item.classList.add("bg-danger");
                        item.classList.remove("bg-primary");
                        item.classList.add("text-light")
                    })
                    winnerDisplay.textContent=PLAYER_ONE_WIN_STRING;
                }else {
                    WinningPlayer=PlayerTwo;
                    gameArray.fill("0");
                    gameCellsDOM.forEach((item)=>{
                        item.textContent="0";
                        item.classList.remove("bg-dark");
                        item.classList.remove("bg-light");
                        item.classList.remove("bg-danger");
                        item.classList.add("bg-primary");
                        item.classList.add("text-light")
                    })
                    winnerDisplay.textContent=PLAYER_TWO_WIN_STRING;
                }
                return true;
            }
            return false;
        }

        return{
            setGameState,getGameState,resetState
        }
    }
)();
