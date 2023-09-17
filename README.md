# Pokedex

![Nest.js Version](https://img.shields.io/badge/Nest.js-v7.0.0-green.svg)
[![GitHub license](https://img.shields.io/github/license/angelstchavez/NestJS-pokedex?color=blue)](https://github.com/angelstchavez/NestJS-pokedex/blob/main/LICENSE)
![GitHub stars](https://img.shields.io/github/stars/angelstchavez/NestJS-pokedex?style=social)
![GitHub issues](https://img.shields.io/github/issues/angelstchavez/NestJS-pokedex?color=red)
![GitHub pull requests](https://img.shields.io/github/issues-pr/angelstchavez/NestJS-pokedex?color=green)

![NestJS Logo](https://nestjs.com/img/logo_text.svg)


## Stack

- MongoDB
- Nest.js

## Ejecución en desarrollo

Siga estos pasos para ejecutar el proyecto en modo de desarrollo:

1. Clonar el repositorio:

```
git clone https://github.com/angelstchavez/NestJS-pokedex.git
```
2. Instalar las dependencias utilizando Yarn:
```
cd NestJS-pokedex
yarn install
```
3. Asegúrese de tener Nest CLI instalado globalmente:
```
npm install -g @nestjs/cli
```
4. Iniciar la base de datos:
```
docker compose up -d
```
5. Ejecutar la aplicación en modo de desarrollo:
```
yarn start:dev
```
## Ejecución en producción

Siga estos pasos para ejecutar el proyecto en modo de producción:

1. Clonar el repositorio y asegurarse de que las dependencias están instaladas.

2. Iniciar la base de datos en producción.

3. Ejecutar la aplicación en modo de producción:
```
yarn start:prod
```
