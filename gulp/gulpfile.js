// Adiciona os módulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// import { src, dest, task, watch as _watch, parallel } from 'gulp';
// import sass from 'gulp-sass';
// import autoprefixer from 'gulp-autoprefixer';
// const browserSync = require('browser-sync').create();
// import concat from 'gulp-concat';
// import babel from 'gulp-babel';
// import uglify from 'gulp-uglify';

/* --------------------------------- Funções -------------------------------- */
/* ---------------------------------- Sass ---------------------------------- */
// Função para compilar Sass e adicionar prefixos
function compilaSass() {
    return gulp.src('css/scss/*.scss')
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
}
// EC6+ nome da task = nome da função
exports.compilaSass = compilaSass;

/* ------------------------------- BrowserSync ------------------------------ */
// Função para iniciar o Browser
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};
// EC6+ nome da task = nome da função
exports.browser = browser;
// EC6- gulp.task('browserSync', browser);

/* ------------------------------- Gulp-Concat / Gulp-Babel / Gulp-Uglify ------------------------------ */
// Função que concatena arquivos Javascript
function gulpJs() {
    return gulp.src('js/assets_js/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream());
}

// EC6+ nome da task = nome da função
// exports.gulpJs = gulpJs;

// Também posso definir o nome da task e função da mesma forma
exports.gulpJs = gulpJs;

/* ------------------------------- Watch Sass/BrowserSync ------------------------------- */
// Função de Watch do Gulp
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch('js/assets_js/*.js', gulpJs);
    gulp.watch('*.html').on('change', browserSync.reload);
};

// EC6+ nome da task = nome da função
exports.watch = watch;

/* --------------------------------- Default -------------------------------- */
// Posso especificar quais tasks devem ser iniciadas antes que a função Watch perceba alguma mudança, para que o programa funcione corretamente

// Ao especificar as taks que serão executadas mesmo já estando estas na função Watch, é garantido que tais códigos serão gerados pela primeira vez, caso não tenham sido, para que o código funcione corretamente

// EC6+
exports.default = gulp.parallel(watch, browser, compilaSass, gulpJs);
//EC6- gulp.task('default', gulp.parallel('watch', 'browserSync', 'sass', 'mainJs'));

