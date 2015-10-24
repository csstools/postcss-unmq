# UnMQ [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[UnMQ] removes media queries from CSS while preserving rules that match a hard-coded viewport. This can be useful for outputting desktop CSS for older browsers like Internet Explorer 8.

```css
/* before */

body {
    font-size: 12px;
}

@media screen and (max-width: 767px) {
    body {
        font-size: 16px;
    }
}

@media screen and (min-width: 768px) {
    body {
        color: #444;
    }
}

/* after */

body {
    font-size: 12px;
}

body {
    color: #444;
}
```

## Usage

Add [UnMQ] to your build tool:

```bash
npm install postcss-unmq --save-dev
```

#### Node

```js
require('postcss-unmq')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [UnMQ] as a PostCSS plugin:

```js
postcss([
    require('postcss-unmq')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [UnMQ] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-unmq')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [UnMQ] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-unmq')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

## Options

You can define your own viewport for media queries to be evaluated against. Think of the options as the current state of a device and browser.

```js
require('postcss-unmq')({
    // these are already the default options
    type: 'screen',
    width: 1024,
    height: 768,
    resolution: '1dppx',
    color: 3
})
```

If it’s not defined, `device-width` will be given the value of `width`, and `device-height` will be given the value of `height`. Similarly, `aspect-ratio` will be given the value of `device-width` divided by `device-height`.

[ci]: https://travis-ci.org/jonathantneal/postcss-unmq
[ci-img]: https://travis-ci.org/jonathantneal/postcss-unmq.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[UnMQ]: https://github.com/jonathantneal/postcss-unmq
