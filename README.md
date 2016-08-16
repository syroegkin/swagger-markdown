swagger-markdown
================

[![CircleCI](https://circleci.com/gh/syroegkin/swagger-markdown/tree/master.svg?style=svg)](https://circleci.com/gh/syroegkin/swagger-markdown/tree/master)

CLI script to turn swagger yaml into markdown files

see [examples](https://github.com/syroegkin/swagger-markdown/tree/master/examples) folder

###Installation

    npm install -g swagger-markdown

###Usage
```javascript
swagger-markdown -i path/to/swagger/file.yaml
```
By default it will create the new file within the same directory with the same name as swagger file but with .md extension.
So, if swagger file is placed in `project/api-doc/swagger.yaml` the new file will be created as `project/api-doc/swagger.md`

You can also use it as a npm script in your package.json:

    npm i --save-dev swagger-markdown
    
```json
{
    "scripts": {
        "md-docs": "swagger-markdown -i path/to/swagger.yaml",
        ...
    }
}
```

    npm run md-docs

***in development***

