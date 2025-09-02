FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/

EXPOSE 80


# docker build -t nginx-html . 
# docker run --name nginx-contt -d -p 5000:80 nginx-html