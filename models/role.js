
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = Schema({
    roleName: { type: String, required: true },
    isDelete: {type: Boolean, default: false}
});



var role = mongoose.model('role', roleSchema);

module.exports = role;