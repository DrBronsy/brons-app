FROM node:15

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash
RUN apt-get install git-lfs

USER node

COPY --chown=node:node . .

RUN yarn
RUN yarn build:production

EXPOSE 7602