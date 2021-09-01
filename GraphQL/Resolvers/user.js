const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User');
const {SECRET_KEY} = require('../../config.js')


module.exports = {
    Mutation: {
        async register( _, 
            {registerInput:{username,email,password,confirmPassword}} ,
                context ,
                info 
            ) 
            {
            //TODO:Validate user data
            //TODO:make sure user exists
            //TODO:hash password and create auth token
            password = await bcrypt.hash(password,12);
//understand it as newUser is a object of User model
            const newUser = new User({
                email,
                username,
                password,
                createdAt:new Date().toISOString(),
            })
            const res = newUser.save();
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username,
            },SECRET_KEY,{expiresIn:'1h'});

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}