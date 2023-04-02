FROM node:18-alpine

COPY . .

RUN npm install 
RUN npx tsc --project ./

EXPOSE 8000

CMD [ "node", "dist/server.js" ]