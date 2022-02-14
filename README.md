# CFXCLI - Extension installation guide
## 1. Installing the extension to vscode

 Open PowerShell and enter the command below

```
code --install-extension ./cfxcli-commands-0.0.5.vsix
```
# 2. Configuration
 1. Open your project workspace.
 2. Open vscode Settings ( default: ctrl + , ) .
 3. Go to section `cfxcli Configuration`.
 4. Set `Cfxcli: ip` to `http://{your_server_ip}:{your_server_port}/cfxcli_server`.
 5. Set `Cfxcli: Api_key` to the key you set up in the`Config.lua` of `cfxcli_server` resource.

# 3. Usage
### 1. Open Command Palette ( default: f1 )
Type `cfxcli` and select wanted action :
 - Start current resource
 - Stop current resource
 - Restart current resource

