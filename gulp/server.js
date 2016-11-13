var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

gulp.task('dev:server', function(){
    nodemon({
    script: 'index.js',
    ext: 'js',
    ignore: ['gulp*']
    })
})
