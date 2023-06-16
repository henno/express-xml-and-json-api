const express = require('express');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const xml = require('xml');

const app = express();

app.use(bodyParser.json());
app.use(xmlparser({
    explicitArray: false, // This will set array to false
}));

// Middleware for overloading res.send to support XML
app.use((req, res, next) => {
    const oldSend = res.send;

    res.send = (body) => {
        if (req.accepts('application/json')) {
            res.header('Content-Type', 'application/json');
            oldSend.call(res, body);
        } else if (req.accepts('application/xml')) {
            res.header('Content-Type', 'application/xml');
            let xmlBody = typeof body === 'string' ? body : xml(convertToXMLFormat(body));
            oldSend.call(res, xmlBody);
        } else {
            res.status(415).send('Unsupported media type');
        }
    };

    next();
});

// Convert JS Object to XML format
function convertToXMLFormat(obj) {
    return Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object') {
            return { [key]: convertToXMLFormat(obj[key]) };
        } else {
            return { [key]: obj[key] };
        }
    });
}

app.post('/users', (req, res) => {
    res.send(req.body);
});

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
