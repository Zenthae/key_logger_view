const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        inherit: 'inherit',
      },
      boxShadow: {
        DEFAULT:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 1px 1px 2px 0 rgba(0, 0, 0, 0.50)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // https://github.com/tailwindlabs/tailwindcss-forms
    require('@tailwindcss/forms'),
  ],
};
