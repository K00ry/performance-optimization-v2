'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssConcat = require('gulp-concat-css'),
    maps = require('gulp-sourcemaps'),
    del = require('del'),
    imagin = require('gulp-image'),
    cssUgly= require('gulp-uglifycss');





gulp.task("concatScripts", function() {
    return gulp.src(['js/jquery.js',
            'js/fastclick.js',
            'js/foundation.js',
            'js/foundation.equalizer.js',
            'js/foundation.reveal.js',
            'js/scripts.js'
        ]).pipe(maps.init())
        .pipe(concat("app.js"))
        .pipe(maps.write('./'))
        .pipe(gulp.dest("js"));

});

gulp.task("uglifier", ["concatScripts"], function() {
    return gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest('js'));


});
gulp.task("cssifire", function() {

   return gulp.src([
        'css/normalize.css'
        , 'css/foundation.css'
        , 'css/basics.css'
        , 'css/menu.css'
        , 'css/hero.css'
        , 'css/photo-grid.css'
        , 'css/modals.css'
        , 'css/footer.css'
        , 'css/small-icon-pics.css'
    ])
    	.pipe(maps.init())
        .pipe(cssConcat("styles.css"))
        .pipe(maps.write('./'))
        .pipe(gulp.dest("css"));
});

gulp.task("minifyCSS", ["cssifire"], function() {
  return gulp.src("css/styles.css")
    .pipe(cssUgly())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('css'));
});


// gulp.task("imagMin", function() {
//     gulp.src('img/**/*')
//         .pipe(imagin())
//         .pipe(gulp.dest('dist/images'))
// });

// gulp.task("watchFiles", function(){
// 	gulp.watch("app.js")
// });

gulp.task('clean', function() {
    del(['dist', "css/styles*.css*", 'js/app*.js*']);

});


gulp.task("build", ["uglifier", "minifyCSS"], function() {
    return gulp.src(["css/styles.min.css", 'js/app.min.js', "index.html"], { base: './' })
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function() {
    gulp.start("build");
});


