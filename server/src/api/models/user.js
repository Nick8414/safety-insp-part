const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName   : String,
    fullName   : String,
    ddsID      : Number,
    department : String,
    isInspector: Boolean,
    isAdmin    : Boolean,
    isUser     : Boolean,
    headersTable:[
        {
          label: String,
          value: String,
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean 
        },
        { 
          label: String,
          value: String, 
          status: Boolean 
        },
        { 
          label: String,
          value: String, 
          status: Boolean 
        },
        { 
          label: String,
          value: String, 
          status: Boolean 
        },
        { 
          label: String,
          value: String, 
          status: Boolean 
        },
        { 
          label: String,
          value: String, 
          status: Boolean 
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean 
        },
        { 
          label: String,
          value: String, 
          status: Boolean 
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        },
        { 
          label: String ,
          value: String, 
          status: Boolean
        },
        { 
          label: String,
          value: String, 
          status: Boolean
        }
       ]

})

module.exports = mongoose.model('User', userSchema);