var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	cleancss = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	filter = require('gulp-filter'),
	debug = require('gulp-debug'),
	browsersync = require('browser-sync').create(),
	bowerfiles = require('main-bower-files');
	
var filterJS = filter('**/*.js'),
	filterCSS = filter('**/*.css');

	
gulp.task('default', ['serve']);

gulp.task('serve', ['jade', 'sass'], function() {
	browsersync.init({
		server: {
			baseDir: 'app'
		},
		port: 3200,
		open: 'local',
		browser: ['google chrome'],
	});

	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch(['app/*.js']).on('change', browsersync.reload);
	gulp.watch('app/templates/**/*.jade', ['jade']);
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('app/css'))
		.pipe(browsersync.stream());
});

gulp.task('jade', function() {
	return gulp.src('app/templates/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('app/'))
		.pipe(browsersync.stream());
});

gulp.task('js', function() {
	gulp.src('app/*.js')
		.pipe(gulp.dest('./'))
		.pipe(browsersync.stream());
});

gulp.task('bower', ['bower:js', 'bower:css']);

gulp.task('bower:js', function() {
	return gulp.src(bowerfiles())
		.pipe(filterJS)
		.pipe(debug({ title: 'js' }))
		.pipe(concat('app/scripts/vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./'));
});

gulp.task('bower:css', function() {
	return gulp.src(bowerfiles())
		.pipe(filterCSS)
		.pipe(debug({ title: 'css' }))
		.pipe(concat('app/css/vendor.min.css'))
		.pipe(cleancss())
		.pipe(gulp.dest('./'));
});