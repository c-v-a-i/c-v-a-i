# SeeWeBuilder

## Development setup 

```sh
nvm use
corepack enable
```

Install mongodb docker container and PostgreSQL docker container. 
Check `server/.env.development` to get info about the ports  




Run the containers with the databases
```sh
docker-compose up -d
```


Then, perform the database migrations.
```sh
yarn server migration:run
```


```sh
yarn && yarn dev
```

