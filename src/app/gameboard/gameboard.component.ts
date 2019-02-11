import { Component, OnInit, DoCheck} from '@angular/core';
import {GameService} from './game.service';
// import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit, DoCheck {

  playerOneToken: string;
  playerTwoToken: string;

  gameBoard: string[] = [];

  playing: boolean = false;

  changeTile: boolean = false;

  warning: boolean = false;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameBoard = [...this.gameService.initGame()];
  }

  startGame(){
    this.gameService.initTurn();
    this.playing = true;
    // this.checkPlayerTokens();
  }
  restartGame(){
    this.gameBoard = [...this.gameService.initGame()];
    this.gameService.resetTurn();
    this.gameService.resetScore();
    this.playerOneToken = "";
    this.playerTwoToken = "";
    this.playing = false;
    this.warning = false;
  }
  replayGame(){
    this.gameBoard = [...this.gameService.resetGameBoard()];
    this.gameService.resetTurn();
    // this.gameService.initTurn();
  }
  placeToken(index: number, token1: string, token2: string){
    this.gameService.placeToken(index, token1, token2);
    this.gameBoard = [...this.gameService.updateBoard()];
    this.gameService.checkGameState(this.gameBoard, token1, token2);
  }
  placeTokenPreview(index: number, change: boolean){
    let tempGameBoard = [...this.gameService.updateBoard()];

    if(this.gameService.getGameOutcome().condition){
      return;
    }

    if(change && this.playing){
      // console.log(change);
      // console.log(index);
      if (this.gameService.getTurn()==="player1" && this.gameService.updateBoard()[index]==='*') {
          tempGameBoard[index]=this.playerOneToken;
          this.gameBoard = [...tempGameBoard];
      }
      if (this.gameService.getTurn()==="player2" && this.gameService.updateBoard()[index]==='*') {
          tempGameBoard[index]=this.playerTwoToken;
          this.gameBoard = [...tempGameBoard];
      }
    }
    if(!change && this.playing){
      // console.log(change);
      // console.log(index);
      this.gameBoard = [...this.gameService.updateBoard()];
    }
  }
  checkPlayerTokens(){
    if(this.playerOneToken === this.playerTwoToken ){
      this.warning = true;
    }
    else {
      this.warning = false;
    }
  }
  ngDoCheck(){
    if(this.playerOneToken && this.playerTwoToken)
      this.checkPlayerTokens();
  }
}
