/******************************************************/
/* enum GameState
/*
/* an enumeration of all the game states
/******************************************************/
var GAME_STATE = 
{
  START : 0,
  PLAYING : 1,
  PAUSED : 2
}; 


function SetGameState_Playing()
{
  GameState = GAME_STATE.PLAYING;
  $("#Menu_Start").hide("slow")
}