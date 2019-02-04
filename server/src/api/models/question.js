const mongoose = require('mongoose')

var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

questionShema= mongoose.Schema({
    _id         : { type: ObjectIdSchema, default: function () { return new ObjectId()} },
    QuestionName: { type: String, required: true },
    Status      : { type: Boolean },
    Items       : [{
                    _id:   {type:ObjectIdSchema, default: function () { return new ObjectId()} }, 
                    subItemName: { type: String },   
                    additionalSubItem:[{
                                        _id:   {type:ObjectIdSchema, default: function () { return new ObjectId()} }, 
                                        additionalSubItemName: { type: String },
                                        type: { type: String },
                                        value: { type: String } 

                                      }]
                  }], 
})

module.exports = mongoose.model('Question', questionShema);


