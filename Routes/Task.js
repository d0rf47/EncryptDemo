//************Task Router************//

const express = require('express');
const router  = express.Router();

router.get('/Task', (req,res)=>
{
    res.render('Task/tasks');
})
router.get('/tasks', (req,res)=>
{
    res.render('Task/tasks');
})

module.exports = router;