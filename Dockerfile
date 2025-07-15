# Use uma imagem base do Node.js
FROM node:24.4.0

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copie os arquivos package.json e package-lock.json (se existirem)
COPY package*.json ./

RUN npm i tsx --legacy-peer-deps

# Instale as dependências, incluindo as de desenvolvimento (tsx está listado nas devDependencies)
RUN npm install --legacy-peer-deps

# Copie o restante do código-fonte da aplicação
COPY . .

# Configurar Prisma, se necessário
RUN npx prisma generate

# Exponha a porta que a aplicação vai ouvir
EXPOSE 4300

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]