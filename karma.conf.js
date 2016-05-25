//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './client',

    files: [
      '../public/bower_components/angular/angular.js',
      '../public/bower_components/angular-animate/angular-animate.js',
      '../public/bower_components/angular-resource/angular-resource.js',
      '../public/bower_components/angular-route/angular-route.js',
      '../public/bower_components/angular-mocks/angular-mocks.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
