install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npm run build & npx start-server -s ./frontend/build

build:
	npm run build

lint-frontend:
	make -C frontend lint

deploy:
	git push heroku main
