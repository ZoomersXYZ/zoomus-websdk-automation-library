const cheerio = require( 'cheerio' );

const createLogger = require( '../config/createLogger' );

async function navigateToHome( a, nav = false ) {
  if ( !nav ) return false;

  if ( nav == 'RELOAD' ) {
    await a.page.reload( {
      waitUntil: [
        'networkidle0', 
        'load', 
        'domcontentloaded' 
    ] } );
  } else if ( nav == 'GOHOME' ) {
    await a.page.goto( 'http://localhost/', { 
      waitUntil: [ 
        'networkidle0', 
        'load', 
        'domcontentloaded' 
    ] } );
  };
  await a.page.waitForTimeout( 1000 );
};

async function zoomingOut( a, toZoomOut ) {
  if ( !toZoomOut ) return false;

  logger.info( 'zoomOut Begin' );
  await a.page.keyboard.down( 'Meta' );
  await a.page.waitForTimeout( 500 );
  await a.page.keyboard.press( 'Digit0' );
  for ( i in [ ...Array( 3 ) ] ) {
    await a.page.keyboard.press( 'Minus' );
    await a.page.waitForTimeout( 500 );
  };
  await a.page.keyboard.up( 'Meta' );
  logger.info( 'zoomOut End - any way to confirm?' );
  return true;
};

async function continueFromIntroFormPage( a, buttonPage ) {
  if ( process.env.RELOAD || buttonPage ) {
    // Launch meeting ourpage
    const sel = '#root > div > .form > .MuiButtonBase-root > .MuiButton-label';
    const onIntroPage = await a.visibleCheck( sel );
    if ( onIntroPage ) {
      await a.page.waitForTimeout( 1500 );
      await a.selClick( sel );
      await a.page.waitForTimeout( 2500 );
    };
    return false;
  };
  return false;
};

async function dismissInitialOverlay( a ) {
  const rootSel = '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container';
  const overlayVisible = await a.selClick( rootSel );
  if ( overlayVisible ) {    
    const sel = ' > .zm-btn';
    await a.selClick( rootSel + sel );
  };
  return false;
};

async function turnOffVideoReceiving( a ) {
  const parentSel = '#wc-footer div.more-button';
  const sel = parentSel + ' ul li a';
  const videoReceivingHtml = await a.page.$eval( sel, e => e.outerHTML );
  $ = cheerio.load( videoReceivingHtml );
  const videoText = $( 'a' ).text();

  if ( videoText == 'Disable video receiving' ) {  
    a.selClick( parentSel );
    await a.page.waitForTimeout( 750 );
    await a.page.keyboard.press( 'ArrowDown' );
    await a.page.waitForTimeout( 1000 );
    await a.page.keyboard.press( 'Enter' );
  };
};

async function initialStrap( a, name, buttonPage = false, zoomOut = true ) {
  const logger = createLogger( `${ name }--initialStrap` );

  logger.info( '-- BEGINNING --' );

  // Optionally go to localhost or refresh
  await navigateToHome( a, process.env.NAV );
  // Mac OS only. macOS 10.15, 11
  // await a.page.goto( 'keysmith://run-macro/66B2FA0B-EC68-4546-A16B-97B105FB47F1' );

  // Attempt to zoom out with web automation. May not work if it was not coded before
  await zoomingOut( a, zoomOut );

  // await continueFromIntroFormPage( a, buttonPage );

  await dismissInitialOverlay( a );

  await turnOffVideoReceiving( a );
};

module.exports = initialStrap;
