({
    baseUrl : 'src',
    out: 'dist/appraisals.min.js',
    name: 'appraisals',
    skipModuleInsertion: true,
    paths: {
        'common': 'empty:',
        'appraisals/vendor/ui-router': 'appraisals/vendor/angular-ui-router.min'
    }
})
