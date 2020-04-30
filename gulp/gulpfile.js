// Adiciona os módulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

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
gulp.task('sass', compilaSass);

/* ------------------------------- BrowserSync ------------------------------ */
// Função para iniciar o Browser
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};

gulp.task('browserSync', browser);

/* ------------------------------- Gulp-Concat ------------------------------ */
// Função que concatena arquivos Javascript
function gulpJs() {
    return gulp.src('js/assets_js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js/'));
}

gulp.task('mainJs', gulpJs);

/* ------------------------------- Watch Sass/BrowserSync ------------------------------- */
// Função de Watch do Gulp
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch('js/*.js', gulpJs);
    gulp.watch('*.html').on('change', browserSync.reload);
};
gulp.task('watch', watch);


/* --------------------------------- Default -------------------------------- */

gulp.task('default', gulp.parallel('watch', 'browserSync'));
