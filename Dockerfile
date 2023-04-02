FROM node:18-alpine
ARG MONGODB_SRV
ENV MONGODB_SRV=$MONGODB_SRV

COPY . .

RUN npm install 
RUN npx tsc --project ./

EXPOSE 8000

CMD [ "node", "dist/server.js" ]
