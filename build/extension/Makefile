all: ui backend remove extension install

ui:
	yarn build:client

backend:
	docker build -t portainer/portainer-docker-extension:2.12.0 -f build/linux/Dockerfile .

remove:
	-docker extension remove portainer-docker-extension

extension:
	docker build -t portainer-docker-extension -f build/extension/Dockerfile .
	
install:
	docker extension install portainer-docker-extension
