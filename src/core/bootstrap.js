const browserFunc = require( '../config/browserFunc' );
const logger = require( '../config/logger' );
const Automation = require( './Automation' );
const initialStrap = require( './initialStrap' );

async function bootstrap( name, runInitial = false, zoomOut = false, buttonPage = false ) {
  // Initializaing
  const browser = await browserFunc();
  const pages = await browser.pages();
  const page = pages[ 0 ];  

  // Initializaing values
  const TIMEOUT = 2500; // 5000 // 15000
  await page.setDefaultTimeout( TIMEOUT );
  await page.setDefaultNavigationTimeout( TIMEOUT * 3 );
  await page.setViewport( { 
    width: 1920, 
    height: 1080 
  } );

  logger.info( '-- bootstrapped --' );
  const a = new Automation( page, name, 15000 );

  if ( runInitial ) {
    await initialStrap( a, name, buttonPage, zoomOut );
  };
  return a;
};

module.exports = bootstrap;
