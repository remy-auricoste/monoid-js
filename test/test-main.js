var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}
console.log("loading test-main.js");
requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src/js',

    paths: {
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
