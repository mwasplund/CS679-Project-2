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
  BEAT_LEVEL : 3,
  PAUSED  : 4
}; 

function SetGameState_Beat_Level()
{
  // Hide any menues that were in use
  Debug.Trace("Beat Level");
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
  GameState = GAME_STATE.BEAT_LEVEL;
  // Show the Menu
  $("#Menu_Beat_Level").slideDown("slow");
  GoToLevel(CurrentLevel.Number+1);
}

function GoToLevel(i_LevelNumber)
{
	CurrentLevel = new Level(i_LevelNumber);
	$("#SelectLevel").val(i_LevelNumber);
	recordings = new Array();
	turn = 0;
	 clones = new Array();
	recordings[0] = new Record();
	ResetLevel();
}

function SetGameState_Playing()
{
  // Hide any menues that were in use
  Debug.Trace("Play Game");
  if(GameState == GAME_STATE.START)
  {
	  $("#Menu_Start").hide("slow");
	  ResetLevel();
  }
  else if(GameState == GAME_STATE.PAUSED)
  {
	  $("#Menu_Paused").slideUp("slow");
  }
  else if(GameState == GAME_STATE.LOADING)
  {
  	$("#Menu_Loading").hide();
  }
  else if(GameState == GAME_STATE.BEAT_LEVEL)
  {
  	$("#Menu_Beat_Level").slideUp();
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
