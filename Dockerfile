FROM node:8.11.3

RUN npm install -g prettier@1.15.2
RUN npm install -g eslint@4.19.1
RUN npm install -g babel-eslint@8.2.6
RUN npm install -g eslint-plugin-jsx-a11y@6.1.2
RUN npm install -g eslint-plugin-import@2.14.0
RUN npm install -g eslint-plugin-prettier@2.7.0
RUN npm install -g eslint-plugin-react@7.11.1
RUN npm install -g eslint-config-prettier@2.10.0
RUN npm install -g eslint-config-airbnb@16.1.0
RUN npm install -g @ucloud-fe/linc@0.1.1
