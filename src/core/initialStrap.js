const createLogger = require( '../config/createLogger' );

async function initialStrap( a, name, buttonPage = false, zoomOut = true ) {
  let sel, rootSel, parentSel, $ = '';
  const logger = createLogger( `${ name }--initialStrap` );

  logger.info( '-- BEGINNING --' );

  // Optionally refresh when necessary
  if ( process.env.RELOAD ) {
    await a.page.reload( { 
      waitUntil: [
        'networkidle0', 
        'load', 
        'domcontentloaded' 
    ] } );
    await a.page.waitForTimeout( 1000 );
  };

  if ( zoomOut ) {
    // Mac OS only. macOS 10.15, 11
    logger.info( 'zoomOut Begin' );
    await a.page.goto( 'keysmith://run-macro/66B2FA0B-EC68-4546-A16B-97B105FB47F1' );
    logger.info( 'zoomOut End - any way to confirm?' );
  };

  if ( process.env.RELOAD || buttonPage ) {
    // Launch meeting page
    sel = '#root > div > .form > .MuiButtonBase-root > .MuiButton-label';
    const onIntroPage = await a.visibleCheck( sel );
    if ( onIntroPage ) {
      await a.page.waitForTimeout( 1500 );
      await a.selClick( sel );
      await a.page.waitForTimeout( 2500 );
    };
  };

  rootSel = '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container';
  const overlayVisible = await a.selClick( rootSel );
  if ( overlayVisible ) {    
    sel = ' > .zm-btn';
    await a.selClick( rootSel + sel );
  };

  ////
  // Video Receiving
  ////
  parentSel = '#wc-footer div.more-button';
  sel = parentSel + ' ul li a';
  const videoReceivingHtml = await page.$eval( sel, e => e.outerHTML );
  $ = cheerio.load( videoReceivingHtml );
  const videoText = $( 'a' ).text();

  if ( videoText == 'Disable video receiving' ) {  
    a.selClick( parentSel );
    await a.page.waitForTimeout( 750 );
    await page.keyboard.press( 'ArrowDown' );
    await a.page.waitForTimeout( 1000 );
    await page.keyboard.press( 'Enter' );
  };
};

module.exports = initialStrap;
