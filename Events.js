
  var MousePos;
  function MouseClick(e)
  {
    Debug.Trace("Mouse Click");
	//MousePos = getMousePosition(e);
  }
  
  var MousePressed = false;
  
  function MouseDown(e)
  {
    MousePressed = true;
	  MousePos = getMousePosition(e);
    //Debug.Trace("Mouse Down");
  }
  
  function MouseUp(e)
  {
    MousePressed = false;
    //Debug.Trace("Mouse Up");
  }
  
  function MouseMove(e)
  {
	//  Debug.Trace("Mouse Move");
    if(MousePressed)
    {
		var NewMousePos = getMousePosition(e);
		var Delta = new Point(NewMousePos.X - MousePos.X, NewMousePos.Y - MousePos.Y);
		

		//Camera_Position[0] -= Delta.X / 500;
		//Camera_Position[1] += Delta.Y / 500;
		MousePos = NewMousePos;
    }
  }
  
  function MouseOut(e)
  {
    MousePressed = false;
    Debug.Trace("Mouse Out");
  }

  function WindowResized(e)
  {
    UpdateWindowSize();
  }
  
  var KEY_1 = 49;
  var KEY_2 = 50;
  var KEY_3 = 51;
  var KEY_4 = 52;
  var KEY_5 = 53;
  var KEY_6 = 54;
  var KEY_7 = 55;
  var KEY_8 = 56;
  var KEY_9 = 57;
  
  
  var KEY_A = 65;
  var KEY_S = 83;
  var KEY_D = 68;
  var KEY_W = 87;
  var KEY_R = 82;
  var KEY_T = 84;
  
  var KEY_p = 112;
  var KEY_P = 80;
  
  var KEY_SPACEBAR    = 32;
  var KEY_LEFT_ARROW  = 37;
  var KEY_UP_ARROW    = 38;
  var KEY_RIGHT_ARROW = 39;
  var KEY_DOWN_ARROW  = 40;
  var KEY_PAGE_UP     = 33;
  var KEY_PAGE_DOWN   = 34;
 
  var KEY_LEFT_ARROW_PRESSED  = false;
  var KEY_RIGHT_ARROW_PRESSED = false;

  var KEY_SPACE_Pressed = false;

  
  ///////////////////////////////////////////////////////////////////
  // KeyDown
  //
  // Listen for Keyboard events
  ///////////////////////////////////////////////////////////////////
  function KeyDown(e)
  {
    e = e ? e : ((window.event) ? event : null);
    if(e) 
    {
      var Unicode = e.charCode? e.charCode : e.keyCode;
      //Debug.Trace("Key = " + Unicode);
      
      switch(Unicode) 
      {	  
          case KEY_SPACEBAR:
              KEY_SPACE_Pressed = true;
              break;
		      case KEY_A :
              MainPlayer.mLeft = true;              
              break;    
          case KEY_W :
              MainPlayer.mForward = true;              
              break;    
          case KEY_D :
              MainPlayer.mRight = true;
              break;    
          case KEY_S :
              MainPlayer.mBackward = true;
              break;    
          case KEY_T :
              if(GameState == GAME_STATE.PLAYING)
                RestartTurn();
              break;    
          case KEY_R :
              if(GameState == GAME_STATE.PLAYING)
                EndTurn();
              break;    
          case KEY_LEFT_ARROW :
              MainPlayer.rLeft = true;              
              break;    
          case KEY_UP_ARROW :
              MainPlayer.rUp = true;              
              break;    
          case KEY_RIGHT_ARROW :
              MainPlayer.rRight = true;
              break;    
          case KEY_DOWN_ARROW :
              MainPlayer.rDown = true;
              break; 
			  
		 case KEY_PAGE_UP :
              MainPlayer.pos[1] += 2;
			  MainPlayer.lookat[1] += 2;
              break;
			  
		 case KEY_PAGE_DOWN :
              MainPlayer.pos[1] += -2;
			  MainPlayer.lookat[1] -= 2;
              break;
       }
    }
  }


  ///////////////////////////////////////////////////////////////////
  // KeyUp
  //
  // Listen for Keyboard events
  ///////////////////////////////////////////////////////////////////
  function KeyUp(e)
  {
    e = e ? e : ((window.event) ? event : null);
    if(e) 
    {
      var Unicode = e.charCode? e.charCode : e.keyCode;
      //Debug.Trace("Key = " + Unicode);
      
      switch(Unicode ) 
      {
        case KEY_SPACEBAR:
              KEY_SPACE_Pressed = false;
              break;
        case KEY_A :
              MainPlayer.mLeft = false;              
              break;    
          case KEY_W :
              MainPlayer.mForward = false;              
              break;    
          case KEY_D :
              MainPlayer.mRight = false;
              break;    
          case KEY_S :
              MainPlayer.mBackward = false;
              break;    
          case KEY_LEFT_ARROW :
              MainPlayer.rLeft = false;              
              break;    
          case KEY_UP_ARROW :
              MainPlayer.rUp = false;              
              break;    
          case KEY_RIGHT_ARROW :
              MainPlayer.rRight = false;
              break;    
          case KEY_DOWN_ARROW :
              MainPlayer.rDown = false;
              break;    
       }
    }
  }

  ///////////////////////////////////////////////////////////////////
  // KeyPress
  //
  // Listen for Keyboard events
  ///////////////////////////////////////////////////////////////////
  var step = 0.1;
  function KeyPress(e)
  {
    e = e ? e : ((window.event) ? event : null);
    if(e) 
    {
      var Unicode = e.charCode? e.charCode : e.keyCode;
      //Debug.Trace("Key = " + Unicode);
      
      switch(Unicode) 
      {
        case KEY_1 :
              SetDebugState(!DEBUG);             
              break;    
		case KEY_p :
		case KEY_p :
			if(GameState == GAME_STATE.PLAYING)
				SetGameState_Paused();
			else if(GameState == GAME_STATE.PAUSED)
				SetGameState_Playing();
		  break;
		  
		case KEY_SPACEBAR :
			if(GameState == GAME_STATE.BEAT_LEVEL || 
				GameState == GAME_STATE.START)
			{
				SetGameState_Playing();
			}
			break;
		  case KEY_2:
			SpherePos[2] -= step;
		  break;
		 case KEY_4:
			SpherePos[0] -= step;
		  break;
		  case KEY_6:
			SpherePos[0] += step;
		  break;
		  case KEY_8:
			SpherePos[2] += step;
		  break;
		  case KEY_7:
			SpherePos[1] -= step;
		  break;
		  case KEY_9:
			SpherePos[1] += step;
		  break;
       }
    }
  }

  ///////////////////////////////////////////////////////////////////
  // MouseWheel
  //
  // Listen for Mouse events
  ///////////////////////////////////////////////////////////////////
  function MouseWheel(e)
  {
	var Delta = 0;
	if (!e) 
		e = window.event;
	
	if (e.wheelDelta) 
	{
		Delta = e.wheelDelta/120;
		if (window.opera) 
			delta = -delta;
	} 
	else if(e.detail) 
	{
			Delta = -e.detail/3;
	}

	
	if(!isNaN(Delta))
	{
		// Move toward the lookat 
		var Direction = vec3.create();
		vec3.subtract(Camera_LookAt, Camera_Position, Direction)
	    vec3.normalize(Direction);
		var Offset = vec3.create();
		vec3.scale(Direction, Delta, Offset)
		vec3.add(Camera_Position, Offset, Camera_Position);
		
		
		// place the lookat exactly one unit ahead of the camera
		vec3.add(Camera_Position, Direction, Camera_LookAt)
	}
  }
