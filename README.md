# iosxclipper

Share images & text between iOS and your linux clipboard over a local network via iOS 12 Shortcuts.

Read over [server.js](server.js) to see how it works (it's tiny).

## Install & run the server

1. Ensure you have xclip & node installed on your linux machine.
2. Clone this repo and `cd` to the directory
3. `yarn install`
4. `yarn run start your-basic-auth-password` to start the server

## Download the shortcuts on your iOS 12+ device:

Share iOS Clipboard to linux:https://www.icloud.com/shortcuts/e03c535f55d146daaa3b10f27e3e5d3f

Get/Fetch Linux Clipboard: https://www.icloud.com/shortcuts/ac850ef2122f4d079b2670a748120cd2

When you install the shortcuts you will be prompted for:

1. The hostname of your linux machine on the local network
2. A base64 encoded `Authorization` header.

If you used the password `mypassword` when starting the server, you could get the base64 value like this (The username is always `ios`):

`echo -n 'ios:mypassword' | base64`

The output would be `aW9zOm15cGFzc3dvcmQ=`

The header value would be

`Basic aW9zOm15cGFzc3dvcmQ=`

### Bonus: Run the node server with systemd

If your using systemd you could create a file like '/etc/systemd/user/iosxclipper.service' with the following content:

```
[Unit]
Description=iosxclipper
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
ExecStart=/bin/bash -c "node /the/path/to/iosxclipper/server.js your-password"

[Install]
WantedBy=multi-user.target
```

To enable the service on startup: `systemctl --user enable iosxclipper`

To start the service now: `systemctl --user start iosxclipper`