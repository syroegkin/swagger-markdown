# swagger-markdown

[![npm][npm-image]][npm-url] [![circle ci][circleci-image]][circleci-url]

CLI script to turn Swagger/OpenAPI specifications into Markdown files.
Supports Swagger 2.0 and OpenAPI 3.0.* formats. OpenAPI 3.1.* is not yet supported.

The version 2.0 is a breaking change. The project was rewritten in typescript.
Along with addressing multiple issues, it is more strict now with the openapi version. 
The `--force-version` flag is now obsolete and will be removed in a future release.

see [examples](https://github.com/syroegkin/swagger-markdown/tree/master/examples) folder

### Installation

```bash
npm install -g swagger-markdown
```

### Usage

```
swagger-markdown [-h] [-v] -i [-o] [--skip-info]

Options:
  -h, --help      Show this help message and exit.
  -v, --version   Show program's version number and exit.
  -i , --input    Path to the swagger yaml file
  -o , --output   Path to the resulting md file
  --skip-info     Skip the title, description, version etc, whatever is in the info block.
  --force-version [Deprecated] Set the document version, ignore version provided in the yaml file. Use with caution.

```

### Npx (requires no installation)

```bash
npx swagger-markdown -i ./basic-auth.yaml
```

#### Example

```bash
swagger-markdown -i path/to/swagger/file.yaml
```

By default it will create the new file within the same directory with the same name as swagger file but with .md extension.
So, if swagger file is placed in `project/api-doc/swagger.yaml` the new file will be created as `project/api-doc/swagger.md`

You can also use it as a npm script in your package.json:

```bash
npm i --save-dev swagger-markdown
```

```json
{
    "scripts": {
        "md-docs": "swagger-markdown -i path/to/swagger.yaml",
        //...
    }
}
```

```bash
npm run md-docs
```

### Related

* [swagger-markdown-ui](https://swagger-markdown-ui.netlify.app/) ([source](https://github.com/shaun-chiang/swagger-markdown-ui))

[npm-url]: https://www.npmjs.com/package/swagger-markdown
[npm-image]: https://img.shields.io/npm/v/swagger-markdown.svg

[circleci-url]: https://circleci.com/gh/syroegkin/swagger-markdown/tree/master
[circleci-image]: https://img.shields.io/circleci/project/syroegkin/swagger-markdown.svg
