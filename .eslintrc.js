var path = require('path');

module.exports = {
  "extends": "eslint-config-airbnb",
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "rules": {
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/no-unresolved": 0,

    "max-len": 0,

    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 1,
    "react/prop-types": 0,
    "camelcase" : 0
  },
  "plugins": [
    "react"
  ],
  "settings": {
    "import/resolver": {
      "eslint-import-resolver-webpack": {
        "config": path.resolve("./webpack.config.js")      }
    }
  }
}
