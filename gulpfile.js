var
    gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    size         = require('gulp-size'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso         = require('gulp-csso'),
    uglify       = require ('gulp-uglifyjs');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'build'
        },
        startPath: 'index.html'
    });
});

gulp.task('scripts', function() {
    return gulp.src([
        'scripts'
    ])
        .pipe(uglify())
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('sass', function(){
    return gulp.src('src/style/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(
            ['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }
        ))
        .pipe(csso())
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build'))
});




gulp.task('watch', ['sass', 'scripts', 'pug'], function () {
    gulp.watch('dev/sass/**/*.scss', ['sass']);
    gulp.watch('dev/js-modules/*.js', ['scripts']);
    gulp.watch('dev/templates/*.pug', ['pug']);
    gulp.watch('build/*.html', browserSync.reload);
});


gulp.task('build', ['sass']);


gulp.task('default', ['watch', 'build', 'browser-sync']);


