const { Schema, model } = require('mongoose');


const RoleSchema = Schema({
  
    role: {
        type: String,
        required: [true, 'Rol obligatorio']
    }
});





module.exports = model('Role', RoleSchema);
