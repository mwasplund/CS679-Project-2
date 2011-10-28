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
  // Hide any menues that were in use
  if(GameState == GAME_STATE.START)
  {
	$("#Menu_Start").hide("slow");
  }
  else if(GameState == GAME_STATE.PAUSED)
  {
	$("#Menu_Paused").slideUp("slow");
  }
  
  // Set the current state
  GameState = GAME_STATE.PLAYING;
}

function SetGameState_Paused()
{
  // Hide any menues that were in use
  if(GameState == GAME_STATE.START)
  {
	$("#Menu_Start").hide("slow");
  }

  // Set the current state
  GameState = GAME_STATE.PAUSED;
  // Show the Menu
  $("#Menu_Paused").slideDown("slow");
}

function SetGameState_Start()
{
  // Hide any menues that were in use
  if(GameState == GAME_STATE.PAUSED)
  {
	$("#Menu_Paused").slideUp("slow");
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
