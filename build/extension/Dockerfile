FROM scratch

LABEL org.opencontainers.image.title="Portainer" \
    org.opencontainers.image.description="Portainer extension for Docker Desktop." \
    org.opencontainers.image.vendor="Portainer.io" \
    com.docker.desktop.extension.api.version="20.10.12"

COPY build/extension/metadata.json .
COPY build/extension/docker-compose.yml .
COPY dist /
COPY dist/public /
