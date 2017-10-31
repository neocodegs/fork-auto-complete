module.exports = {
  build: {
    options: {
      style: 'expanded',
      noCache: true,
      sourcemap: 'none'
    },
    files: {
      '<%= files.css.main.out %>': ['<%= files.css.main.src %>']
    }
  }
};