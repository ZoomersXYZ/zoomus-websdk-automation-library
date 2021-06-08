const puppeteer = require( 'puppeteer' );
// const puppeteer = require( 'puppeteer-core' );
const axios = require( 'axios' );

async function browserFunc() {
  const CHROME_PORT = 9222
  const response = await axios.get( `http://localhost:${ CHROME_PORT }/json/version` );
  const { webSocketDebuggerUrl } = response.data;
  return await puppeteer.connect( { browserWSEndpoint: webSocketDebuggerUrl } );  
};

module.exports = browserFunc;
