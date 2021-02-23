var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { AppoinmentTag } = require("./AppoinmentTagModel");

var AppoinmentModelSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required!']
    },
    description: {
        type: String,
        required: [true, 'Description field is required!']
    },
    
    appoinment_tag: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: AppoinmentTag,
        required: [true, 'AppoinmentTag field is required!']
    },

    created_date: {
        type: Date,
        default: Date.now
    }
});

AppoinmentModelSchema.index({
    title: 'text',
    description: 'text',
}, {
    weights: {
        title: 5,
        description: 10,
    },
});

const Appoinment = mongoose.model('Appoinment', AppoinmentModelSchema);
module.exports = { Appoinment }