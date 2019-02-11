import{Injectable} from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class GameService {

  winningCombos: string[] = [
    "100100100",
    "010010010",
    "001001001",
    "111000000",
    "000111000",
    "000000111",
    "100010001",
    "001010100"
  ]

  playerOneToken: string = "";
  playerTwoToken: string = "";

  turn: string = "";

  gameOutcome: {
    player: string,
    condition: string
  };

  gameBoard: string[] = [];

  playCount: number = 0;

  scoreBoard: {
    player1: number,
    player2: number,
    tie: number,
  };

  constructor(){}

  initGame(){
    this.initGameBoard();
    this.resetGameOutcome();
    this.resetScore();
    return this.gameBoard;
  }

  initGameBoard(){
    for (let i = 0; i < 9; i++) {
        this.gameBoard[i] = '*';
    }
  }
  updateBoard(){
    return this.gameBoard;
  }
  resetGameBoard(){
    this.initGameBoard();
    return this.gameBoard;
  }
  initTurn(){
      this.turn="player1";
  }
  getTurn(){
    return this.turn;
  }
  resetTurn(){
    // this.turn = "";
    this.resetGameOutcome();
    this.playCount = 0;
  }
  getScore(){
    return this.scoreBoard;
  }
  resetScore(){
    this.scoreBoard = {player1: 0, player2: 0, tie: 0};
  }
  getGameOutcome(){
    return this.gameOutcome;
  }
  resetGameOutcome(){
    this.gameOutcome = {
      player: "",
      condition: ""
    }
  }

  checkGameState(gameArray: string[], playerOneToken: string, playerTwoToken: string){
    const token1 = '1';
    const token2 = '0';

    let checkedArrayStringPlayer1 = "";
    let checkedArrayStringPlayer2 = "";

    for (let i = 0; i < gameArray.length; i++) {
        if(gameArray[i]===playerOneToken){
          checkedArrayStringPlayer1 += token1;
        }
        if(gameArray[i]===playerTwoToken){
          checkedArrayStringPlayer1 += token2;
        }
        if(gameArray[i]!==playerOneToken && gameArray[i]!==playerTwoToken){
          checkedArrayStringPlayer1 += token2;
        }
    }
    // console.log("Player 1 String: ", checkedArrayStringPlayer1);
    // console.log("Player 1 String as Int ", parseInt(checkedArrayStringPlayer1, 2))

    for (let i = 0; i < gameArray.length; i++) {
        if(gameArray[i]===playerTwoToken){
          checkedArrayStringPlayer2 += token1;
        }
        if(gameArray[i]===playerOneToken){
          checkedArrayStringPlayer2 += token2;
        }
        if(gameArray[i]!==playerOneToken && gameArray[i]!==playerTwoToken){
          checkedArrayStringPlayer2 += token2;
        }
    }
    // console.log("Player 2 String: ", checkedArrayStringPlayer2);

    for (let i = 0; i < this.winningCombos.length; i++) {
      let checkedArrayIntPlayer1 = parseInt(checkedArrayStringPlayer1, 2);
      let checkedArrayIntPlayer2 = parseInt(checkedArrayStringPlayer2, 2);
      let winningComboInt = parseInt(this.winningCombos[i], 2);

      if((checkedArrayIntPlayer1 & winningComboInt) === winningComboInt)
      {
        this.scoreBoard.player1++;
        this.gameOutcome = {player: "Player 1", condition: "win"};
      }
      if ((checkedArrayIntPlayer2 & winningComboInt) === winningComboInt) {
        this.scoreBoard.player2++
        this.gameOutcome = {player: "Player 2", condition: "win"};
      }
    }
    if(this.playCount === 9 && this.gameOutcome.player === ""){
      this.scoreBoard.tie++;
      this.gameOutcome = {player: "", condition: "tie"};
    }
  }

  placeToken(index: number, token1: string, token2: string){
    if(this.turn === "") {
      console.log("Please Press Start to Begin!");
      return;
    }
    else if (this.turn === "player1" && this.gameBoard[index] !== token1 && this.gameBoard[index] !== token2){
      this.gameBoard[index]=token1;
      this.turn="player2";
      this.playCount++;
    }
    else if (this.turn === "player2" && this.gameBoard[index] != token1 && this.gameBoard[index] != token2){
      this.gameBoard[index]=token2;
      this.turn = "player1";
      this.playCount++;
    }
  }
}
