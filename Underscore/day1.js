(function() {
  var root = this;
  var previousUnderscore = root._;
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FunProto = Function.prototype;
  var push                = ArrayProto.push,
      slice               = ArrayProto.slice,
      toString            = ObjProto.toString,
      hasOwnProperty      = ObjProto.hasOwnProperty;
      // All es5
  var nativeIsArray       = Array.isArray,
      nativeKeys          = Object.keys,
      nativeBind          = FunProto.bind,
      nativeCreate        = Object.create;
      // constructor
  var Ctor = function(){};

  var _ = function(obj) {
    if(obj instanceof _) return obj;
    if(!(this.instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

})(this)
