#!/bin/bash
cd "./src/modules"

rm -rf "./api" && cp -r "../../node_modules/@kuwas/app.angular.ts/src/modules/api" "./"
rm -rf "./commons" && cp -r "../../node_modules/@kuwas/app.angular.ts/src/modules/commons" "./"
rm -rf "./helpers" && cp -r "../../node_modules/@kuwas/app.angular.ts/src/modules/helpers" "./"
rm -rf "./streams" && cp -r "../../node_modules/@kuwas/app.angular.ts/src/modules/streams" "./"
rm -rf "./tests" && cp -r "../../node_modules/@kuwas/app.angular.ts/src/modules/tests" "./"
rm -rf "./translate" && cp -r "../../node_modules/@kuwas/app.angular.ts/src/modules/translate" "./"

find ./api -iname "*.spec.*" | xargs -I {} rm -rf {}
find ./commons -iname "*.spec.*" | xargs -I {} rm -rf {}
find ./helpers -iname "*.spec.*" | xargs -I {} rm -rf {}
find ./streams -iname "*.spec.*" | xargs -I {} rm -rf {}
find ./tests -iname "*.spec.*" | xargs -I {} rm -rf {}
find ./translate -iname "*.spec.*" | xargs -I {} rm -rf {}
