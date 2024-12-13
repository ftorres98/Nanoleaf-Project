const express = require('express');
const app = express();
const axios = require('axios');

/*********** */
const cors = require('cors');
//const { json } = require('express');
app.use(cors({
  origin: 'http://localhost:4200'
}));
/*********** */

const NANOLEAF_KEY = 'mxCbBELwW6v07dWHmPIfdDkBhfqI0qGd';
const NANOLEAF_IP = '192.168.1.26:16021';

app.get('/', (req, res) => {
    res.send('Nanoleaf Interface Server is running')
})

app.get('/onStatus', (req, res) => {
    axios.get('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state/on').then(function(response){
        console.log(response.data);
        res.send(response.data);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/turnOn', (req, res) => {
    var data = {"on": { "value": true }};

    axios.put('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state', data).then(function(response){
        console.log(response.data);
        res.send("light turned on");
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/turnOff', (req, res) => {
    var data = {"on": { "value": false }};
    
    axios.put('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state', data).then(function(response){
        console.log(response.data);
        res.send("light turned off");
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/getBrightness', (req, res) => {
    axios.get('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state/brightness').then(function(response){
        console.log(response.data);
        res.send(response.data);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/setBrightness', (req, res) => {
    var params = req.query;
    console.log(params);
    console.log(Object.keys(params).length);

    var data;
    if(Object.keys(params).length == 2){
        data = {"brightness": { "value": parseInt(params.value), "duration": parseInt(params.duration) }};
    } else{
        data = {"brightness": { "value": parseInt(params.value) }};
    }
    
    axios.put('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state', data).then(function(response){
        console.log(response.data);
        res.send('Brightness set to '+params.value);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/getHue', (req, res) => {
    axios.get('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state/hue').then(function(response){
        console.log(response.data);
        res.send(response.data);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/setHue', (req, res) => {
    var params = req.query;
    console.log(params);

    var data = {"hue": { "value": parseInt(params.value) }};

    axios.put('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state', data).then(function(response){
        console.log(response.data);
        res.send('Hue set to '+params.value);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/getSaturation', (req, res) => {
    axios.get('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state/sat').then(function(response){
        console.log(response.data);
        res.send(response.data);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/setSaturation', (req, res) => {
    var params = req.query;
    console.log(params);

    var data = {"sat": { "value": parseInt(params.value) }};

    axios.put('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state', data).then(function(response){
        console.log(response.data);
        res.send('Saturation set to '+params.value);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/getColorTemp', (req, res) => {
    axios.get('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state/ct').then(function(response){
        console.log(response.data);
        res.send(response.data);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/setColorTemp', (req, res) => {
    var params = req.query;
    console.log(params);

    var data = {"ct": { "value": parseInt(params.value) }};

    axios.put('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/state', data).then(function(response){
        console.log(response.data);
        res.send('Color Temp set to '+params.value);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/getEffectList', (req, res) => {
    axios.get('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/effects/effectsList').then(function(response){
        console.log(response.data);
        res.send(response.data);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/getCurrentEffect', (req, res) => {
    axios.get('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/effects/select').then(function(response){
        console.log(response.data);
        res.send(response.data);
    }).catch(function(err){
        console.log(err.error);
    });
});

app.get('/setEffect', (req, res) => {
    var params = req.query;
    console.log(params);

    var data = {"select": params.value};

    axios.put('http://'+NANOLEAF_IP+'/api/v1/'+NANOLEAF_KEY+'/effects', data).then(function(response){
        console.log(response.data);
        res.send('Effect set to '+params.value);
    }).catch(function(err){
        console.log(err.error);
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
