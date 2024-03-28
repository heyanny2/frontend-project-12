install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start

start:
	make start-backend & make start-frontend

build:
	npm run build

lint-frontend:
	make -C frontend lint

deploy:
	git push heroku main
