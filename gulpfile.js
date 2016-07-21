/*----------  Packages  ----------*/

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var inject       = require('gulp-inject');



/*----------  Configuration  ----------*/

var config = {
    src: {
        sass: 'assets/style/**/*.scss',
        css: 'assets/style',
        cssFile: 'assets/style/style.css',
        cssMin: 'dist/style.css',
        icons: 'assets/icons/**/*.svg',
        js: 'assets/js/**/*.jsx',
        jsFolder: 'assets/js',
        jsMin: 'dist/all.js',
        jsMinFileName: 'all.js',
        index: 'index.html',
        dist: 'dist'
    }
};



/*----------  Tasks  ----------*/

// Main tasks
gulp.task('dev', ['browser-sync', 'watch', 'inject-dev']);
gulp.task('build', ['minify-js', 'minify-css', 'inject-build']);

// Sass
gulp.task('sass', function(){
    return gulp.src(config.src.sass)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.src.css))
            .pipe(browserSync.stream());
});

// Browser sync
gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: './'
        },
        online: true
    });
});

// Watch sass & html for live-reload
gulp.task('watch', function(){
    gulp.watch(config.src.sass, ['sass']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch(config.src.js, ['inject-dev']);
});

// JS compression
gulp.task('minify-js', function(){
    return gulp.src(config.src.js)
            .pipe(concat(config.src.jsMinFileName))
            .pipe(uglify())
            .pipe(gulp.dest(config.src.dist));
});

// CSS compression
gulp.task('minify-css', function(){
    return gulp.src(config.src.sass)
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(gulp.dest(config.src.dist));
});

// Inject dev (js & css)
gulp.task('inject-dev', function(){
    return gulp.src(config.src.index)
            .pipe(inject(gulp.src([config.src.js, config.src.cssFile], { read: false })))
            .pipe(gulp.dest('./'));
});

// Inject build (js & css)
gulp.task('inject-build', function(){
    return gulp.src(config.src.index)
            .pipe(inject(gulp.src([config.src.jsMin, config.src.cssMin], { read: false })))
            .pipe(gulp.dest('./'));
});