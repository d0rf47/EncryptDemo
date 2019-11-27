//***********User Router***********//

const express = require('express');
const router  = express.Router();
const User    =  require('../Models/User')
const path    = require('path');
let errors    = [];
router.get('/User', (req,res)=>
{
    res.render('User/profile');
})

router.get('/profile', (req,res)=>
{
    res.render('User/profile');
})

router.get('/register', (req,res)=>
{
    res.render('User/register', {errors:errors});
})
router.post('/register', (req,res)=>
{
    if(req.body.newUsername =="")
    {
        errors.push("must have valid Email");
    }
    if(errors.length > 0)
    {
        res.render('User/register',
        {
            errors:errors
        })
        errors=[];
    }
    else
    {
        const newUser = 
        {
            email:      req.body.newUsername,
            password:   req.body.newUserPass
        }
        const newU = new User(newUser);
       
        newU.save()
            .then(newU=>
                {
                    req.files.proPic.name = `db_${newU._id}${path.parse(req.files.proPic.name).ext}`
                    req.files.proPic.mv(`public/uploads/${req.files.proPic.name}`)
                        .then(()=>
                        {
                            User.findByIdAndUpdate(User._id,
                                {
                                    proPic:req.files.proPic.name
                                })
                            .then(()=>
                            {
                                console.log('Profile pic added')
                                res.redirect('/User/profile')
                            })
                            .catch(err=> console.log(`Profile pic err ${err}`));
                        });
                })
                .catch(err=>console.log(`err: ${err}`));
        }

    
})


router.get('')

module.exports = router;
