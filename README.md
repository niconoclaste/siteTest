# NicoNoClaste.jp rewriting test

This repo is for a study purpose. New job means new tools, new tools means that I need to update myself!
So I will use this repo to rewrite my homepage according to thoses tools.

## Tools list

The following list shows the tools I will use for this site :

* Github & Source Tree
* Gulp
* SASS (SCSS)
* SMACSS
* ES6

### Github & Source Tree

I Will use [https://github.com/niconoclaste/niconoclaste.jp](https://github.com/niconoclaste/niconoclaste.jp) as a repo for my  test.

### Gulp

Here is the settings I use on my **gulpfile.js** file :

```
/ Gulpfile
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const src = './src/';
const dist = './dist/';


gulp.task('css', function(){
	gulp.src(src + '**/*.scss')
	.pipe(plugins.sass({
		style: 'expanded'
	}))
	//.pipe(plugins.csscomb())
	.pipe(plugins.autoprefixer({
        browsers: ['last 2 versions']
    }))
	.pipe(plugins.cssbeautify({
		indent: '	'
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

gulp.task('js', function() {
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
	.pipe(gulp.dest(dist));
});
gulp.task('images', function(){
	gulp.src(src + 'img/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(dist + 'img'));
});


gulp.task('watch', function() {
	gulp.watch(src + '**/*.scss', ['css']);
	gulp.watch([dist + '**/*.css', '!' + dist + '**/*.min.css'], ['css']);
	gulp.watch(src + '**/*.html', ['html']);
	gulp.watch([src + 'js/**/*.js', '!' + src + 'js/**/*.min.js'], ['js']);
});

gulp.task('default', ['css','js','html','images']);
```
