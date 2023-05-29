# syntax=docker/dockerfile:1.4

FROM node:18 AS Production

# Create NGmed_App directory
WORKDIR /usr/src/NGmed_App

COPY package.json /usr/src/NGmed_App/package.json
COPY package-lock.json /usr/src/NGmed_App/package-lock.json
# RUN npm ci

COPY . /usr/src/NGmed_App

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

# FROM development as dev-envs
# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF
# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /
# CMD [ "npm", "run", "dev" ]