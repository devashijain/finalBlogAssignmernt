var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function(){

browserify('./public/js/components/MainLayout.js')
        .transform('reactify')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'))

});


gulp.task('copy', function(){

  gulp.src('public/*.html')
       .pipe(gulp.dest('dist'));
   gulp.src('public/css/*.*')
       .pipe(gulp.dest('dist/css'));
   gulp.src('public/javascripts/*.*')
       .pipe(gulp.dest('dist/js'));
   gulp.src('public/fonts/*.*')
           .pipe(gulp.dest('dist/fonts'));
     
});

gulp.task('default',['browserify','copy'],function(){
   return gulp.watch('public/**/*.*',['browserify','copy']);
});
