FROM mhart/alpine-node:10
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
# Bundle app
COPY . .
EXPOSE 3000
# Run app
CMD ["node", "app.js"]