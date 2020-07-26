const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            // 280 character maximum
            maxlength: 280 
        },
        username: {
            type: String,
            required: 'You need to provide a username!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);
const ThoughtSchema = new Schema(
    {
            thoughtText: {
            type: String,
            required: true,
            // between 1 and 280 characters
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: 'You need to provide a username!'
        },
        // use ReactionSchema to validate data for a reaction
        reactions: [reactionSchema]
    }, 
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
// get total count of replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;