module.exports = {
  getProjectPath: function () {
   return process.cwd()
      .replace(/\/node_modules\/angular-multiplatform/g, '')
      .replace(/\\node_modules\\angular-multiplatform/g, '');
  },
};
