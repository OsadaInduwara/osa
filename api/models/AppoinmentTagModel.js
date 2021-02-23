var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppoinmentTagModelSchema = new Schema({
    tag: {
        type: String,
        required: [true, 'Tag field is required!']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const AppoinmentTag = mongoose.model('AppoinmentTag', AppoinmentTagModelSchema);
module.exports = { AppoinmentTag }