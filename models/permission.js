
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionModelSchema = Schema({

    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
    files:           {   
        create:             {type: Boolean, default: false},                       
        delete:               {type: Boolean, default: false},
        download:               {type: Boolean, default: false },
        move:             {type: Boolean, default: false},
        Design:             {type: Boolean, default: false},                       
        sign:               {type: Boolean, default: false},
        addSignatuteTask:               {type: Boolean, default: false },
        changingSigningMethod:             {type: Boolean, default: false}
    },
    templateFolders:{
        create:             {type: Boolean, default: false},                       
        delete:               {type: Boolean, default: false},
        rename:               {type: Boolean, default: false },
        move:             {type: Boolean, default: false},
        download:               {type: Boolean, default: false },
        addFiles:             {type: Boolean, default: false},
    },
    privateFolders:{
        create:             {type: Boolean, default: false},                       
        delete:               {type: Boolean, default: false},
        rename:               {type: Boolean, default: false },
        move:             {type: Boolean, default: false},
        download:               {type: Boolean, default: false },
        addFiles:             {type: Boolean, default: false},
    },
    workflowFolders:{
        create:             {type: Boolean, default: false},                       
        delete:               {type: Boolean, default: false},
        rename:               {type: Boolean, default: false },
        move:             {type: Boolean, default: false},
        download:               {type: Boolean, default: false },
        addFiles:             {type: Boolean, default: false},
    },
    users:{
        create:             {type: Boolean, default: false},                       
        update:               {type: Boolean, default: false},
        delete:               {type: Boolean, default: false },
        viewFolders:             {type: Boolean, default: false}
    },
   





});






var permission = mongoose.model('permission', permissionModelSchema);

module.exports = permission;