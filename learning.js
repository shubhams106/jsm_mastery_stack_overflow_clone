// for code formatting

// npm i eslint-config-standard
// npm run lint

//npm i eslint-plugin-tailwindcss
//npm i eslint-config-prettier
// npm i prettier

"dependencies": {
  "eslint-config-prettier": "^9.0.0",
  "eslint-config-standard": "^17.1.0",
  "eslint-plugin-tailwindcss": "^3.13.0",
  "prettier": "^3.0.3",
},
"devDependencies": {
"eslint": "^8",
    "eslint-config-next": "14.0.1",
}
.eslintrc.json

  {
    "extends": ["next/core-web-vitals", "standard", "plugin:tailwindcss/recommended", "prettier"]
  }
  

  

//  settings.json file open user settings crtl+shift+ p
  {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.addMissingImports": true
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
  }

//taiwind setup

  // npm i tailwindcss-animate @tailwindcss/typography