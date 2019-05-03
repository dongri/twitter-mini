#!/bin/bash

electron-icon-maker --input=./assets/twitter-mini.png --output=./assets
mv ./assets/icons/mac/* ./assets/icons
mv ./assets/icons/win/* ./assets/icons
mv ./assets/icons/png/* ./assets/icons
rm -rf ./assets/icons/mac
rm -rf ./assets/icons/win
rm -rf ./assets/icons/png
