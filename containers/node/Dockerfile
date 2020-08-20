FROM node:12

ENV APP_ROOT /opt/app/

WORKDIR $APP_ROOT
RUN mkdir -p $APP_ROOT
COPY package*.json $APP_ROOT
RUN npm i --quiet
COPY . $APP_ROOT
COPY ./containers/wait-for-it.sh /usr/local
RUN chmod +x /usr/local/wait-for-it.sh

EXPOSE 8080

CMD ["npm", "start"]
