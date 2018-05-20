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

EXPOSE 8080
CMD [ "npm", "start" ]