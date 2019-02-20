
default: start-test
.PHONY: start-test start-docker system-config dist

start-test:
	./start.sh

start-docker:
	docker stop nodemon-test || true
	# docker rm nodemon-test || true
	docker run -it --rm \
		--name nodemon-test \
		-p3099:3000 \
		--volume "$(shell pwd)":/opt/code \
		--workdir /opt/code \
		node:10.5.0-alpine \
		/opt/code/docker_init

system-config:
	@echo "" > system-config.log 2>&1 || true
	@echo "\n\n## nodemon -v\n" >> system-config.log
	nodemon -v >> system-config.log 2>&1 || true
	@echo "\n\n## node -v\n" >> system-config.log
	node -v >> system-config.log 2>&1 || true
	@echo "\n\n## uname -v\n" >> system-config.log
	uname -v >> system-config.log 2>&1 || true
	@echo "\n\n## port installed\n" >> system-config.log
	port installed >> system-config.log 2>&1 || true
	@echo "\n\n## npm ls\n" >> system-config.log
	npm ls >> system-config.log 2>&1 || true

dist:
	mkdir -p dist
	rm dist/nodemon-test.zip || true
	ls | grep -v node_modules | grep -v dist | grep -v pack.sh | zip -@ dist/nodemon-test.zip
