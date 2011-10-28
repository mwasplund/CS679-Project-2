/******************************************************/
/* enum GameState
/*
/* an enumeration of all the game states
/******************************************************/
var GAME_STATE = 
{
  LOADING : 0,
  START   : 1,
  PLAYING : 2,
  PAUSED  : 3
}; 


function SetGameState_Playing()
{
  // Hide any menues that were in use
  Debug.Trace("Play Game");
  if(GameState == GAME_STATE.START)
  {
	$("#Menu_Start").hide("slow");
  }
  else if(GameState == GAME_STATE.PAUSED)
  {
	$("#Menu_Paused").slideUp("slow");
  }
  else if(GameState == GAME_STATE.LOADING)
  {
	$("#Menu_Loading").hide();
  }
  
  // Set the current state
  GameState = GAME_STATE.PLAYING;
}

function SetGameState_Paused()
{
  // Hide any menues that were in use
  Debug.Trace("Pause Game");
  if(GameState == GAME_STATE.START)
  {
	$("#Menu_Start").hide("slow");
  }
  else if(GameState == GAME_STATE.LOADING)
  {
	$("#Menu_Loading").hide();
  }
  
  // Set the current state
  GameState = GAME_STATE.PAUSED;
  // Show the Menu
  $("#Menu_Paused").slideDown("slow");
}

function SetGameState_Start()
{
  // Hide any menues that were in use
  Debug.Trace("Start Game");
  if(GameState == GAME_STATE.PAUSED)
  {
	$("#Menu_Paused").slideUp("slow");
  }
  else if(GameState == GAME_STATE.LOADING)
  {
	$("#Menu_Loading").hide();
  }
  
  // Set the current state
  GameState = GAME_STATE.START;
  // Show the Menu
  $("#Menu_Start").show("slow");
}

function SetDebugState(i_Value)
{
  if(DEBUG != i_Value)
  {
	  DEBUG = i_Value;
	  if(DEBUG)
	  {
		 $("#Menu_Debug").slideDown("slow");
	  }
	  else
	  {
		$("#Menu_Debug").slideUp("slow");
	  }
  }
}
