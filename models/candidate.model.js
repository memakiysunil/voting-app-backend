const mongoose = require('mongoose');
const candidatSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    party:{
        type: String,
        required: true
    },

    age:{
        type: Number,
        required: true,
        min: [25, "Candidate must be at least 25 years old"],
        max: [65, "Candidate age cannot exceed 65 years"]
    },

    votes: [
        {
            user: {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },

            votedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    voteCount: {
        type: Number,
        default: 0
    },
 
});



const Candidate = mongoose.model('Candidate', candidatSchema);
module.exports = Candidate;