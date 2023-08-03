.PHONY: migrate clean start run
typeorm = ts-node ./node_modules/.bin/typeorm

build: $(wildcard *.ts) $(wildcard src/**/*.ts) $(wildcard src/*.ts) tsconfig.json ormconfig.js node_modules
	tsc
	touch build

node_modules: package.json package-lock.json
	npm install
	touch node_modules

#start is just an alias for run
start: run

run: build
	cd build; node index.js

migrate: build
	${typeorm} migration:run

migration-show: build
	${typeorm} migration:show

migration-generate: build
	${info ${typeorm} migration:generate -n <name>}

run-dev:
	ts-node src/index.ts

watch: migrate
	tsc -w

.PHONY: models
models:
	npx typeorm-model-generator
	$(info See ./output for entities generated from db defined in ./tomg-config)
	
clean:
	rm -rf ./build
