FROM node:16.13.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock .eslintrc.js ./
RUN yarn
COPY . ./
ENV REACT_APP_HASURA_HOST=home.bizbuzim.info
ENV REACT_APP_HASURA_PORT=443
ENV REACT_APP_AUTH0_DOMAIN=dev-t26fnn6n.us.auth0.com
ENV REACT_APP_AUTH0_CLIENT_ID=rvfbp70WRjSBzOVeu1EigjRXEMmOCDBM

RUN yarn run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
