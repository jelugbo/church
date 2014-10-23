var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var eventSchema = new Schema({
   
  event_name: {type:String, required:true}
  ,venue: {type: String , required:true}
  ,date: {type:Date , required:true}
  ,imageURl: {type:String , required: false }
  ,videoURL: {type:String, required:false}
  ,description1: {type: String, required:false}
  ,description2: {type: String, required:false}
  ,description3: {type: String, required:false}
  ,enquiryContact : {type: String, required:false}
});
      
var event = mongoose.model('event', eventSchema);
      
module.exports = {

  event: event
};