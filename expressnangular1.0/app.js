const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

const routes = require('./routes/api.js');

app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/',(req,res,next) => {
    res.send('Invalid Request...');
});

app.listen(PORT,'192.168.0.103',()=>{
    console.log("Server started on port" + PORT);
});