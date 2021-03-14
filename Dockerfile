FROM node:14
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 1500
CMD npm run start
