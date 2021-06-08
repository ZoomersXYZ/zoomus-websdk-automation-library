const log4js = require( 'log4js' );

log4js.configure({
  appenders: { baseCore: { type: 'file', filename: 'logs/automation.log' } },
  categories: { default: { appenders: [ 'baseCore' ], level: 'info' } } 
} );

const logger = log4js.getLogger( 'baseCore' );

module.exports = logger;
