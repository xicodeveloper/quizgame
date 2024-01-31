var mongoose = require("mongoose");
const passportLocalMoongose =require("passport-local-mongoose");
var userSchema = mongoose.Schema({
  username: {type:String, unique:true}, // add a username field
  mail: {type:String, unique:true},
  total_score:{type:Number, default: 0},
  total_score_Sports:{type:Number, default: 0},
  total_score_History:{type:Number, default: 0},
  total_score_Science:{type:Number, default: 0},
  total_score_Geography:{type:Number, default: 0},
  total_score_Art:{type:Number, default: 0},
  total_score_Mix:{type:Number, default: 0},
  perguntas_vistas_Sports:{type:Number, default: 0},
  perguntas_vistas_History:{type:Number, default: 0},
  perguntas_vistas_Science:{type:Number, default: 0},
  perguntas_vistas_Geography:{type:Number, default: 0},
  perguntas_vistas_Art:{type:Number, default: 0},
  perguntas_vistas_Mix:{type:Number, default: 0},
  password: {type:String},
  bio:{type:String},
  imagem:{type:String},
  name:{type:String},
  friend: [
    {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    }
],
friend_room: [{ type: String }],
});
userSchema.plugin(passportLocalMoongose);
module.exports= mongoose.model('User', userSchema);


