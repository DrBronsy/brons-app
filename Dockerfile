FROM node:15

WORKDIR /usr/src/app

COPY . .

RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash
RUN apt-get install git-lfs


RUN yarn
RUN yarn build:production

EXPOSE 7602

CMD yarn server