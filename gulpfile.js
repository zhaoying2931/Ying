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

const data = JSON.parse(fs.readFileSync('src/data/data.json', 'utf8'));


const compileIndex = (done) => {
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

/**
 * Build individual pages based on the data.json file
 */
const buildPages = (done) => {
    const pages = data['projects'].map((d) => {
        // Right here, we return a function per country
        return () =>
            gulp.src(['src/page.hbs'])
            .pipe(handlebars(d, options))
            .pipe(rename('index.html'))
            .pipe(gulp.dest('pages/' + d.slug));
    });

    return gulp.series(...pages, (seriesDone) => {
        seriesDone();
        done();
    })();
}

// Clean assets
const clean = () => {
    return del(['./dist/', './pages/']);
}


// Compile all files on init 
gulp.task('default', gulp.series(clean, compileScript, compileStyle, compileFont, compileIndex, buildPages))
    // Watch changes in the files
gulp.task('watch', function() {
    // Watch the index.hbs, page.hbs, partials 
    gulp.watch([
        'src/index.hbs',
        'src/index-partials/*.hbs',
        'src/page.hbs'
    ], gulp.series(compileIndex, buildPages));
    // Watch the main.scss stylesheet
    gulp.watch('src/sass/main.scss', gulp.series(compileStyle));

})