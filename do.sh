
cd technical-test/app

rm -rf dist

rm -rf uploads

cp .env.production .env

cd ../docker

docker-compose build

docker-compose up -d

docker exec -it logique-app-app-1 yarn migrate-mongo up