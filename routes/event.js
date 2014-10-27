var event = require('../models/event').event;
      
exports.index = function(req, res) {
  event.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { event: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}


exports.create = function(req, res) {
      
  var event_event_name = req.body.event_event_name; // First name of event.
  var event_venue = req.body.event_venue; // Last name of the event
  var event_date = req.body.event_date; 
  var event_imageURl = req.body.event_imageURl; 
  var event_description1 = req.body.event_description1;
  var event_description2 = req.body.event_description2;
  var event_description3 = req.body.event_description3;
  var event_enquiryContact = req.body.event_enquiryContact;
  var event_time = req.body.event_time;
  // var event_material_image = req.body.event_material_image;
  // var event_material_video = req.body.event_material_video;

// event.findOne({ date: { $regex: new RegExp(event_date, "i") } },
  event.findOne({ date: event_date },
function(err, doc) { // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newevent = new event();
      
      newevent.event_name = event_event_name;
      newevent.venue = event_venue;
      newevent.date = event_date;
      newevent.imageURl = event_imageURl;
      newevent.time = event_time;
      newevent.description1 = event_description1;
      newevent.description2 = event_description2;
      newevent.description3 = event_description3;
      newevent.enquiryContact = event_enquiryContact;
      
      // newevent.material.image = event_material_image;
      // newevent.material.video = event_material_video;

      newevent.save(function(err) {
      
        if(!err) {
          res.json(201, {message: "event created with date : " +
newevent.date });
        } else {
          res.json(500, {message: "Could not create event. Error: " + err});
        }
      
      });
      
    } else if(!err) {
      
      // event is trying to create a event with a name that
      // already exists.
      res.json(403, {message: "event with that date already exists, please update instead of create or create a new event with a different email address."});
      
    } else {
      res.json(500, { message: err});
    }
  });
      
}





exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the event the event you want to look up.
  
  event.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading event." + err});
    } else {
      res.json(404, { message: "event not found."});
    }
  });
} 



exports.delete = function(req, res) {
      
  var id = req.body.id;
  event.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Workout removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find Event."});
    } else {
      res.json(403, {message: "Could not delete Event. " + err});
    }
  });
}



// exports.delete = function(req, res) {
      
//   var id = req.body.id;
//   event.findById(id, function(err, doc) {
//     if(!err && doc) {
//       doc.remove();
//       var newevent = new event();
//        //newevent.remove( { "_id ": id }, 1 );
//       newevent.remove({ _id : id});
//       console.log(newevent.remove({ _id : id}));
//      // newevent.removeById(id);

//       //db.inventory.remove( { type : "food" }, 1 )
//       res.json(200, { message: "event removed."});
//     } else if(!err) {
//       res.json(404, { message: "Could not find event."});
//     } else {
//       res.json(403, {message: "Could not delete event. " + err});
//     }
//   });
// }


exports.update = function(req, res) {
  
  var id = req.body.id;

  var event_event_name = req.body.event_event_name; // First name of event.
  var event_venue = req.body.event_venue; // Last name of the event
  var event_date = req.body.event_date; 
  var event_time = req.body.event_time;
  var event_material_image = req.body.event_material_image;
  var event_material_video = req.body.event_material_video;
      
  event.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.event_name = event_event_name;
        doc.venue = event_venue;
		    doc.date = event_date;
        // doc.material_image = event_material_image;
        // doc.material_video = event_material_image;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "event updated: " +
event_event_name});
          } else {
            res.json(500, {message: "Could not update event. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find event."});
      } else {
        res.json(500, { message: "Could not update event. " +
err});
      }
    });
}
