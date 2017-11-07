var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');

//Tasks
gulp.task('hello', function(){
    console.log('Hello');
})

/**
 * Compilation task 
 */
gulp.task('sass', function(){
    return gulp.src('app/styles/styles.scss') //get files
    .pipe(sass()) //using gulp-sass
    .pipe(gulp.dest('app/styles/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

/**
 * BrowserSync Task to reload server in case of changes
 */
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

/**
 * PugTaskCompilation to compile pug into html
 */
gulp.task('pugTranslate', function() {
    gulp.src('app/views/**/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(browserSync.reload({
        stream:true
    }))
    .pipe(gulp.dest('app/',{overwrite:true}))
});


/*
 * Watch task to verify the changes in the styles.sass file and
 * watch the changes in compiled docs
 */
gulp.task('watch',['browserSync', 'sass', 'pugTranslate'], function() {
    gulp.watch('app/views/*.pug', ['pugTranslate']);
    gulp.watch('app/styles/styles.scss', ['sass', browserSync.reload]);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})
