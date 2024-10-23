const https = require('https');
const fs = require('fs');

const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'; // заміни на потрібний URL

https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    resp.on('end', () => {
        fs.writeFileSync('data.json', data); // зберігаємо дані у data.json
        console.log('JSON saved as data.json');
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
