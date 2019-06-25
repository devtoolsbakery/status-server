npm install --production
./node_modules/.bin/tsc
cp src/core/infrastructure/DependencyInjection/*.yaml ./dist/src/core/infrastructure/DependencyInjection
cd ./dist
