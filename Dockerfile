FROM node:10.15.3
COPY . /app
WORKDIR /app
RUN yarn install
EXPOSE 1500
CMD yarn serve
