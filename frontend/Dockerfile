# Step 1: Use an Nginx image to serve the files
FROM nginx:alpine

# Step 2: Copy the custom Nginx configuration file into the container
COPY ./frontend/nginx.conf /etc/nginx/nginx.conf

# Step 3: Copy the frontend files (index.html, script.js) to the Nginx container's public directory
COPY ./frontend/ /usr/share/nginx/html

# Step 4: Expose the Nginx port
EXPOSE 80
