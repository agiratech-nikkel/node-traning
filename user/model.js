const mongoose = require('mongoose');
const schema = mongoose.Schema

const userSchema = new schema({ 
    
    name: { 
        type: String, 
        required:[true, "Name is required"],
       
    },
    email: { 
        type: String, 
        required: [true] ,
        index:{
            unique: [ true , 'Email already exist'],
            dropDups:true 
        }
    }
},
{timestamps: true ,}
);

const User = module.exports = mongoose.model('User', userSchema);