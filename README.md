# Starter Markup Kit

In this repository there is a simple landing page of one of my clients.

SCSS files are processed without using huge `node-sass`, `precss` is used for this.
The `node_modules` directory has a size of `123MB`. (my previous repository [start-markup-sass](https://github.com/fivemru/start-markup-sass)).

However, it should be noted that sass features such as `@function` or `map-get` are not supported.

## Demo

https://fivemru.github.io/start-markup-scss/

## Main tools

- `webpack 4`
- `babel 7`
- `pug`
- `precss` for use Sass-like markup
- `cssnano` for css minify
- `svg-sprite-loader` for creating SVG sprites.
- `svgo` for optimizing SVG files
- `imagemin-webpack-plugin` for compress images in production
- `prettier`
- `eslint`
- `husky`

## Browser support

ie >= 11

## Concept

### Pages

The entry point of each page is set in the file:

- `pages.config.js`

### Paths

- `pug`

  The path has resolved in **`./src` folder**.

  ```pug
  require('blocks/item/file.ext')
  ```

- `scss`

  The path has resolved in **current folder** of `__ITEM__` in `(layouts|pages|blocks)`.

  ```pug
  require('./file.ext')
  ```

---

### Images

Put all image files in `(layouts|pages|blocks)/__ITEM__/(`**images**`/)?*.(png|jpe?g)`

---

### SVG

#### SVG sprite

Put files in `(layouts|pages|blocks)/__ITEM__/`**sprite**`/*.svg`

- `pug`

  ```pug
  //- +svg-sprite(file, width, height, fill, stroke)
  +svg-sprite(require('blocks/footer/sprite/place.svg'), 20, 20)
  ```

#### SVG image

Put files in `(layouts|pages|blocks)/__ITEM__/(`**images**`/)?*.svg`

- `pug`

  ```pug
  img(src=require('blocks/logo/logo.svg')
  //- or
  img(src=require('blocks/logo/images/logo.svg')
  ```

- `scss`

  ```
  background-image: url('./logo.svg')
  background-image: url('./images/logo.svg')
  ```

#### Inline, into html

Put files in `(layouts|pages|blocks)/__ITEM__/`**inline**`/*.svg`

- `pug`

  ```pug
  //- svg-inline(content, width, height, fill, stroke)
  +svg-inline(require('blocks/menu/inline/file.svg'), 20, 20)
  ```
