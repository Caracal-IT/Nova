FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY server.crt /etc/nginx/conf.d/server.crt
COPY server.csr /etc/nginx/conf.d/server.csr
COPY server.key /etc/nginx/conf.d/server.key
COPY .htpasswd  /etc/nginx/conf.d/.htpasswd