# Quick GUI for Redis

## Environment Setup

### Windows

#### Install and Run Redis

Install Chocolatey

- Visit the Chocolatey install page: [https://chocolatey.org/install](https://chocolatey.org/install)
- Note: The CMD.exe install method tends to work the best across all versions of Windows

Install Redis Server/Client

- In an elevated command prompt (run as Administrator):
  - `choco install redis-64`

Run Redis Server

- In a regular command prompt:
  - `redis-server`

#### Install node.js and NPM

- Visit the node.js install page: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Note: Download the latest LTS 64-bit installer

#### Download Application Code

- Download the code through the generated ZIP file: [https://github.com/thehouseplant/redis-gui/archive/master.zip](https://github.com/thehouseplant/redis-gui/archive/master.zip)

#### Install and Run Application

- Navigate to the folder where you extracted the application ZIP file
- In a regular command prompt:
  - `npm install`
  - `node server.js`
- Navigate to [http://localhost:3000](http://localhost:3000) in your browser of choice