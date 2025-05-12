# # Stage 1: Build the frontend
# FROM node:18 AS build
# WORKDIR /app

# # Copy frontend source code
# COPY . .

# # Install dependencies and build the app
# RUN npm install
# RUN npm build --configuration production --inline-fonts=false


# # Stage 2: Serve with Nginx
# FROM nginx:stable-alpine

# # Copy custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy the build output to Nginx's html directory
# # Use build or dist based on your framework (React = build/, Vite/Vue = dist/)
# COPY --from=build /app/dist/frontend-ge-re  /usr/share/nginx/html

# # Expose port (optional for debugging or running standalone)
# EXPOSE 80

# # Start Nginx (default command)
# CMD ["nginx", "-g", "daemon off;"]
FROM node:20.1.0-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install
RUN npm run build --prod


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container 
# the app will be using Port 80 while running
EXPOSE 80