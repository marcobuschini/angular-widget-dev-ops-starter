[![Unit Testing](https://github.com/marcobuschini/angular-widget-dev-ops-starter/actions/workflows/unittest.yml/badge.svg)](https://github.com/marcobuschini/angular-widget-dev-ops-starter/actions/workflows/unittest.yml)
[![Building](https://github.com/marcobuschini/angular-widget-dev-ops-starter/actions/workflows/build.yml/badge.svg)](https://github.com/marcobuschini/angular-widget-dev-ops-starter/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/marcobuschini/angular-widget-dev-ops-starter/badge.svg)](https://coveralls.io/github/marcobuschini/angular-widget-dev-ops-starter)
[![Maintainability](https://qlty.sh/gh/marcobuschini/projects/angular-widget-dev-ops-starter/maintainability.svg)](https://qlty.sh/gh/marcobuschini/projects/angular-widget-dev-ops-starter)
[![Code Coverage](https://qlty.sh/gh/marcobuschini/projects/angular-widget-dev-ops-starter/coverage.svg)](https://qlty.sh/gh/marcobuschini/projects/angular-widget-dev-ops-starter)
[![Documentation](https://img.shields.io/badge/docs-read-brightgreen)](https://marcobuschini.github.io/angular-widget-dev-ops-starter/index.html)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen)](http://commitizen.github.io/cz-cli/)

# Parking Widget

## Specificaions

The goal is to show a collection of parking slots and let the user buy one. This must be a "Widget" because it should be an independent module that can be embedded in any Web application. I am an Angular developer, therefore I will write a reusable component for an Angular application.

The widget is composed of:

- a vendor area
- a parking slots area.

The _vendor_ area should list the features of the vendor in a togglable manner. It should act as a filter for parking slots.

The _parking slot_ area contains all the parking slots.

1. You should design parking slots as "blocks" aligned differently between desktop and mobile devices: horizontally on desktop devices and vertically on mobile ones.
1. Inside each parking slot you can insert the info about the parking slot itself.
1. A parking slot should be selectable by the user.
1. Clicking one of the parking slots in the Widget will add the parking slot to the shopping cart of the host Web app.
1. Add a button show/hide details (the map and the features list) of the selected parking slot

## Building

Before building the widget install all dependencies with the command:

```
npm install
```

To build the widget issue the following command from the root of the repository structure:

```
ng build widget
```

The project will be built in the `dist/widget` directory.

## Documentation

The widget's API documentation is available by clicking the `docs` badge at the beginning of this page.

The documentation can be generated with:

```
npm run compodoc
```

The generated documentation will be in the `docs` folder for interoperability
with GitHub Pages and the above link.

## Translating

The tool [ng-packgr](https://github.com/ng-packagr/ng-packagr) still does not support
exporting assets with the package so translations are not yet available with this
release. As soon as the relevant [pull request](https://github.com/ng-packagr/ng-packagr/pull/1465)
will be released it will be possible to resume work on this feature.

## Making it available

### The public way

Issue the command `npm publish` command after testing, and building the widget to
have it published in the default npm registry. You must be logged in the default
registry for this to work.

Then run `npm install parking-widget` to install in any project.

### The easy way

Copy the `dist/widget` folder in the `node_modules` folder of the destination project.
The demo project is already setup to get the package from that folder. Don't symlink it,
as it will not work that way!

### The hard way

You could install a local copy of an NPM registry (like Verdaccio from https://verdaccio.org/),
configure it, and start it. It must act as an NPM registry proxy, too. This is still work in progress.

### Results of publishing

The test proejct it at https://github.com/marcobuschini/interview-november-2019. It the widget was
installed "the easy way" described above.

## Translating

This widget uses [NGX Translate](http://www.ngx-translate.com/) for internationalization. To extract
the strings to translate use the command `npm run extract-i18n`. This will generate the file
`projects/widget/assets/i18n/strings.pot` that can feeded into any translation tool that generates
translations in JSON format, such as [OneSky](https://www.oneskyapp.com/). Download the translated
files ZIP archive and unpack it into the `projects/widget/assets/i18n/` folder.

## Bibliography

1. [Angular documentation](https://angular.io/)
1. [Angular Material documentation](https://material.angular.io/)
1. [Angular Package Format documentation](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview)
1. [NGX Translate](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular7-app-with-ngx-translate)
1. [NPM documentation](https://docs.npmjs.com/)
