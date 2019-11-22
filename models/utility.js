'use strict';
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';
var nodemailer = require('nodemailer');
var path = require('path');
var async = require('async');

var utility = {};


utility.getEncryptText = function(text) {
    var cipher = crypto.createCipher(algorithm, password);
    text = cipher.update(text, 'utf8', 'hex');
    text += cipher.final('hex');
    return text;
}

utility.getDecryptText = function(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var text = decipher.update(text, 'hex', 'utf8')
    text += decipher.final('utf8');
    return text;
}




module.exports = utility;
