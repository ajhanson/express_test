var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var jsFiles = ['*.js', 'src/**/*.js'];
var watchFiles = ['src/**/*.ejs', 'src/config/strategies/*.strategy'];

gulp.task('test', function () {
    return gulp.src('test/*.js')
        .pipe(mocha());
});

gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {
        read: false
    });

    var injectOptions = {
        ignorePath: '/public/'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public/'
    };

    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['test', 'style', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 8080
        },
        watch: watchFiles.concat(jsFiles)
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
});
