const express    = require ('express');
const favicon    = require('serve-favicon')
const app        = express();
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const cors       = require('cors')
const mongoose   = require('mongoose');
const path       = require('path');
const logger    = require('../src/api/log/logger');
const dbConnect = require('./dbConnection/connection');


//const passport     = require('passport');
const passport = require('./authN');
const LdapStrategy = require('passport-ldapauth');
const session      = require('express-session');

const config       = require('../../config.json');


const safetyDeviceRoutes         = require('./api/routes/safetyDevices');
const deviceTypeRoutes           = require('./api/routes/deviceTypes');
const questionRoutes             = require('./api/routes/questions');
const toolRoutes                 = require('./api/routes/tools');
const departmentRoutes           = require('./api/routes/departments');
const precautionRoutes           = require('./api/routes/precautions');
const skillRoutes                = require('./api/routes/skills'); 
const safetyFormRoutes           = require('./api/routes/safetyForms');
const hazardRatingsRoutes        = require('./api/routes/hazardRatings'); 
const statusesRoutes             = require('./api/routes/statuses');
const inspectionTypesRoutes      = require('./api/routes/inspectionTypes');
const inspectionMethodsRoutes    = require('./api/routes/inspectionMethods');
const conditionOfEquipmentRoutes = require('./api/routes/conditionOfEquipment');
const userRoutes                 = require('./api/routes/users');
const procedureRoutes            = require('./api/routes/procedure');
const protocolRoutes             = require('./api/routes/protocol');
const actionRoutes               = require('./api/routes/actions');
const employeeRoutes             = require('./api/routes/employees');
const xls                        = require('./api/routes/xls');
const logsRoutes                 = require('./api/routes/logs');

dbConnect(config.dbURI);
const sessionConnection = mongoose.createConnection('143.22.3.35', 'SafetySystem');
// mongoose.Promise = global.Promise;

// mongoose.connect(dbURI);
// mongoose.Promise = global.Promise;

//app.use(morgan('combined', { stream:logger.stream}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
  origin:'http://localhost:8080',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'supersecrettext',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: sessionConnection})
}));

passport.use(new LdapStrategy({
    server: {
      url: 'ldaps://ed.pg.com:636',
      searchBase: 'ou=people,ou=pg,o=world',
      searchFilter: '(extShortName={{username}})'
    }
  }));
app.use(passport.initialize());  


app.use('/safetydevices', safetyDeviceRoutes);
app.use('/devicetypes', deviceTypeRoutes);
app.use('/questions', questionRoutes);
app.use('/tools', toolRoutes);
app.use('/departments', departmentRoutes);
app.use('/precautions', precautionRoutes);
app.use('/skills', skillRoutes);
app.use('/safetyforms', safetyFormRoutes);
app.use('/hazardratings', hazardRatingsRoutes);
app.use('/statuses', statusesRoutes);
app.use('/inspectiontypes', inspectionTypesRoutes);
app.use('/inspectionmethods', inspectionMethodsRoutes);
app.use('/conditionofequipments', conditionOfEquipmentRoutes);
app.use('/users', userRoutes);
app.use('/procedures', procedureRoutes);
app.use('/protocols', protocolRoutes);
app.use('/actions', actionRoutes);
app.use('/employees', employeeRoutes);
app.use('/xls', xls);
app.use('/logs', logsRoutes);





// app.use((req, res, next) => {
//     const error = new Error('Not foubd');
//     error.status = 404;
//     next(error);
// })

app.use((error, req, res, next) => {
  console.log('eeeeeeeeerrrrrrrrrrrorrrrrrrrr');
  console.log(error)
    if (error instanceof mongoose.CastError) {
        // Handle this error
       // console.log("CastError");
        logger.error("mongoose CastError")
        res.status(500).send({message: error.message})
    } else {
        res.status(error.status || 500);
       // console.log(`error => ${error.message}`)
        logger.error(error.message)
        res.json({
            error: {
                message: error.message
            }
        })
    }
})

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works'
//     });
// });

module.exports = app;