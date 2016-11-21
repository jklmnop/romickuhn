'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    header = require('gulp-header'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    copy = require('gulp-copy'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    cp = require('child_process');

gulp.task('css', function() {
    return gulp.src('_dev/sass/**/*.?(s)css')
        .pipe(sass({ outputStyle: 'compressed'}))
        //inject front matter into final file for jekyll liquid
        .pipe(header('---\n---\n'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function(){
   return gulp.src('_dev/js/*.js')
       .pipe(gulp.dest('assets/js'));
});

gulp.task('img', function(){
   return gulp.src('_dev/img/*')
       .pipe(imagemin({
           progressive: true,
           optimizationLevel: 1
       }))
       .pipe(gulp.dest('assets/img'));
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

    gulp.src(['node_modules/jquery-smooth-scroll/src/jquery.smooth-scroll.js'])
        .pipe(gulp.dest('vendor/jquery-smooth-scroll'));
});

gulp.task('server', function() {
    connect.server({
        root: ['_site'],
        port: 4000
    });
});

gulp.task('watch', function() {
   gulp.watch('_dev/sass/**/*.?(s)css', ['css']);
    gulp.watch('_dev/js/*.js', ['js']);
    gulp.watch('_dev/img/*', ['img']);
});

gulp.task('default', [
    'copy',
    'css',
    'js',
    'img',
    'jekyll',
    'server',
    'watch'
]);