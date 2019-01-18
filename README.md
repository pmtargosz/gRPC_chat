# Overview

gPRC chat app using node.

## Installation

First, clone this repo and change to the directory:
```bash
git clone git@github.com:pmtargosz/<project>.git
cd <project>
```

### Install

```bash
npm install
```

### Config

Inside `config.js` file you can change server address `<your_data>`:
```js
const config = {
    SERVER_ADDRESS: '<your_data>',
    REMOTE_SERVER: '<your_data>',
}

module.exports = config;
```

### Commands
Run server:
```bash
npm run server
```

Run client:
```bash
npm run join
```

## Resources
* [grpc](https://grpc.io/grpc/node) - Node.js gRPC library

## License
[MIT](https://opensource.org/licenses/MIT)
