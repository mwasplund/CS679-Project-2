
  
  function MouseClick(e)
  {
    Debug.Trace("Mouse Click");
  }
  
  var MousePressed = false;
  
  function MouseDown(e)
  {
    MousePressed = true;
    Debug.Trace("Mouse Down");
  }
  
  function MouseUp(e)
  {
    MousePressed = false;
    Debug.Trace("Mouse Up");
  }
  
  function MouseMove(e)
  {
    if(MousePressed)
    {

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
  
  
  
  var KEY_SPACEBAR    = 32;
  var KEY_LEFT_ARROW  = 37;
  var KEY_UP_ARROW    = 38;
  var KEY_RIGHT_ARROW = 39;
  var KEY_DOWN_ARROW  = 40;
 
  var KEY_LEFT_ARROW_PRESSED  = false;
  var KEY_RIGHT_ARROW_PRESSED = false;

  
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
      Debug.Trace("Key = " + Unicode);
      
      switch(Unicode) 
      {
        case KEY_SPACEBAR:
		      if(GameState == STATE_PLAYING && MainPlayer.OnGround)
			    {
            Debug.Trace("Player + width = " + MainPlayer.Position.X + MainPlayer.Width);
            Debug.Trace("Exit   = " + Level.Exit.Position.X);
            Debug.Trace("Player  = " + MainPlayer.Position.X );
            Debug.Trace("Exit + width  = " + Level.Exit.Position + Level.Exit.Width);
            if(MainPlayer.Position.X + MainPlayer.Width > Level.Exit.Position.X &&
               MainPlayer.Position.X < Level.Exit.Position.X + Level.Exit.Width)
            {
              GameState = STATE_WON;
            }
          }
			    else if(GameState == STATE_START)
			    {
			      GameState = STATE_PLAYING;
			    }
          else if(GameState == STATE_WON)
          {
            NextLevel();  
          }
          else if(GameState == STATE_DEAD)
          {
            RestartLevel();
          }
			  
		      break;
          case KEY_LEFT_ARROW :
              //Debug.Trace("left");
              //MainPlayer.Velocity.X -= 0.02;
              KEY_LEFT_ARROW_PRESSED = true;
              break;    
          case KEY_UP_ARROW :
              //Debug.Trace("up");
              if(GameState == STATE_PLAYING && MainPlayer.OnGround)
                MainPlayer.Jump();
              break;    
          case KEY_RIGHT_ARROW :
              //Debug.Trace("right");
              //MainPlayer.Velocity.X += 0.02;
              KEY_RIGHT_ARROW_PRESSED = true;
              break;    
          case KEY_DOWN_ARROW :
              //Debug.Trace("down");
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
      Debug.Trace("Key = " + Unicode);
      
      switch(Unicode ) 
      {
          case KEY_LEFT_ARROW :
              Debug.Trace("left arrow up");
              KEY_LEFT_ARROW_PRESSED = false;
              break;    
          case KEY_UP_ARROW :
              Debug.Trace("up arrow up");
              break;    
          case KEY_RIGHT_ARROW :
              Debug.Trace("right arrow up");
              KEY_RIGHT_ARROW_PRESSED = false;
              break;    
          case KEY_DOWN_ARROW :
              Debug.Trace("down arrow up");
              break;    
       }
    }
  }
