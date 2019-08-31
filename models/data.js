var mongoose = require('mongoose');
  

var schema =  mongoose.Schema( 
     
  {
    "_id": {
      "type": String
    },
    "id": {
      "type": String
    },
    "level": {
      "type": String
    },
    "status": {
      "type": String
    },
    "category": {
      "type": String
    },
    "type": {
      "type": String
    },
    "volume": {
      "type": String
    },
    "surface": {
      "type": String
    },
    "compare": {
          "typeId": { "type": String },
          "volume": {  "$numberDouble": { "type": "String" } },
          "location": { "LocationType": { "type": String },
                    "Location_point01": { "X": { "$numberDouble": { "type": "String" } },
                                          "Y": { "$numberDouble": { "type": "String" } },
                                          "Z": {  "$numberDouble": { "type": "String"  }  } },
                   "Location_point02": { "X": { "$numberDouble": { "type": "String" }  },
                                         "Y": {  "$numberDouble": {  "type": "String" } },
                                         "Z": { "$numberDouble": { "type": "Date" } } } },
          "boundingBox": { "status": { "type": "String" },
                        "BoundingBox_point01": { "X": { "$numberDouble": { "type": "String" }  },
                                               "Y": { "$numberDouble": {  "type": "String" }  }, 
                                                "Z": { "$numberDouble": { "type": "String" }  } },
                        "BoundingBox_point02": { "X": {  "$numberDouble": {  "type": "String"  } },
                                                "Y": {  "$numberDouble": { "type": "String"  } },
                                                "Z": { "$numberDouble": { "type": "String"  }  }  } },
          "centroidElement": {   "status": { "type": "String"  }, 
                              "centroid": {  "X": {  "$numberDouble": {  "type": "String"   }  },
                                             "Y": { "$numberDouble": { "type": "String"  } },
                                              "Z": { "$numberDouble": { "type": "String" } }  } } },
    "viewOrientation": {
            "UrlImage": {  "type": "ObjectId" },
            "bb_sectionBox_min": { "X": { "$numberDouble": { "type": "String" } },
                                    "Y": {  "$numberDouble": { "type": "String"  } },
                                    "Z": {  "$numberDouble": {  "type": "String" }  } },

            "bb_sectionBox_max": { "X": {  "$numberDouble": { "type": "String"  } },
                                  "Y": {"$numberDouble": { "type": "String"  } }, 
                                  "Z": { "$numberDouble": {  "type": "String" } }  },

            "eyePosition": {      "X": {  "$numberDouble": { "type": "String"  } },
                                    "Y": {"$numberDouble": { "type": "String"  } }, 
                                  "Z": { "$numberDouble": {  "type": "String" } }  },

            "forwardDirection": {
                                    "X": {  "$numberDouble": { "type": "String"  } },
                                    "Y": {"$numberDouble": { "type": "String"  } }, 
                                  "Z": { "$numberDouble": {  "type": "String" } } },

            "upDirection": {
                                    "X": {  "$numberDouble": { "type": "String"  } },
                                    "Y": {"$numberDouble": { "type": "String"  } }, 
                                    "Z": { "$numberDouble": {  "type": "String" } }    }
    },
    "comments": { "type": [ {auteur:String, comments:String,date: Date} ]
    },
    "evolutions": { "type": [ {date: Date,auteur:String, comments:String} ]
    }
  });
  module.exports = mongoose.model('Revit',schema,'Test')

 