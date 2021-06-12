const log4js = require( 'log4js' );

function createLogger( name ) {
  log4js.configure( {
    appenders: { [ name ]: { type: 'file', filename: process.env.AUTOMATION_LOG_PATH } },
    categories: { default: { appenders: [ name ], level: 'info' } } 
  } );
  return log4js.getLogger( name );
};

module.exports = createLogger;
