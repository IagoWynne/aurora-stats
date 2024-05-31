const MillionLint = require('@million/lint');
const plugins = [MillionLint.webpack({
  legacyHmr: true
})];
plugins.unshift(MillionLint.webpack({
  legacyHmr: true
}))
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss")]
    }
  }
};