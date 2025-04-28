# Step 1: Use an Nginx image to serve the files
FROM nginx:alpine

# Step 2: Copy the built frontend files to the Nginx container's public directory
COPY ./frontend /usr/share/nginx/html

# Step 3: Expose the Nginx port
EXPOSE 80
