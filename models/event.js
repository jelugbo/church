var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var eventSchema = new Schema({
   
  event_name: {type:String, required:true}
  ,venue: {type: String , required:true}
  ,date: {type:Date , required:true}
  ,material:[{
              image: {type:String}
              ,video: {type:String}
            }]

});
      
var event = mongoose.model('event', eventSchema);
      
module.exports = {

  event: event
};