var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ServiceTag } = require("./ServiceTagModel");

var ServiceModelSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required!']
    },
    description: {
        type: String,
        required: [true, 'Description field is required!']
    },
    image: {
        type: String
    },
    service_tag: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: ServiceTag,
        required: [true, 'ServiceTag field is required!']
    },
    price: {
        type: String,
        required: [true, 'Price field is required!']
    },
    beautician: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Agent',
        required: [true, 'Agent field is required!']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

ServiceModelSchema.index({
    title: 'text',
    description: 'text',
}, {
    weights: {
        title: 3,
        description: 5,
    },
});

const Service = mongoose.model('Service', ServiceModelSchema);
module.exports = { Service }