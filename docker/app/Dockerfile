FROM node:22-bookworm

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json

CMD bash -c "npm install && npm install --save pg pg-hstore && \ 
    cd database && npx sequelize-cli db:migrate && \
    cd .. && \
    node index.js"

