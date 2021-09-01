const {schema, model} = require('mongoose');

const postSchema = new Schema({ 
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
        body: String,
        username: String,
        createdAt: String,
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
});

moule.exports = model('post',postSchema);