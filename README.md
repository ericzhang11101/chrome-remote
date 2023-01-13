# To Use:

#### clone repo, go to chrome://extensions/, load unpacked, select ./build dir 
#### remote is WIP atm, can be used with temp remote 

# Development

### main extension

#### Edit files in /src/extension, run `webpack --config .\webpack.common.js`, when ready

### popup

#### Edit files in /src/react-chrome-app, run `yarn build` and copy contents popup-build folder into /build
#### Building directly into the folder will fuck everything up !!

### server

#### https://github.com/ericzhang11101/remote-server
