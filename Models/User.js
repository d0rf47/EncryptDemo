//**********User Model Schema***********//

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;


const newUserSchema = new Schema
({
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required: true
    },
    proPic:
    {
        type:String,
        default: 'DSC_0944.JPG'
    },
    timeStamp:
    {
        type:Date,
        default:Date.now()
    }

});

newUserSchema.pre("save",function(next)
{
    bcrypt.genSalt(10)
        .then(salt =>
            {
                bcrypt.hash(this.password,salt)
                    .then(hash=>
                        {
                            this.password=hash
                            next();
                        })
            })
})

const userSchema = mongoose.model('Users', newUserSchema);

module.exports = userSchema;