# CFXCLI_SERVER - Install instructions

## Add to server.cfg

```
add_ace resource.cfxcli_server command.restart allow
add_ace resource.cfxcli_server command.start allow
add_ace resource.cfxcli_server command.ensure allow
add_ace resource.cfxcli_server command.stop allow
ensure cfxcli_server
```
## Change API_KEY in Config.lua!
For best security please change the key to at least 16 char random string!