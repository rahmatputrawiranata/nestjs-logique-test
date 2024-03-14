
cd technical-test/app

rm -rf node_modules

rm -rf dist

rm -rf uploads

cp .env.production .env

cd ../docker

docker-compose build

docker-compose up -d

cd ../app

yarn install

yarn migrate-mongo up