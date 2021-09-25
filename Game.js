////THIS FILE IS NOT UNDER USE IT is just to give a overview how how you can use a moudle for tictactoe game
const PlayerGenerator=(id,symbol)=>{
    return{
        id,symbol
    }
}


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
        }
        const _checkState=()=>{
            if(_checkThree(1,2,3)||_checkThree(4,5,6)||_checkThree(7,8,9)||_checkThree(1,5,9)||_checkThree(1,4,7)||_checkThree(2,5,8)||_checkThree(3,6,9)||_checkThree(3,5,7)){
                return;
            }
            const currentState=gameArray.filter(item=>item==" ");
            if(currentState.length==0){
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
                }else {
                    WinningPlayer=PlayerTwo;
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

