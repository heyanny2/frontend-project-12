install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build

lint-frontend:
	make -C frontend lint

deploy:
	git push heroku main