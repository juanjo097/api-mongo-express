const mongoose = require('mongoose');

const Role  = mongoose.model(
    "role",
    new mongoose.Schema(
        {
            name : String,

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

module.exports = Role;