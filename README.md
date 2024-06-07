# SeeWeBuilder

## Development

```sh
nvm use
corepack enable
```

```sh
yarn && yarn start
```

## Deployment to github pages, what???

1. In `./package.json` change the `homepage` field to your
   github pages url.

   ```json
   {
     "homepage": "https://<username>.github.io/<repo-name>"
   }
   ```

2. Just run the following commands:

    ```sh
    yarn build-bundle
    yarn deploy
    ```

That's it! Your app is now live on github pages on the url you specified in
`homepage` field. The app is deployed to the `gh-pages` branch of your repo.
