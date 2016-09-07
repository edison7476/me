// This is the friend.js file located at /server/models/friend.js
// We want to create a file that has the schema for our friends and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');

// var crypto = require('crypto');
// var jwt = require('jsonwebtoken');

// create our friendSchema
var FriendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        sparse:true,
        // required: [true, 'Name field cannot be empty'],
        // minlength: [2, 'Name must be at least 3 characters']
    },
    lastName: {
        type: String,
        sparse:true,
        // required: [true, 'Name field cannot be empty'],
        // minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        unique: true,
        sparse:true
        // required: [true, 'Email field cannot be empty'],
    },
    level: {
        type: String,
        sparse:true

    }
    // hash: String, // adding hash by referring the online source
    // salt: String // adding salt by referring the online source
    // password: { type: String,
    //               required: [true, 'password field cannot be empty'],
    //               minlength: [8, 'password must be at least 8 characters']
    //           },
}, {
    timestamps: true
});

var ProductSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Product name field cannot be empty'],
            minlength: [3, 'Product name must be at least 3 characters']
        },
        price: {
            type: Number,
            required: true,
            min: [0.01, 'Price must be at least $0.01']
        },
        qty: {
            type: Number,
            required: true,
            min: [1, 'Product quantity must be at least one']
        },
        reviews: {
            type: Array,
            "default": []
        },
        url: String,

    }, {
        timestamps: true
    }

);

var OrderSchema = new mongoose.Schema({
    customerId: String,
    firstName: String,
    lastName: String,
    productId: String,
    productName: String,
    productPrice: Number,
    qty: {
        type: Number,
        required: true,
        min: [1, 'Order quantity must be less one']
    }
}, {
    timestamps: true
});

// ** adding FriendSchema.methods.setPassword by referring the online source
// FriendSchema.methods.setPassword = function(password){
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
// };

// ** adding FriendSchema.methods.vaildPassword by referring the online source
// FriendSchema.methods.validPassword = function(password) {
//   var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
//   return this.hash === hash; // this returns true or false
// };
// adding FriendSchema.methods.generateJwt by referring the online source

// FriendSchema.methods.generateJwt = function() {
//   var expiry = new Date();
//   expiry.setDate(expiry.getDate() + 7);
//
//   return jwt.sign({
//     _id: this._id,
//     email: this.email,
//     name: this.name,
//     exp: parseInt(expiry.getTime() / 1000),
//   }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
// };

FriendSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Friend', FriendSchema);

// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural)
mongoose.model('Friend', FriendSchema);
mongoose.model('Product', ProductSchema);
mongoose.model('Order', OrderSchema);
// notice that we aren't exporting anything -- this is because this file will be run when we require it using our config file and then since the model is defined we'll be able to access it from our controller
