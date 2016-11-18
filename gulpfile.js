'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cp = require('child_process');

gulp.task('css', function() {
    return gulp.src('_dev/sass/**/*.?(s)css')
        .pipe(sass({ outputStyle: 'compressed'}))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('jekyll', function(code) {
    return cp.spawn('jekyll', ['build', '--watch', '--incremental', '--drafts'], {stdio: 'inherit'})
        .on('error', function(error){
            gutil.log(gutil.colors.red(error.message));
        })
        .on('close', code);
});

gulp.task('server', function() {
    connect.server({
        root: ['_site'],
        port: 4000
    });
});

gulp.task('watch', function() {
   gulp.watch('sass/**/*.?(s)css', ['css']);
});

gulp.task('default', [
    'css',
    'jekyll',
    'server',
    'watch'
]);