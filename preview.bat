@echo off
title BVDKHM De an V2 - Milestone 5 RC1
cd /d "%~dp0"
start "" http://localhost:8080
python -m http.server 8080
