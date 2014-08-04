// Monkey Patch Number.toFixed to return a number rather
// than a string.
// This should possibly be in another file...
Number.prototype.toFixed = function(places) {
    var powerOfTen = Math.pow(10, places);
    var ans = this * powerOfTen;
    ans = Math.round(ans);
    ans /= powerOfTen;
    return ans;
};

const FORWARDS  =  1;
const BACKWARDS = -1;
const LEFT      = -1;
const RIGHT     =  1;

const FULL_CIRCLE = 2*Math.PI;

function Pose(x, y, angle) {
    return { X : x, Y : y, Angle : angle };
}


function Player() {
    this._pose        = Pose(0, 0, 0);
    this._speed       = 1;
    this._sensitivity = 1;
}

// Public:
Player.prototype.WithSpeed = function(speed)  {
    this._speed = speed;
    return this;
};

Player.prototype.WithPose = function(x, y, angle) {
    this._pose = Pose(x, y, angle);
    return this;
};

Player.prototype.HandleInput = function(input, frameTime) {

    this._Rotate(input.mouseDX);

    if (input.up) {
        this._Walk(FORWARDS, frameTime);
    } else if (input.down) {
        this._Walk(BACKWARDS, frameTime);
    }

    if (input.left) {
        this._Strafe(LEFT, frameTime);
    } else if (input.right) {
        this._Strafe(RIGHT, frameTime);
    }
};

Player.prototype.SetSensitivity = function(newSensitivity) {
   this._sensitivity = newSensitivity; 
};

Player.prototype.GetPose = function() {
    return this._pose;
};


// Private:
Player.prototype._Walk = function(direction, frameTime) {
    var dx = direction * Math.sin(this._pose.Angle) * this._speed * frameTime;
    var dy = direction * Math.cos(this._pose.Angle) * this._speed * frameTime;
    this._pose.X = (this._pose.X + dx).toFixed(2);
    this._pose.Y = (this._pose.Y + dy).toFixed(2);
};

Player.prototype._Strafe = function(direction, frameTime) {
    var dx = direction * Math.sin(this._pose.Angle + Math.PI/2) * this._speed * frameTime;
    var dy = direction * Math.cos(this._pose.Angle + Math.PI/2) * this._speed * frameTime;
    this._pose.X = (this._pose.X + dx).toFixed(2);
    this._pose.Y = (this._pose.Y + dy).toFixed(2);
};

Player.prototype._Rotate = function(mouseDX) {
    var dA = mouseDX * FULL_CIRCLE * this._sensitivity;
    this._pose.Angle += dA;
};