var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	 img: { data: Buffer, contentType: String },
	 text: String,
	 author: String
});    

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports.Photo = Photo;