const mongoose = require('mongoose');


const User = mongoose.model(
    'user',
    new mongoose.Schema(
        {
            username : String,
            email: String,
            password: String,

            roles: 
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'role'
                }
            ],

            status :
            {
                type:  Boolean,
                default : true
            },
            creation_date : 
            {
                type : Date,
                default : Date.now
            },
            last_update : 
            {
                type : Date,
                default : Date.now
            }
        }
    )
);

module.exports = User;