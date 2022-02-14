Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
        SetHttpHandler(function(req, res)
            local path = req.path
            if req.method == "POST" then
                if req.path == '/restart' then
                    req.setDataHandler(function(body)
                        data = json.decode(body)
                        if data.api_key == Config.apiKey and data.target_script ~= nil then
                            print("[i] Restarting " .. data.target_script)
                            res.send(json.encode({
                                success = true,
                                message = string.format("Restarting script %s...", data.target_script)
                            })) 
                            ExecuteCommand("ensure "..data.target_script)
                        else
                            res.send(json.encode({
                                success = false,
                                message = "Invalid API key or target script"
                            }))
                        end
                    end)
                elseif req.path == "/start" then
                    req.setDataHandler(function(body)
                        data = json.decode(body)
                        if data.api_key == Config.apiKey and data.target_script ~= nil then
                            print("[i] Starting " .. data.target_script)
                            res.send(json.encode({
                                success = true,
                                message = string.format("Starting script %s...", data.target_script)
                            })) 
                            ExecuteCommand("ensure "..data.target_script)
                        else
                            res.send(json.encode({
                                success = false,
                                message = "Invalid API key or target script"
                            }))
                        end
                    end)
                elseif req.path == "/stop" then
                    req.setDataHandler(function(body)
                        data = json.decode(body)
                        if data.api_key == Config.apiKey and data.target_script ~= nil then
                            print("[i] Stopping " .. data.target_script)
                            res.send(json.encode({
                                success = true,
                                message = string.format("Stopping script %s...", data.target_script)
                            })) 
                            ExecuteCommand("stop "..data.target_script)
                        else
                            res.send(json.encode({
                                success = false,
                                message = "Invalid API key or target script"
                            }))
                        end
                    end)
                end
                return
            end
        end)
    end
end)

--[[

    add_ace resource.cfxcli_server command.restart allow
    add_ace resource.cfxcli_server command.start allow
    add_ace resource.cfxcli_server command.ensure allow
    add_ace resource.cfxcli_server command.stop allow

]]