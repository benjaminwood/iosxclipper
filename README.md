# iosxclipper

Share images & text with your linux clipboard from iOS via an iOS 12 Shortcut with over a local network.

Read over [server.js](server.js) to see how it works (it's tiny). This is proof of concept. Be advised: there is no security that would prevent somebody else from sending data to your clipboard.

1. Ensure you have xclip & node installed on your linux machine.
2. Clone this repo and `cd` to the directory
3. `npm install` or `yarn install`
4. `node server.js` to start the server

Download the shortcut on your iOS 12+ device: https://www.icloud.com/shortcuts/d0e642f00d83463cbf2daa733a76d948

Follow the instructions to import the shortcut. Your linux machine must be accessible on your local network. You will be prompted to enter a hostname upon import.