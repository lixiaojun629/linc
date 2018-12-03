FROM node:8.11.3

RUN npm install -g prettier@1.13.7 
RUN npm install -g eslint@5.1.0 
RUN npm install -g babel-eslint@10.0.1 
RUN npm install -g eslint-plugin-jsx-a11y@6.1.2 
RUN npm install -g eslint-plugin-import@2.14.0
RUN npm install -g eslint-plugin-prettier@2.6.2 
RUN npm install -g eslint-plugin-react@7.10.0
RUN npm install -g eslint-config-prettier@2.9.0 
RUN npm install -g eslint-config-airbnb@16.1.0 
RUN npm install -g @ucloud-fe/linc@0.1.1 
