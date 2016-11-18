'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    copy = require('gulp-copy'),
    cp = require('child_process');

gulp.task('css', function() {
    return gulp.src('_dev/sass/**/*.?(s)css')
        .pipe(sass({ outputStyle: 'compressed'}))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('jekyll', function(code) {
    return cp.spawn('jekyll', ['build',
            '--config', '_config.yml,_config_dev.yml',
            '--watch',
            '--incremental',
            '--drafts'
        ], {stdio: 'inherit'})
        .on('error', function(error){
            gutil.log(gutil.colors.red(error.message));
        })
        .on('close', code);
});

gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'));

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'));
});

gulp.task('server', function() {
    connect.server({
        root: ['_site'],
        port: 4000
    });
});

gulp.task('watch', function() {
   gulp.watch('_dev/sass/**/*.?(s)css', ['css']);
});

gulp.task('default', [
    'copy',
    'css',
    'jekyll',
    'server',
    'watch'
]);