
# Create image based on the official Node image from dockerhub
FROM node:16 AS Production

# Create NGmed_App directory
WORKDIR /usr/src/NGmed_App

# Copy dependency definitions
COPY package.json /usr/src/NGmed_App
COPY package-lock.json /usr/src/NGmed_App

# Get all the code needed to run the NGmed_App not inatalltion of packages they are coppied
COPY . /usr/src/NGmed_App

# Expose the port the NGmed_App runs in
EXPOSE 3000

# Serve the NGmed_App
CMD ["npm", "start"]

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
# install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /
# CMD [ "npm", "start" ]