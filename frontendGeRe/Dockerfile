FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN RUN npm run build -- --configuration production --output-path=dist --progress=false --stats-json --budgets=null

FROM nginx:alpine
COPY --from=build /app/dist/frontend-ge-re /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80