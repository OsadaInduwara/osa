var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgentModelSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'User field is required!']
    },

    created_date: {
        type: Date,
        default: Date.now
    }
});

const Agent = mongoose.model('Agent', AgentModelSchema);
module.exports = { Agent }