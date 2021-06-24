const log4js = require( 'log4js' );

function createLogger( name ) {
  log4js.configure( {
    appenders: { [ name ]: { type: 'file', filename: './logs/automation.log' } },
    categories: { default: { appenders: [ name ], level: 'info' } } 
  } );
  return log4js.getLogger( name );
};

module.exports = createLogger;
