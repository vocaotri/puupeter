var cron = require('node-cron');
var express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const port = process.env.PORT || 8080;
cron.schedule('0 0 */23 * * *', () => {
    puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }).then(async browser => {
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
        await page.goto('https://accounts.google.com/b/0/DisplayUnlockCaptcha');
        await page.type('#identifierId', 'vocaotri445@gmail.com');
        await page.click('#identifierNext');
        await page.waitFor(2000);
        await page.type('input', '7411319985620');
        await page.click('#passwordNext');
        await page.waitFor(2300);
        await page.click('#submitChallenge');
        await context.close();
        await browser.close();
    });
});
puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
}).then(async browser => {
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
    await page.goto('https://accounts.google.com/b/0/DisplayUnlockCaptcha');
    await page.type('#identifierId', 'vocaotri445@gmail.com');
    await page.click('#identifierNext');
    await page.waitFor(2000);
    await page.type('input', '7411319985620');
    await page.click('#passwordNext');
    await page.waitFor(2300);
    await page.click('#submitChallenge');
    await context.close();
    await browser.close();
    await console.log('Xong');
});
app.get('/', function (req, res) {
    res.end("<h3>Check thanh cong</h3>");
});
app.listen(port, function () {
    console.log('App listening on port ' + port)
})