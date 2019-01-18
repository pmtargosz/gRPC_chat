const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('./config');

const server = new grpc.Server();

// Load Protocol Buffer
const proto = grpc.loadPackageDefinition(
    protoLoader.loadSync('protos/chat.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

let users = [];

// Recive message from client joining
const join = call => {
    users.push(call);
    notifyChat({ user: 'Server', text: 'new user joined...' });
};

// Receive message from client
const send = call => {
    notifyChat(call.request);
};

// Send message to all connected clients
const notifyChat = message => {
    users.map(user => {
        user.write(message)
    });
};

// Define server with the methods and start it
server.addService(proto.example.Chat.service, { join, send });

server.bind(config.SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());

server.start();