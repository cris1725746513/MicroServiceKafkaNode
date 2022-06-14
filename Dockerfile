FROM registry.semaphoreci.com/node:16
# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /var/log/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

# Bundle app source


EXPOSE 3000
CMD [ "npm", "start" ]