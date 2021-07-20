//Require Express
const express = require('express')
    //Require Body Paraser
const bodyParser = require('body-parser');
//Require Path
const path = require('path')

//Require Error Path
const errorController = require('./controllers/error')
const db = require('./util/database')


//Init Express app and Port Number
const app = express()
const port = process.env.PORT || 3000



app.set('view engine', 'ejs');
app.set('views', 'views');


//Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



//Get JSON Inputs
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

//USe Routes in App
app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404)




//Start Server
app.listen(port, () => {
    console.log('Server is Running on Port ' + port)
})