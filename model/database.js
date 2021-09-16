const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(" \' Blog \' =>  database connected  ");
}).catch(err => {
    console.log(err + "this is that error ")
})


const schema = new mongoose.Schema({
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },

    content_writer: {
        type: String,
        // required: true
    },
    jwt: {
        type: String
    },
    blogs_list: {
        content_writer: {
            type: String,

        },
        blogs: {
            type: String,

        }
    }

});



const users_model = new mongoose.model('user', schema);




module.exports = { users_model, schema };