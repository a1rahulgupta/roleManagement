
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
permission = mongoose.model('permission');
role = mongoose.model('role');
var validator = require('validator');
var config = require('../models/config');
var utility = require('../models/utility.js');
var waterfall = require('async-waterfall');
var async = require('async');
const jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

router.post('/getPermissionByRoleId', function (req, res) {
  var finalResponse = {};
  finalResponse.permissionData = {};

  waterfall([
    function (callback) {
      permission.findOne({ roleId: mongoose.Types.ObjectId(req.body.roleId)}).exec(function (err, permissionData) {
       
        if (err) {
          callback(err, false);
        } else {
          finalResponse.permissionData = permissionData;
          callback(null, finalResponse);
        }
      });
    },
  ], function (err, data) {
    if (err) {
      res.json({
        code: 201,
        data: {},
        message: "Internal Error"
      });
    } else {
      res.json({
        code: 200,
        data: data,
        message: "Record Found Successfully"
      });
    }
  });

})

router.post('/addNewRole', function (req, res) {
  var finalResponse = {};
  finalResponse.roleData = {};
  var userObj = {
    roleName: req.body.roleName
  };
  if (!userObj.roleName) {
    res.json({
      code: 400,
      data: {},
      message: "Required Fields is missing"
    });
  } else {
  waterfall([
    function (callback) { 
      role.findOne({roleName: userObj.roleName , isDelete: false}, function (err, roleExist) {
        if (err) {
          callback(err, false);
        } else {
          if (roleExist) {
            res.json({
              code: 400,
              data: {},
              message: "This role is already exist. please try again with different role."
            });
          } else {
            callback(null, finalResponse);
          }
        }
      });
    },
    
    function (finalResponse, callback) {
      var obj = {
        roleName: userObj.roleName
      };

      var roleRecord= new role(obj);
      roleRecord.save(function (err, roleData) {
        if (err) {
          callback(err, false);
        } else {
          finalResponse.roleData = roleData;
          callback(null, finalResponse);
        }
      });

    },
    function (finalResponse, callback) { 
      var permissionData = {
          roleId: finalResponse.roleData._id
      };
      var permissionRecord = new permission(permissionData);
      permissionRecord.save(function (err, permissionData) {
      
          if (err) {
              callback(err, false);
          } else {
              callback(null, finalResponse);
          }
      });
  },
  ], function (err, data) {
    if (err) {
      res.json({
        code: 201,
        data: {},
        message: "Internal Error"
      });
    } else {
      res.json({
        code: 200,
        data: data,
        message: "Role Added Successfully"
      });
    }
  }
  )}
})

router.post('/deleteRole', function (req, res) {
  var finalResponse = {};
  waterfall([
      function (callback) { //delete user record
          role.findOneAndUpdate({
              _id: req.body.roleId
          }, {
              $set: {
                  isDelete: true,
              }
          }, function (err, userRole) {
              if (err) {
                  callback(err, false);
              } else {
                  callback(null, finalResponse);
              }
          });
      },
      function (finalResponse, callback) { //delete user facility
          permission.findOneAndUpdate({
              _id: req.body.roleId
          }, {
              $set: {
                  isDelete: true,
              }
          }, function (err, permission) {
              if (err) {
                  callback(err, false);
              } else {
                  callback(null, finalResponse);
              }
          });
      },

  ], function (err, data) {
      if (err) {
          res.json({
              code: 201,
              data: {},
              message: "Internal Error"
          });
      } else {
          res.json({
              code: 200,
              data: {},
              message: "Role deleted successfully!"
          });
      }
  });
})

router.post('/updatePermission', function (req, res) {
  var finalResponse = {};
  var permissionId = mongoose.Types.ObjectId(req.body.permission._id);
  waterfall([
      function (callback) { //delete user record
          permission.findOneAndUpdate({
              _id: permissionId
          }, {
              $set: {
                  roleId: req.body.permission.roleId,
                  files: req.body.permission.files,
                  templateFolders: req.body.permission.templateFolders,
                  privateFolders: req.body.permission.privateFolders,
                  workflowFolders: req.body.permission.workflowFolders,
                  users: req.body.permission.users
              }
          }, function (err, userRole) {
              if (err) {
                  callback(err, false);
              } else {
                  callback(null, finalResponse);
              }
          });
      }

  ], function (err, data) {
      if (err) {
          res.json({
              code: 201,
              data: {},
              message: "Internal Error"
          });
      } else {
          res.json({
              code: 200,
              data: {},
              message: "User permission updated successfully!"
          });
      }
  });
})

router.post('/allRoleList', function (req, res) {
  var finalResponse = {};
  var orgData = {};
  var count = req.body.count ? req.body.count : 0;
  var skip = req.body.count * (req.body.page - 1);
  waterfall([
      function (callback) { //Company Data

          var condition = {};
          condition.isDelete = false;
         

          if (req.body.roleName) {
              condition['userName'] = new RegExp(req.body.userName, 'gi');
          }
          var aggregate = [
              {
                  $match: condition
              },
          ];
          var project = {
              $project: {
                  "_id": "$_id",
                  "roleName": "$roleName"
              }
          };

          aggregate.push(project);
          var countQuery = [].concat(aggregate);
          aggregate.push({
              $skip: parseInt(skip)
          });
          aggregate.push({
              $limit: parseInt(count)
          });
          role.aggregate(aggregate).then(function (roleData) {
            
              var data = {};
              data.data = roleData;
              countQuery.push({
                  $group: {
                      _id: null,
                      count: {
                          $sum: 1
                      }
                  }
              });
              role.aggregate(countQuery).then(function (dataCount) {
                  var cnt = (dataCount[0]) ? dataCount[0].count : 0;
                  data.total_count = cnt;
                  callback(null, data);
              });
          }).catch(function (err) {
              callback(err, false);
          });
      },
  ], function (err, data) {
  
      if (err) {
          res.json({
              code: 201,
              data: {},
              message: "Internal Server Error"
          });
      } else {
          res.json({
              code: 200,
              data: data,
              message: "Data found successfully"
          });
      }
    });
  })


module.exports = router;

