
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('../models/permission');
require('../models/role');


var uri = 'mongodb://localhost:27017/roleManagementApp';


mongoose.connect(uri,{}, function(error) {
  if(error){
    console.log('connection failed!')
  }else{
    console.log("Database connected successfully!");
  }
});