var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    addsrc = require('gulp-add-src'),
    handlebars = require('gulp-compile-handlebars'),
    fs = require('fs'),
    rename = require('gulp-rename'),
    del = require("del");


/**
 * Minify and combine JS files, including jQuery and Bootstrap
 */

const options = {
    ignorePartials: true,
    batch: ['src/index-partials'],
};

const compileIndex = (done) => {
    const data = JSON.parse(fs.readFileSync('src/data/data.json', 'utf8'));
    gulp.src(['src/index.hbs'])
        .pipe(handlebars(data, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
    done();
};

const compileScript = (done) => {
    gulp.src([
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'src/js/**/*.js'
        ])
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'));
    done();
}

const compileStyle = (done) => {
    gulp.src([
            'src/sass/main.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(addsrc.prepend('node_modules/bootstrap/dist/css/bootstrap.css'))
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
    done()
}

/**
 * Move bootstrap and project font files into dist
 */
const compileFont = (done) => {
    gulp.src([
            'node_modules/bootstrap/dist/fonts/*',
            'src/fonts/*'
        ])
        .pipe(gulp.dest('dist/fonts'));
    done()
}


// Clean assets
const clean = () => {
    return del(['./dist/', './pages/']);
}


// Watch changes in the files
gulp.task('default', function() {
    // Compile all files first
    gulp.task('default', gulp.series(clean, compileScript, compileStyle, compileFont, compileIndex))
        // Watch the index.hbs, page.hbs, partials 
    gulp.watch([
        'src/data/data.json',
        'src/index.hbs',
        'src/index-partials/*.hbs'
    ], gulp.series(compileIndex));
    // Watch the main.scss stylesheet
    gulp.watch('src/sass/main.scss', gulp.series(compileStyle));

})