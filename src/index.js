const puppeteer = require('puppeteer');
const urlBase = 'https://www.datosperu.org/buscador_empresas.php?buscar=';
const urlData = "https://www.datosperu.org/";
//const ruc = "20462509236";
const ruc = "20600110421";

(async () => {

    const browser = await puppeteer.launch({headless: false});      
    const page = await browser.newPage();

    await page.setViewport({
        width: 1500,
        height: 1200,
        deviceScaleFactor: 1,
      });

    const url = urlBase + ruc;
    const dataCompany = [];
    //await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.goto(url);

    let  result = await page.$eval('.comments',(element => element.textContent));
    
    if(result){
      let  href = await page.$eval('.single-product  a', (element) => element.getAttribute('href'));
      let  razonSocial = await page.$eval('.single-product  b', (element) => element.textContent.trim());
      let  companyURL = urlData + href;
      await page.goto(companyURL);
      let   [ addressCompany] = await page.$$eval('.list-unstyled span  a', (element) => [element[0].textContent ]);

      var tmp = {};
      tmp.ruc  = ruc;
      tmp.razonSocial  = razonSocial;
      tmp.address = addressCompany;
      
      dataCompany.push(tmp);
    }

    console.log(dataCompany);
    //await browser.close();
})();