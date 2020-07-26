const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You need to provide a username!',
            trim: true
        },
        email: {
            type: String,
            required: 'You need to provide an email address!',
            unique: true,
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed'
            }
        },
        thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
            }
        ],
        friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// create the User model using the UserSchema
const User = model('User', UserSchema);

//Mongoose email validation 
const user = new User();

user.email = 'test@test.co';
user.validate().catch(error => {
    assert.ok(error);
    assert.equal(error.errors['email'].message, 'Email validation failed');
});

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

// export the User model
module.exports = User;