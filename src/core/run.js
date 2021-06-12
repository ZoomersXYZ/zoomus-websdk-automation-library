const logger = require( '../config/logger' );

async function run( name, ArrOfAwaitFns, endThis = true ) {
  logger.info( `----- ${ name }: run() THE BEGINNING -----` );
  for ( i in ArrOfAwaitFns ) {
    await i();
  };

  if ( endThis ) process.kill( process.pid, 'SIGTERM' );
};

module.exports = run;
