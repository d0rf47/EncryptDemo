const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const bcrypt        = require('bcryptjs');
const exphbs        =  require('express-handlebars');
const mongoose      = require('mongoose');
const session       = require('express-session');
const fileup        = require('express-fileupload');
require("dotenv").config({path:'./config/Keys.env'});
const dbUrl         = `mongodb+srv://${process.env.mbd}:${process.env.mbdToken}@cluster0-ponsl.azure.mongodb.net/test?retryWrites=true&w=majority`;
const methodOverride= require('method-override');
const port          = process.env.port || 4000;
const mainRouter    = require('./Routes/General');
const userRouter    = require('./Routes/Users');
const taskRouter    = require('./Routes/Tasks');

app.unsubscribe(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use(fileup());
app.use(methodOverride('_method'));
app.use((req,res,next)=>
{
    res.locals.user =  req.session.userData;
    next();
})
app.use('/', mainRouter);
app.use('/User', userRouter);
app.use('/Task', taskRouter);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.connect(dbUrl,{useUnifiedTopology:true, useNewUrlParser:true})
    .then(()=>
    {
        console.log('Database Connected');
    })
    .catch(err =>
    {
        console.log(`DB Connection Error code : ${err}`);
})

app.listen(port, () =>
{
    console.log(`Server connected! Listening on Port: ${port}`);
})