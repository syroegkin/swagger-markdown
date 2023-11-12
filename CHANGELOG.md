## [2.3.1](https://github.com/syroegkin/swagger-markdown/compare/v2.3.0...v2.3.1) (2023-11-11)


### Bug Fixes

* **chore:** technical release dependencies upgrade ([230e6b6](https://github.com/syroegkin/swagger-markdown/commit/230e6b67c40a3851e649622b5a69891d472b3492))

# [2.3.0](https://github.com/syroegkin/swagger-markdown/compare/v2.2.1...v2.3.0) (2023-04-30)


### Features

* **headers:** show headers in the response when present ([3f02648](https://github.com/syroegkin/swagger-markdown/commit/3f02648d1e937e0db7ae0fc8c4155ab7e7c125d3))
* **readability:** improve readability by inserting horizontal lines between blocks ([94f17ab](https://github.com/syroegkin/swagger-markdown/commit/94f17abfac5517afd931c5f66f68841a62412c2f))

## [2.2.1](https://github.com/syroegkin/swagger-markdown/compare/v2.2.0...v2.2.1) (2023-04-14)


### Bug Fixes

* correct problem of broken build caused by scattered files in multiple directories ([fdac96c](https://github.com/syroegkin/swagger-markdown/commit/fdac96c8220888f1cc70dd53e8151d66fe32ef47)), closes [#169](https://github.com/syroegkin/swagger-markdown/issues/169)

# [2.2.0](https://github.com/syroegkin/swagger-markdown/compare/v2.1.0...v2.2.0) (2023-04-14)


### Features

* **schemes:** display schemes if present in the path ([bbf610a](https://github.com/syroegkin/swagger-markdown/commit/bbf610a80e8d5f3f7f47d2da56d247dd2e865a6e))

# [2.1.0](https://github.com/syroegkin/swagger-markdown/compare/v2.0.1...v2.1.0) (2023-04-07)


### Features

* **deprecated:** respect deprecated flag in the path description ([c3466df](https://github.com/syroegkin/swagger-markdown/commit/c3466dfa7feb054893f5ee9036a6e3665fb9dd27))
* **externaldocs:** support external docs in the path ([8fee911](https://github.com/syroegkin/swagger-markdown/commit/8fee9116a0542ef1cb4a1b4aea5a45d6dd0b90d8))
* **schemes:** add schemes to the document ([7963c18](https://github.com/syroegkin/swagger-markdown/commit/7963c182951a621870c13e7c522dc89dd0f24f85))
* **schemes:** make schemes in bold ([b0877c1](https://github.com/syroegkin/swagger-markdown/commit/b0877c1f4bc068037f324edad95d2c738eeb430e))

## [2.0.1](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0...v2.0.1) (2023-03-07)


### Bug Fixes

* **validation:** add additional validations ([73aeaf8](https://github.com/syroegkin/swagger-markdown/commit/73aeaf81e6038a0078fdda23bf74e14712f52fa1)), closes [#198](https://github.com/syroegkin/swagger-markdown/issues/198)

# [2.0.0](https://github.com/syroegkin/swagger-markdown/compare/v1.4.6...v2.0.0) (2022-12-27)


### Bug Fixes

* **argparse:** fix argparse to respect the recent version ([2b71a91](https://github.com/syroegkin/swagger-markdown/commit/2b71a91814309d66b049e94d929e9a381bfed93a))
* **build:** fix binary build ([13e0051](https://github.com/syroegkin/swagger-markdown/commit/13e0051094511231b94cdd4e15773220e2e2ae1c))
* **build:** introduce webpack for the binary build ([f94b1e0](https://github.com/syroegkin/swagger-markdown/commit/f94b1e08075c5ca7fa2f5e332af391977f8e50cc))
* **build:** make it one single file so it will work as a binary ([df6b03e](https://github.com/syroegkin/swagger-markdown/commit/df6b03ef84ff2a5436dee643bdb2f51bdc6cca14))
* **build:** retire webpack after a long serve ([7b43a4f](https://github.com/syroegkin/swagger-markdown/commit/7b43a4fac9485f3977127a97fcd1bc85b6cdf9ad))
* **datatypes:** use md class instead of direct markup ([77785cb](https://github.com/syroegkin/swagger-markdown/commit/77785cb1c9b9e9e5be2ea75b8b7312ce4b5dcf18))
* **definitions:** use md classes instead of direct markdown ([7388984](https://github.com/syroegkin/swagger-markdown/commit/738898405d2c15c0ff95830bf355f7c65b3c51b9))
* **dummy:** dummy commit to re-run semantic-release job ([6efe709](https://github.com/syroegkin/swagger-markdown/commit/6efe7098daf7535928fcabcaf1f4a48cbde21676))
* **examples:** fix examples table headers ([5748eea](https://github.com/syroegkin/swagger-markdown/commit/5748eea523949eba3f659d69c3f00254dc15bb92))
* **examples:** update examples to have nicer tables for securiry definitions ([1d7435b](https://github.com/syroegkin/swagger-markdown/commit/1d7435b8f5711c235f451a69b60f05a723cea25d))
* fix export name ([180485a](https://github.com/syroegkin/swagger-markdown/commit/180485a9841a77852b44bc5bf41ffc9d00637580))
* include files with types ([391dbc7](https://github.com/syroegkin/swagger-markdown/commit/391dbc792be2a14498154d96ebb440638c6ad808))
* **instagram:** fix instagram yaml specs ([1a5d0c2](https://github.com/syroegkin/swagger-markdown/commit/1a5d0c24bdbd0e3f025cd6ab17ac400fdd940a76))
* markdownlint is in use ([da46f0a](https://github.com/syroegkin/swagger-markdown/commit/da46f0a881a5fbb2bb81c3b09ef92673ff27159f))
* **pathparameters:** path parameters to use md class instead of direct markup ([a62a3b7](https://github.com/syroegkin/swagger-markdown/commit/a62a3b7b7c059be3c32018c39bf7e5b61a60eab4))
* **paths:** use md class instead of direct markup ([746babb](https://github.com/syroegkin/swagger-markdown/commit/746babbed8019856b72a9d1e4c2d5ec8a2cf74af))
* **patresponses:** make path responses use md class instead of direct markup ([07063ac](https://github.com/syroegkin/swagger-markdown/commit/07063ac7c8081790694837a1500f45620d65732d))
* **references:** fix partialr dereference ([f1bcc7f](https://github.com/syroegkin/swagger-markdown/commit/f1bcc7f6cb2b65f9a3a335c15647409fa0f80883))
* **securitydefinitions:** use md class instead of direct header hashes ([7f9d373](https://github.com/syroegkin/swagger-markdown/commit/7f9d37376dc960b5eca7b310fa2b5f537a8e8690))
* **security:** security to use md classes instead of direct markdown ([ef886cc](https://github.com/syroegkin/swagger-markdown/commit/ef886ccb4c1af7396960f59d68a4a51fd4cf05c3))
* **tables:** make number of dashes to match header length ([73b6182](https://github.com/syroegkin/swagger-markdown/commit/73b61826b90d111726f631d2187c50c729e6a236))


### Code Refactoring

* **filenames:** rename main files to make it expose an api in the future ([44fc7fc](https://github.com/syroegkin/swagger-markdown/commit/44fc7fcb55beafd60573cf874f7dc66c41dfde6d))


### Features

* add ts-node ([0b12ae3](https://github.com/syroegkin/swagger-markdown/commit/0b12ae37c5083af805369bcaf68cc1c60170c16a))
* contact -> typescript ([9426bc5](https://github.com/syroegkin/swagger-markdown/commit/9426bc5311cdfa2d23b135dbbbd7f41a03c224a8))
* **force-version:** add temporary solution for v3 documents ([1160f4e](https://github.com/syroegkin/swagger-markdown/commit/1160f4e5505d4c9e02cfb100a2bae5c99afd57ed))
* make examples to typescript ([856f4d4](https://github.com/syroegkin/swagger-markdown/commit/856f4d4dbc0b259a2151bc012279e2eaae84fd37))
* **mdstring:** add concat method, which allows to concatenate strings and mdstrings ([764c59f](https://github.com/syroegkin/swagger-markdown/commit/764c59f3d9effd39b643f5d0976d1464ecbd3d31))
* **mdstring:** add length property ([9b6f331](https://github.com/syroegkin/swagger-markdown/commit/9b6f331a0eeb72d42f6ca425b3ed729cfdfc69f1))
* **schema:** improve schema representations for an objects ([e1c477d](https://github.com/syroegkin/swagger-markdown/commit/e1c477d69bb5567da7f148204d7872f63315333d)), closes [#130](https://github.com/syroegkin/swagger-markdown/issues/130)
* **tags:** group paths by tags if provided ([4a38ad6](https://github.com/syroegkin/swagger-markdown/commit/4a38ad6638be216c13cfd1076449017b7f952b04)), closes [#188](https://github.com/syroegkin/swagger-markdown/issues/188)
* **typescript:** turn it to ts ([8d51e84](https://github.com/syroegkin/swagger-markdown/commit/8d51e8433b253850b786f81fff14ae2a46659b3b))
* **version:** detect document version ([a1087a7](https://github.com/syroegkin/swagger-markdown/commit/a1087a7c825db76ea4df345b44058a2a84475fdf))


### BREAKING CHANGES

* **filenames:** the main executable file has been renamed, index.js is now swagger-markdown.js. no
changes if used via npx (npx swagger-markdown). may not work with browser implementations tho
* **version:** It won't process document with newer syntax, it requires now to have the document
version specified
* **typescript:** start to rewrite code to ts so it will be maintainable

# [2.0.0-beta.15](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2022-12-27)


### Features

* **force-version:** add temporary solution for v3 documents ([1160f4e](https://github.com/syroegkin/swagger-markdown/commit/1160f4e5505d4c9e02cfb100a2bae5c99afd57ed))

# [2.0.0-beta.14](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2022-12-27)


### Bug Fixes

* **instagram:** fix instagram yaml specs ([1a5d0c2](https://github.com/syroegkin/swagger-markdown/commit/1a5d0c24bdbd0e3f025cd6ab17ac400fdd940a76))

# [2.0.0-beta.13](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2022-12-27)


### Features

* **tags:** group paths by tags if provided ([4a38ad6](https://github.com/syroegkin/swagger-markdown/commit/4a38ad6638be216c13cfd1076449017b7f952b04)), closes [#188](https://github.com/syroegkin/swagger-markdown/issues/188)

# [2.0.0-beta.12](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2022-12-26)


### Bug Fixes

* **build:** retire webpack after a long serve ([7b43a4f](https://github.com/syroegkin/swagger-markdown/commit/7b43a4fac9485f3977127a97fcd1bc85b6cdf9ad))

# [2.0.0-beta.11](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2022-12-26)


### Bug Fixes

* **build:** fix binary build ([13e0051](https://github.com/syroegkin/swagger-markdown/commit/13e0051094511231b94cdd4e15773220e2e2ae1c))

# [2.0.0-beta.10](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2022-12-26)


### Bug Fixes

* **build:** introduce webpack for the binary build ([f94b1e0](https://github.com/syroegkin/swagger-markdown/commit/f94b1e08075c5ca7fa2f5e332af391977f8e50cc))

# [2.0.0-beta.9](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2022-12-26)


### Bug Fixes

* **build:** make it one single file so it will work as a binary ([df6b03e](https://github.com/syroegkin/swagger-markdown/commit/df6b03ef84ff2a5436dee643bdb2f51bdc6cca14))

# [2.0.0-beta.8](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2022-12-26)


### Code Refactoring

* **filenames:** rename main files to make it expose an api in the future ([44fc7fc](https://github.com/syroegkin/swagger-markdown/commit/44fc7fcb55beafd60573cf874f7dc66c41dfde6d))


### BREAKING CHANGES

* **filenames:** the main executable file has been renamed, index.js is now swagger-markdown.js. no
changes if used via npx (npx swagger-markdown). may not work with browser implementations tho

# [2.0.0-beta.7](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2022-12-25)


### Features

* **schema:** improve schema representations for an objects ([e1c477d](https://github.com/syroegkin/swagger-markdown/commit/e1c477d69bb5567da7f148204d7872f63315333d)), closes [#130](https://github.com/syroegkin/swagger-markdown/issues/130)

# [2.0.0-beta.6](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2022-12-25)


### Bug Fixes

* **definitions:** use md classes instead of direct markdown ([7388984](https://github.com/syroegkin/swagger-markdown/commit/738898405d2c15c0ff95830bf355f7c65b3c51b9))
* **examples:** update examples to have nicer tables for securiry definitions ([1d7435b](https://github.com/syroegkin/swagger-markdown/commit/1d7435b8f5711c235f451a69b60f05a723cea25d))
* **security:** security to use md classes instead of direct markdown ([ef886cc](https://github.com/syroegkin/swagger-markdown/commit/ef886ccb4c1af7396960f59d68a4a51fd4cf05c3))

# [2.0.0-beta.5](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2022-12-24)


### Bug Fixes

* **patresponses:** make path responses use md class instead of direct markup ([07063ac](https://github.com/syroegkin/swagger-markdown/commit/07063ac7c8081790694837a1500f45620d65732d))


### Features

* **mdstring:** add concat method, which allows to concatenate strings and mdstrings ([764c59f](https://github.com/syroegkin/swagger-markdown/commit/764c59f3d9effd39b643f5d0976d1464ecbd3d31))

# [2.0.0-beta.4](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2022-12-24)


### Bug Fixes

* **examples:** fix examples table headers ([5748eea](https://github.com/syroegkin/swagger-markdown/commit/5748eea523949eba3f659d69c3f00254dc15bb92))
* **pathparameters:** path parameters to use md class instead of direct markup ([a62a3b7](https://github.com/syroegkin/swagger-markdown/commit/a62a3b7b7c059be3c32018c39bf7e5b61a60eab4))
* **tables:** make number of dashes to match header length ([73b6182](https://github.com/syroegkin/swagger-markdown/commit/73b61826b90d111726f631d2187c50c729e6a236))

# [2.0.0-beta.3](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2022-12-24)


### Bug Fixes

* **dummy:** dummy commit to re-run semantic-release job ([6efe709](https://github.com/syroegkin/swagger-markdown/commit/6efe7098daf7535928fcabcaf1f4a48cbde21676))

# [2.0.0-beta.2](https://github.com/syroegkin/swagger-markdown/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-12-24)


### Bug Fixes

* **datatypes:** use md class instead of direct markup ([77785cb](https://github.com/syroegkin/swagger-markdown/commit/77785cb1c9b9e9e5be2ea75b8b7312ce4b5dcf18))
* **paths:** use md class instead of direct markup ([746babb](https://github.com/syroegkin/swagger-markdown/commit/746babbed8019856b72a9d1e4c2d5ec8a2cf74af))
* **securitydefinitions:** use md class instead of direct header hashes ([7f9d373](https://github.com/syroegkin/swagger-markdown/commit/7f9d37376dc960b5eca7b310fa2b5f537a8e8690))


### Features

* **mdstring:** add length property ([9b6f331](https://github.com/syroegkin/swagger-markdown/commit/9b6f331a0eeb72d42f6ca425b3ed729cfdfc69f1))

# [2.0.0-beta.1](https://github.com/syroegkin/swagger-markdown/compare/v1.4.4...v2.0.0-beta.1) (2022-05-22)


### Bug Fixes

* **argparse:** fix argparse to respect the recent version ([2b71a91](https://github.com/syroegkin/swagger-markdown/commit/2b71a91814309d66b049e94d929e9a381bfed93a))
* fix export name ([180485a](https://github.com/syroegkin/swagger-markdown/commit/180485a9841a77852b44bc5bf41ffc9d00637580))
* include files with types ([391dbc7](https://github.com/syroegkin/swagger-markdown/commit/391dbc792be2a14498154d96ebb440638c6ad808))
* markdownlint is in use ([da46f0a](https://github.com/syroegkin/swagger-markdown/commit/da46f0a881a5fbb2bb81c3b09ef92673ff27159f))
* **references:** fix partialr dereference ([f1bcc7f](https://github.com/syroegkin/swagger-markdown/commit/f1bcc7f6cb2b65f9a3a335c15647409fa0f80883))


### Features

* add ts-node ([0b12ae3](https://github.com/syroegkin/swagger-markdown/commit/0b12ae37c5083af805369bcaf68cc1c60170c16a))
* contact -> typescript ([9426bc5](https://github.com/syroegkin/swagger-markdown/commit/9426bc5311cdfa2d23b135dbbbd7f41a03c224a8))
* make examples to typescript ([856f4d4](https://github.com/syroegkin/swagger-markdown/commit/856f4d4dbc0b259a2151bc012279e2eaae84fd37))
* **typescript:** turn it to ts ([8d51e84](https://github.com/syroegkin/swagger-markdown/commit/8d51e8433b253850b786f81fff14ae2a46659b3b))
* **version:** detect document version ([a1087a7](https://github.com/syroegkin/swagger-markdown/commit/a1087a7c825db76ea4df345b44058a2a84475fdf))


### BREAKING CHANGES

* **version:** It won't process document with newer syntax, it requires now to have the document
version specified
* **typescript:** start to rewrite code to ts so it will be maintainable

## [1.4.4](https://github.com/syroegkin/swagger-markdown/compare/v1.4.3...v1.4.4) (2021-11-07)


### Bug Fixes

* replace map with forEach ([a0f07ba](https://github.com/syroegkin/swagger-markdown/commit/a0f07bad543a893729e8f754a8687acda199a827))

## [1.4.3](https://github.com/syroegkin/swagger-markdown/compare/v1.4.2...v1.4.3) (2020-10-04)


### Bug Fixes

* fix dot issue with anchor ([77f11f5](https://github.com/syroegkin/swagger-markdown/commit/77f11f5ac7f4ddbed4b0859867fd147eba16354e)), closes [#152](https://github.com/syroegkin/swagger-markdown/issues/152)

## [1.4.2](https://github.com/syroegkin/swagger-markdown/compare/v1.4.1...v1.4.2) (2020-07-19)


### Bug Fixes

* **partiallydereference:** must use Object.assign as spread wont make it go through during the build ([7e28af0](https://github.com/syroegkin/swagger-markdown/commit/7e28af028eeea85f2bebcce335dba1c9254c416a))

## [1.4.1](https://github.com/syroegkin/swagger-markdown/compare/v1.4.0...v1.4.1) (2020-07-19)


### Bug Fixes

* **partiallyDereference:** shallow copy node ([c7f3564](https://github.com/syroegkin/swagger-markdown/commit/c7f3564d7baad6c575ceb307471fc4efad578fa8))

# [1.4.0](https://github.com/syroegkin/swagger-markdown/compare/v1.3.0...v1.4.0) (2020-07-04)


### Bug Fixes

* escape pipe character in text ([463e9ff](https://github.com/syroegkin/swagger-markdown/commit/463e9ff29dddbc90a68ded5e6f070ca234f61168))


### Features

* prettify narkdown documents ([47e1352](https://github.com/syroegkin/swagger-markdown/commit/47e13526aef31e97c2823f40250e86c84d0b8da8))

# [1.3.0](https://github.com/syroegkin/swagger-markdown/compare/v1.2.0...v1.3.0) (2020-07-03)


### Features

* append schema example and enum values to description ([766f20f](https://github.com/syroegkin/swagger-markdown/commit/766f20fab2bcb314249e01c6ccca84d19032968e))
* show examples for path and model definitions ([37d62b5](https://github.com/syroegkin/swagger-markdown/commit/37d62b565ce7b95ebefd3f4f0aefb58db67b7f60))
* use swagger-parser to resolve $refs ([6dfc6cc](https://github.com/syroegkin/swagger-markdown/commit/6dfc6ccc90bca22f314f5feae97522711ddc5a54))

# [1.2.0](https://github.com/syroegkin/swagger-markdown/compare/v1.1.7...v1.2.0) (2019-06-24)


### Features

* resolve multiple properties with allOf ([9fae4dc](https://github.com/syroegkin/swagger-markdown/commit/9fae4dc))

## [1.0.1](https://github.com/syroegkin/swagger-markdown/compare/v1.0.0...v1.0.1) (2019-06-01)


### Bug Fixes

* force release (hack) ([ae48f63](https://github.com/syroegkin/swagger-markdown/commit/ae48f63))

# 1.1.6 (2019-06-01)


### Bug Fixes

* package.json to reduce vulnerabilities ([422e0f0](https://github.com/syroegkin/swagger-markdown/commit/422e0f0))
* security types should handle objects ([9189823](https://github.com/syroegkin/swagger-markdown/commit/9189823))
* **definitions:** avoid undefined ([714c912](https://github.com/syroegkin/swagger-markdown/commit/714c912))
* **definitions:** Replace newlines with spaces in table ([ad72a3b](https://github.com/syroegkin/swagger-markdown/commit/ad72a3b))
* **package:** change gitlab plugin to github ([d8e6b49](https://github.com/syroegkin/swagger-markdown/commit/d8e6b49))
