var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    })
});

// Copy JS to src
gulp.task('javascript', function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/clipboard/dist/clipboard.min.js'
        ])
        .pipe(gulp.dest('src/js'))
});

// Copy vendor css to src
gulp.task('vendorCss', function() {
    return gulp.src([
            'src/css/**/*.css'
        ])
        .pipe(gulp.dest('dist/css'))
});

// Compile sass to css
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


// Watchers
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

// Optimization Tasks
// ------------------

// Optimize CSS and JS
gulp.task('useref', function() {
    return gulp.src([
            'src/*.html',
            '!src/_boilerplate-desktop.html',
            '!src/_boilerplate-mobile.html'
        ]) // Grabs CSS and JS from HTML document
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify())) // Minifies only if it's a js file
        .pipe(gulpIf('*.css', cssnano())) // Minifies only if it's a css file
        .pipe(gulp.dest('dist'))
});

// Optimize images
gulp.task('images', function() {
    return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin({
            interlaced: true
        })) // refer to https://github.com/sindresorhus/gulp-imagemin for optimization options available based on file type.
        .pipe(gulp.dest('dist/images'))
});

// Clean Dist
gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
        return cache.clearAll(cb);
    });
})

gulp.task('clean:dist', function() {
    return del.sync('dist/**/*');
});

// Build Sequence
// --------------
gulp.task('default', function(callback) {
    runSequence(['javascript', 'sass', 'browserSync'], 'watch',
        callback
    )
});

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'sass', ['useref', 'vendorCss', 'images'],
        callback
    )
});
