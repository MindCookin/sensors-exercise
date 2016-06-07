FROM node

WORKDIR /home/mean

RUN npm i -g bower

ADD package.json /home/mean/package.json
RUN npm i

ADD .bowerrc /home/mean/.bowerrc
ADD bower.json /home/mean/bower.json
RUN bower i --config.interactive=false --allow-root

ADD . /home/mean
RUN npm run build:front

EXPOSE 3000

CMD ["npm","start"]
