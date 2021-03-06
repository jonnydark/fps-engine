function InputManager() {
    // members
    this._mouseXPosition = screen.width/2;
    this._mouseYPosition = screen.height/2;
    this._mouseXMovement = 0;
    this._mouseYMovement = 0;
    this._upIsPressed    = false;
    this._downIsPressed  = false;
    this._leftIsPressed  = false;
    this._rightIsPressed = false;

    // binds
    document.addEventListener('keydown'  , this.OnKeyEvent.bind(this)  , false);
    document.addEventListener('keyup'    , this.OnKeyEvent.bind(this)  , false);

    this._OnMouseMoveImpl = this._UnlockedOnMouseMove;
    document.addEventListener('mousemove', this.OnMouseMove.bind(this), false);
    document.addEventListener('pointerlockchange', this.OnPointerLockChange.bind(this), false);
    document.addEventListener('webkitpointerlockchange', this.OnPointerLockChange.bind(this), false);
    document.addEventListener('mozpointerlockchange', this.OnPointerLockChange.bind(this), false); // Frakin' vendor prefixes
}

InputManager.prototype.GetInput = function() {
    var input = {
            mouseDX : this._mouseXMovement,
            mouseDY : this._mouseYMovement,
            up      : this._upIsPressed,
            left    : this._leftIsPressed,
            right   : this._rightIsPressed,
            down    : this._downIsPressed
    };

    this._mouseXMovement = 0;
    this._mouseYMovement = 0;
    return input;
};

InputManager.prototype.OnMouseMove = function(event) {
    this._OnMouseMoveImpl(event);
};

InputManager.prototype._UnlockedOnMouseMove = function(event) {
   this._mouseXMovement = (event.clientX - this._mouseXPosition)/window.innerWidth;
   this._mouseYMovement = (event.clientY - this._mouseYPosition)/window.innerHeight;

   this._mouseXPosition = event.clientX;
   this._mouseYPosition = event.clientY;
};

InputManager.prototype._LockedOnMouseMove = function(event) {
    var dX =  event.movementX       ||
              event.mozMovementX    ||
              event.webkitMovementX ||
              0;


    var dY = event.movementY       ||
             event.mozMovementY    ||
             event.webkitMovementY ||
             0;

    this._mouseXMovement = dX/window.innerWidth;
    this._mouseYMovement = dY/window.innerHeight;
};


InputManager.prototype.OnPointerLockChange = function(event) {
    if (document.pointerLockElement       !== null ||
        document.mozPointerLockElement    !== null ||
        document.webkitPointerLockElement !== null) {
        this._OnMouseMoveImpl = this._LockedOnMouseMove;
    } else {
        this._OnMouseMoveImpl = this._UnlockedOnMouseMove;
    }
};

InputManager.prototype.OnKeyEvent = function(event) {
    var isPressed = event.type == 'keydown';

    // TODO - Map other key presses to custom events
    switch (event.keyCode) {
        case 87: // W
            this._upIsPressed = isPressed;
            break;
        case 65: // A
            this._leftIsPressed = isPressed;
            break;
        case 83: // S
            this._downIsPressed = isPressed;
            break;
        case 68: // D
            this._rightIsPressed = isPressed;
            break;
        default:
            break;
    }

};
