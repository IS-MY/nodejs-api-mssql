FROM mhart/alpine-node:6
#FROM node:boron

# Create app directory
#WORKDIR /usr/src/app
WORKDIR /src
ADD . .

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install

# Bundle app source
COPY . .

ENV PORT 8080
ENV HOST localhost
ENV NODE_ENV dev

EXPOSE 8080
CMD [ "node", "server.js" ]