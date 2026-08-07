@echo off
title BVDKHM Proposal v2 - Milestone 2
cd /d "%~dp0"
start "" http://localhost:8080
python -m http.server 8080
