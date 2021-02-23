var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceTagModelSchema = new Schema({
    tag: {
        type: String,
        required: [true, 'Tag field is required!']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const ServiceTag = mongoose.model('ServiceTag', ServiceTagModelSchema);
module.exports = { ServiceTag }