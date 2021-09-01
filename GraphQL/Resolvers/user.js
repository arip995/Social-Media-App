const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User');
const {UserInputError} = require('apollo-server');
const {SECRET_KEY} = require('../../config.js');
const {validateRegisterInput, validateLoginInput} = require('../../Utils/Validators');

const generateToken = (user) =>{
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    },SECRET_KEY,{expiresIn:'1h'});
}

module.exports = {
    Mutation: {
        async login(_,{username,password}){
            const {valid, errors} = validateLoginInput(username, password);
            const user = await User.findOne({username});
            if (!valid) {
                throw new UserInputError('Errors',{errors})
            }
            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('Wrong credentials',{errors})
            } 
            if(user){
                const match = await bcrypt.compare(password,user.password);
                if (!match) {
                    errors.general = 'Wrong credentials';
                    throw new UserInputError('Wrong credentials',{errors})
                }
                const token = generateToken(user);
                return {
                    ...user._doc,
                    id: user._id,
                    token
                }
            }
        },
        async register( _, 
            {
                registerInput:{username,email,password,confirmPassword}}
            ) 
            {
            //TODO:Validate user data

            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors',{errors})
            }
            //TODO:make sure user exists

            const user = await User.findOne({username});
            if(user) {
               throw new UserInputError('Username is taken',{
                   error:{
                       username:'This username is taken'
                   }
               })
            }

            //hash password and create auth token
            password = await bcrypt.hash(password,12);
            //understand it as newUser is a object of User model
            const newUser = new User({
                email,
                username,
                password,
                createdAt:new Date().toISOString(),
            })
            const res = await newUser.save();
            const token = generateToken(res);
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}