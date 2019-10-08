var cron = require('node-cron');
var express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const port = process.env.PORT || 8080;
cron.schedule('0 0 */23 * * *', () => {
    (async() => {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
        await page.goto('https://accounts.google.com/b/0/DisplayUnlockCaptcha');
        await page.type('#identifierId', 'vocaotri445@gmail.com');
        await page.waitFor(1000);
        await page.click('#identifierNext');
        await page.waitFor(5000);
        await page.type('input', '7411319985620');
        await page.click('#passwordNext');
        await page.waitFor(15000);
        await page.$eval('input[type=submit]', el => el.click());
        await page.waitFor(7000);
        await browser.close();
        await console.log('Xong sau 23 h');
    })();
});
(async() => {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
    await page.goto('https://accounts.google.com/b/0/DisplayUnlockCaptcha');
    await page.type('#identifierId', 'vocaotri445@gmail.com');
    await page.waitFor(1000);
    await page.click('#identifierNext');
    await page.waitFor(2500);
    await page.type('input', '7411319985620');
    await page.click('#passwordNext');
    await page.waitFor(15000);
    await page.$eval('input[type=submit]', el => el.click());
    await page.waitFor(7000);
    await browser.close();
    await console.log('Xong');
})();
app.get('/', function(req, res) {
    res.end("<h3>Check thanh cong</h3>");
});
app.listen(port, function() {
    console.log('App listening on port ' + port)
})