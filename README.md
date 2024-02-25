# OCTranspo App using Tauri

A simple app which displays all buses / routes / trip times for a set of stops (configurable). 

Retrieves information from the OCTranspo API every minute. With a normal api key with a 10,000 request limit, 6 stops can be displayed 24/7
Keys can be created at: [Developer Signup](https://octranspo-new.3scale.net/signup)

## Building

Ensure all tauri dependencies are installed on your machine correctly [here](https://tauri.app/v1/guides/getting-started/prerequisites/) as well as npm

Tested for building on windows 10 machines.

From project root:
1. ```npm install```
2. ```npm run tauri build```

## Pull Requests

Any and all feedback / bugs reports are welcome

## App Layout
[App Layout](https://imgur.com/a/TL9D2nG)

## Recommended Exentions

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
