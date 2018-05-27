# NicoNoClaste.jp

*This repo is for a study purpose.*

For 5 years I worked for a small web agency. I used to code alone and was able to choose myself the tools I wanted to use.

New job means new tools, new tools means that I need to update myself !

So I will use this repo to rewrite my homepage using thoses tools.

## Tools list

* [GitHub & Source Tree](#github--source-tree)
* [Gulp](#gulp)
* SASS (SCSS)
* SMACSS
* ES6 (vanilla.js)
* view.js
* pug.js

### GitHub & Source Tree

I Will use [https://github.com/niconoclaste/niconoclaste.jp](https://github.com/niconoclaste/niconoclaste.jp) as a repo for my  test.

### Gulp

**package.json** :

```
  "devDependencies": {
    "babel-core": "latest",
    "babel-preset-env": "latest",
    "gulp": "latest",
    "gulp-autoprefixer": "latest",
    "gulp-babel": "latest",
    "gulp-concat": "latest",
    "gulp-cssbeautify": "latest",
    "gulp-csscomb": "latest",
    "gulp-csso": "latest",
    "gulp-imagemin": "latest",
    "gulp-load-plugins": "latest",
    "gulp-pug": "latest",
    "gulp-rename": "latest",
    "gulp-replace": "latest",
    "gulp-sass": "latest",
    "gulp-sync": "latest",
    "gulp-uglify": "latest"
  }
```

**gulpfile.js** :

```
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const src = './src/';
const dist = './dist/';

gulp.task('css', function(){
    gulp.src(src + '**/*.scss')
    .pipe(plugins.sass({
        style: 'expanded'
    }))
    .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(plugins.cssbeautify({
        indent: '    '
    }))
    .pipe(gulp.dest(src))
    .pipe(gulp.dest(dist));
    gulp.src([dist + '**/*.css', '!' + dist + '**/*.min.css'])
    .pipe(plugins.csso())
    .pipe(plugins.rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('js', function(){
    gulp.src([src + 'js/**/*.js', '!' + src + 'js/**/*.min.js'])
    .pipe(plugins.babel({
        presets: ['env']
    }))
    .pipe(gulp.dest(dist + 'js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(dist + 'js'));
    gulp.src(src + 'js/**/*.min.js')
    .pipe(gulp.dest(dist + 'js'));
});

gulp.task('html', function(){
    gulp.src(src + '**/*.html')
    .pipe(plugins.replace('    ', '  '))
    .pipe(gulp.dest(dist));
});

gulp.task('images', function(){
    gulp.src(src + 'img/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(dist + 'img'));
});

gulp.task('export', function(){
    gulp.src(dist + '**/')
    .pipe(gulp.dest(repo));
});

gulp.task('watch', function(){
    gulp.watch(src + '**/*.scss', ['css']);
    gulp.watch([dist + '**/*.css', '!' + dist + '**/*.min.css'], ['css']);
    gulp.watch(src + '**/*.html', ['html']);
    gulp.watch([src + 'js/**/*.js', '!' + src + 'js/**/*.min.js'], ['js']);
});

gulp.task('default', ['css','js','html','images']);
```
