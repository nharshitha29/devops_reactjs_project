FROM cgr.dev/chainguard/node
WORKDIR /app
COPY . /app
RUN npm ci
EXPOSE 5000
CMD ["server.js"]