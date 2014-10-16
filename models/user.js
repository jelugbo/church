var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var userSchema = new Schema({
   
    email_address : { type: String, required: true, trim: true,
index: { unique: true } }
	, first_name : { type: String, required: true }
  , last_name : { type: String, required: true }
  // , email_address : { type: String, required: true }
  , password : { type: String, required: true }
  , phone_number : { type: String, required: false }
  ,image: {type:[String]}
  , date_created : { type: Date, required: true, default: Date.now
}
});
      
var user = mongoose.model('user', userSchema);
      
module.exports = {
  user: user
};