/**
 * index.js
 * MQTTのbrokerの役割
 */
// var mosca = require('mosca');
// var server = new mosca.Server({
//     port: 1883,
// });
let aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883

// aedes.on('ready', function(){
//     console.log('Server is ready.');
// });

/**
 * 新しいクライアントが接続した場合
 */
aedes.on('client', (client) => {
    console.log('broker.on.connected.', 'client:', client.id);
});

// aedes.on('clientDisconnected', function(client){
//     console.log('broker.on.disconnected.', 'client:', client.id);
// });

/**
 * 新しいsubscriberが接続した場合
 */
aedes.on('subscribe', (topic, client) => {
    console.log('broker.on.subscribed.', 'client:', client.id, 'topic:', topic);
});

// aedes.on('unsubscribed', function(topic, client){
//     console.log('broker.on.unsubscribed.', 'client:', client.id); 
// });

/**
 *  publishされた場合
 */
aedes.on('publish', (packet, client) => {
    console.log('broker.on.published.', 'client:', client.id);
    if (/\/new\//.test(packet.topic)){
        return;
    }
    if (/\/disconnect\//.test(packet.topic)){
        return;
    }
    // console.log('broker.on.published.', 'client:', client.id);
});


server.listen(port, function () {
    console.log('server started and listening on port ', port)
  })
  