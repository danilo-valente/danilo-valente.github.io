var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var concat = require('gulp-concat');

gulp.task('less', function () {
    return gulp.src('./less/styles.less')
        .pipe(concat('style.css'))
        .pipe(less())
        .on('error', function (err) {
            console.error(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest('./css'));
});

gulp.task('connect', ['less'], function () {
    connect.server({
        livereload: true
    });
});

gulp.task('refresh', function () {
    return gulp.src(['./**/*.html', './css/*.css', './js/*.js'])
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./less/**/*.less'], ['less']);
    gulp.watch(['./**/*.html', './css/*.css', './js/*.js', './content/**/*.*'], ['refresh']);
});

gulp.task('default', ['connect', 'watch']);
