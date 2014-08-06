function Map(lengthOrJson, height) {

    assert(lengthOrJson !== undefined, "Did not specify map size");
        
    if (typeof(lengthOrJson) === "number") {
        if (height === undefined) {
            this._wallGrid = new Uint8Array(lengthOrJson * lengthOrJson);
            this._height = lengthOrJson;
        } else {
            this._wallGrid = new Uint8Array(lengthOrJson * height);
            this._height = height;
        }
        this._width = lengthOrJson;
    } else {
        this.AssignFromJson(lengthOrJson);
    }
}

Map.prototype.AssignFromJson = function(json) {
    this._wallGrid = new Uint8Array(json[0].length * json.length);
    this._width = json[0].length;
    this._height = json.length;
    for (var y = 0; y < this._width; y++) {
        for (var x = 0; x < this._height; x++) {
            this._Assign(x, y, json[x][y]);
        }
    }
};

Map.prototype.Randomize = function(json) {
    for (var i = 0; i < this._wallGrid.length; i++) {
        this._wallGrid[i] = (Math.random() > 0.6) ? 1 : 0;
    }
};

Map.prototype.HasWallAt = function(x,y) {
    if (this._CoordsOutOfRange(x, y)) { // If the element is outside the map, it's treated as wall
        return true;
    }
    return this._ElementAt(x, y) > 0;
};

Map.prototype.GetWidth = function() {
    return this._width;
};

Map.prototype.GetHeight = function() {
    return this._height; 
};

Map.prototype._ElementAt = function(x,y) {
    return this._wallGrid[y * this._width + x];
};

Map.prototype._Assign= function(x, y, value) {
    this._wallGrid[y * this._width + x] = value;
};

Map.prototype._CoordsOutOfRange = function(x, y) {
    return (x > this._width - 1 || x < 0 || y > this._height - 1 || y < 0);
};
