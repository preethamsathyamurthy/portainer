all: ui backend remove build install

ui:
	yarn build:client

backend:
	docker build -t portainer/portainer-ce:2.25 -f build/linux/Dockerfile .

remove:
	-docker extension remove portainer-docker-extension

build:
	docker build -t portainer-docker-extension -f build/extension/Dockerfile .
	
install:
	docker extension install portainer-docker-extension

