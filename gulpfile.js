const gulp = require('gulp')
const eslint = require('gulp-eslint')

/* Lint - avaliação dos códigos */
gulp.task('eslint', callback => {
    const { appSrc } = 'src/'
    return gulp.src(`${appSrc}**/*.js`)
        .pipe(eslint())
        .pipe(eslint.format())
})
