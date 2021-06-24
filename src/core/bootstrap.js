const browserFunc = require( '../config/browserFunc' );
const logger = require( '../config/logger' );
const to = require( '../util' ).to;

const Automation = require( './Automation' );
const initialStrap = require( './initialStrap' );

async function bootstrap( name, runInitial = false, zoomOut = false, buttonPage = false ) {
  // Initializaing
  const browser = await browserFunc();
  const [ errPages, pages ] = await to( browser.pages() );
  const page = pages[ 0 ];

  const width = 1920;
  const widthFormula = width / 2;
  // const heightFormula = width / ( 16 / 9 );
  const heightFormula = widthFormula;
  // Initializaing values
  const TIMEOUT = 2500; // 5000 15000
  let res;
  res = page.setDefaultTimeout( TIMEOUT );
  res = page.setDefaultNavigationTimeout( TIMEOUT * 3 );
  res = page.setViewport( { 
    width: widthFormula, 
    height: heightFormula 
  } );

  logger.info( '-- bootstrapped --' );
  const a = new Automation( page, name, 15000 );

  if ( runInitial ) {
    await initialStrap( 
      a, 
      name, 
      zoomOut, 
      buttonPage 
    );
  };
  return a;
};

module.exports = bootstrap;
