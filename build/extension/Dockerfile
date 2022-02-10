FROM portainer/base

LABEL org.opencontainers.image.title="Portainer" \
    org.opencontainers.image.description="Portainer extension for Docker Desktop." \
    org.opencontainers.image.vendor="Portainer.io" \
    com.docker.desktop.extension.api.version="0.0.1"

WORKDIR /

COPY build/extension/metadata.json .
COPY build/extension/docker-compose.yml .
COPY build/extension/Dockerfile . 
COPY dist /
COPY dist/public /

EXPOSE 9000
EXPOSE 9443
EXPOSE 8000

ENTRYPOINT ["/portainer"]








