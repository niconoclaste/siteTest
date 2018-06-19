// Gulpfile
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const src = './src/';
const dist = './dist/';
const repo = '../niconoclaste.jp/';

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
	.pipe(plugins.replace('	', '  '))
	.pipe(gulp.dest(dist));
});

gulp.task('pug', function(){
	gulp.src(src + '**/*.pug')
	.pipe(plugins.pug({
		pretty: true
    }))
	.pipe(gulp.dest(src));
});

gulp.task('images', function(){
	gulp.src(src + 'img/**/*.{png,jpg,JPG,jpeg,gif,svg}')
	.pipe(plugins.imagemin())
	.pipe(gulp.dest(dist + 'img'));
});

gulp.task('export', function(){
	gulp.src(dist + '**/*')
    .pipe(gulp.dest(repo));
});

gulp.task('watch', function(){
	gulp.watch(src + '**/*.scss', ['css']);
	gulp.watch([dist + '**/*.css', '!' + dist + '**/*.min.css'], ['css']);
	gulp.watch(src + '**/*.pug', ['pug']);
	gulp.watch(src + '**/*.html', ['html']);
	gulp.watch([src + 'js/**/*.js', '!' + src + 'js/**/*.min.js'], ['js']);
});



/* GULP V4 */
// gulp.task('watch', gulp.series(function() {
// 	gulp.watch(src + '**/*.scss', ['css']);
// 	gulp.watch([dist + '**/*.css', '!' + dist + '**/*.min.css'], ['css']);
// 	gulp.watch(src + '**/*.pug', ['pug']);
// 	gulp.watch(src + '**/*.html', ['html']);
// 	gulp.watch([src + 'js/**/*.js', '!' + src + 'js/**/*.min.js'], ['js']);
// }));


/* 
GULP V3
gulp.task(name, deps, func)
gulp.task('default', ['css','js','html','images']);


GULP V4
gulp.task(name, gulp.{series|parallel}(deps, func))
gulp.task('default', gulp.series(['css','js','html','images']));
*/

gulp.task('default', ['css','js','html','images']);