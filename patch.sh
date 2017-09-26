#!/bin/bash
cd "./src/modules"

rm -rf "./api" && cp -r "../../node_modules/@kuwas/app.angular.ts/src/modules/api" "./"
rm -rf "./commons" && cp -r "../../node_modules/@kuwas/app.angular.ts/src/modules/commons" "./"
rm -rf "./translate" && cp -r "../../node_modules/@kuwas/app.angular.ts/src/modules/translate" "./"

find ./api -iname "*.spec.*" | xargs -I {} rm -rf {}
find ./commons -iname "*.spec.*" | xargs -I {} rm -rf {}
find ./translate -iname "*.spec.*" | xargs -I {} rm -rf {}
