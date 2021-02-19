# pgframework-app-fastroute
pgframework with fastroute and route annotation

## Commande après git clone
**lignes de commande**
<code>
composer run-script post-root-package-install .
composer run-script post-create-project-cmd .
yarn .
</code>

## Test composer create-project
**lignes de commandes**  
<code>
composer create-project --repository-url=../pgframework-app/packages.json --remove-vcs willy68/pgframework-app .
</code>

**Fichier packages.json**  
```json
{
    "package": {
        "name": "willy68/pgframework-app",
        "version": "0.0.1",
        "source": {
          "url": "https://github.com/willy68/pgframework-app.git",
          "type": "git",
          "reference": "master"
        }
    }
 }
 ```