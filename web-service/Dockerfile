FROM node:alpine

ADD package.json /tmp/package.json
RUN set -ex \
	&& cd /tmp \
	&& apk add --no-cache --virtual .gyp \
           python \
           make \
           g++ \
	&& npm config set registry https://registry.npm.taobao.org \
	&& npm install \
	&& apk del .gyp \
	&& mkdir -p /home/app \
	&& cp -a /tmp/node_modules /home/app/ \
	&& rm -rf /tmp/*

WORKDIR /home/app

ADD . /home/app

ENV NODE_ENV="production" PORT=3001
EXPOSE 3001

CMD ["npm", "run", "server"]