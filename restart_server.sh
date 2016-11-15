#!/usr/bin/env bash
sudo killall nodejs
echo "Stopping Server"
sudo nohup nodejs app.js &
echo "Server Restarted"
exit
