FROM node:alpine

ADD package.json /tmp/package.json

RUN echo http://mirrors.ustc.edu.cn/alpine/v3.6/main > /etc/apk/repositories; \
echo http://mirrors.ustc.edu.cn/alpine/v3.6/community >> /etc/apk/repositories

RUN set -ex \
	&& cd /tmp \
	&& apk update \
	&& apk add --no-cache --virtual .gyp \
           python \
           make \
           g++ \
	&& npm install --registry=https://registry.npm.taobao.org --production \
	&& apk del .gyp \
	&& mkdir -p /home/app \
	&& cp -a /tmp/node_modules /home/app/ \
	&& rm -rf /tmp/*

WORKDIR /home/app

ADD . /home/app

EXPOSE 3001

CMD ["npm", "run", "server"]