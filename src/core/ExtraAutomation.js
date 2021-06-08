const createLogger = require( '../config/createLogger' );
const to = require( '../util' ).to;

class Extra {
  constructor( page, name, defaultTimeOut = 7500, defaultPause = 1500 ) {
    this.page = page;
    this.logger = createLogger( `${ name }--ExtraA` );
    this.TIMEOUT = defaultTimeOut;
    this.PAUSE = defaultPause;
  };

  // Returns the turn of the method
  // or Puppeteer ElementHandle
  async findElFromText( sel, text, method = undefined ) {
    const [ err, result ] = await to( this.page.$$eval( sel, ( els, method, text, logger, console ) => {
      if ( method ) {
        return els
          .find( el => 
            el.textContent === text )
            [ method ]();
      } else {
        return els
          .find( el => 
            el.textContent === text );

      };
    }, method, text, this.logger, console ) );
    if ( err ) {
      this.defaultErr( err.sender, method, sel, '2nd' );
      return false;
    };
    return result ? result : true;
  };

  // crawl through all the elements and remove the span with superflous info
  // Then search by text again
  async removeSelector( sel ) {
    await a.page.$$eval( sel, ( els ) => {
      return els
        .map( el => {
          const parent = el.parentNode;
          el.remove();
          return parent;
        } );
    } );
  };

  async clickText( sel, text ) {
    await a.page.$$eval( sel, ( els, text ) => {
      return els
        .find( el => 
          el.textContent === text )
          .click();
    }, text );
  };
};

module.exports = Extra;
