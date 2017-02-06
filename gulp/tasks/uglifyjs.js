const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('uglifyjs', () => {
  pump([
    gulp.src('build/app.js'),
    uglify(),
    gulp.dest('build'),
  ]);
});
