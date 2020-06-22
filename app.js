var cron = require('node-cron');
var express = require('express');
var fs = require('fs').promises;
var { performance } = require('perf_hooks');
const app = express();
const puppeteer = require('puppeteer');
const port = process.env.PORT || 8080;
var data= "";
(async () => {
    data = await fs.readFile('data.csv');
    data = data.toString().split('\n');
    var lenghtData = data.length - 1;
    var newdata = data.splice(1,data.length);
    newdata.map((el,index)=>{
        setTimeout(() => {
        var dataSecond = el.split(',');
            (async () => {
            const t0 = performance.now();
            const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
            await page.goto('http://nakamura.kvn-93.xyz/entry');
            await page.type('#entry_name_name01', dataSecond[1]);
            await page.type('#entry_name_name02', dataSecond[1]);
            await page.type('#entry_kana_kana01', dataSecond[3]);
            await page.type('#entry_kana_kana02', dataSecond[4]);
            await page.type('#entry_postal_code', dataSecond[6]+dataSecond[7]);
            await page.waitFor(1000);
            await page.evaluate( () => document.getElementById("entry_address_addr01").value = "");
            await page.evaluate( () => document.getElementById("entry_point").value = "");
            await page.type('#entry_address_addr01', dataSecond[9]);
            await page.type('#entry_address_addr02', dataSecond[10]);
            await page.type('#entry_phone_number', (dataSecond[12]+dataSecond[13]+dataSecond[14]).replace(/\r/g, ""));
            await page.type('#entry_email_first', dataSecond[11]);
            await page.type('#entry_email_second', dataSecond[11]);
            await page.type('#entry_password_first', dataSecond[5]);
            await page.type('#entry_password_second', dataSecond[5]);
            await page.click('#entry_user_policy_check');
            await page.type('#entry_point',dataSecond[15]);
            await page.keyboard.press('Enter');
            await page.waitFor(2000);
            await page.click('button[name="mode"]');
            await browser.close();
            const t1 = performance.now();
            console.log('đã đăng ký xong user '+ (parseInt (index) + 1));
            console.log("Thực hiện sau " + (t1 - t0)/1000 + " giây.");
            if(parseInt(index) + 1 === lenghtData) console.log('Chúc mừng bạn đã xong ');
        })();
    }, 13000 * index);
    });
})();

app.get('/', function(req, res) {
    res.end("<h3>Check thanh cong</h3>");
});
app.listen(port, function() {
    console.log('App listening on port ' + port)
})