const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');
const config = require('./config');

// Read terminal Lines
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

const REMOTE_SERVER = '192.168.5.92:50051';


// Create gRPC client
const client = new proto.example.Chat(config.REMOTE_SERVER, grpc.credentials.createInsecure());

// Start the stream between server and client
const startChat = (username) => {
    const channel = client.join({ user: username });

    channel.on('data', message => {
        // When server send a message
        if (message.user === username) {
            return;
        }
        console.log(`${message.user}: ${message.text}`);
    });

    rl.on('line', (text) => {
        client.send({ user: username, text }, res => {});
    });
};

// Ask user name then start the chat
rl.question('What is your name?', answer => { startChat(answer); });