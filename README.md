[![Build Status](https://travis-ci.org/vaadin/vcf-autocomplete.svg?branch=master)](https://travis-ci.org/vaadin/vcf-autocomplete)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/web-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# &lt;vcf-autocomplete&gt;

[Live Demo ↗](https://incubator.app.fi/vcf-autocomplete-demo/index.html)

[&lt;vcf-autocomplete&gt;](https://vaadin.com/components/vcf-autocomplete) is a text input with a panel of suggested options.

&lt;vcf-autocomplete&gt; is built with Vaadin Vcf. To use it, you need to have a access to [Vaadin Vcf](https://vaadin.com/support#incubator), which is included in [Vaadin Prime](https://vaadin.com/pricing).



```html
  <vcf-autocomplete id="demo1" label="Choose country" placeholder="Start typing a country name..." options="[[options]]">
  </vcf-autocomplete>
```

[<img src="https://raw.githubusercontent.com/vaadin/vcf-autocomplete/master/screenshot.gif" width="200" alt="Screenshot of vcf-autocomplete">](https://vaadin.com/components/vcf-autocomplete)


## Installation

The Vaadin Vcf components are distributed as Bower packages.

### Polymer 2 and HTML Imports compatible version

Install `vcf-autocomplete`:

```sh
bower i vaadin/vcf-autocomplete --save
```

Once installed, import it in your application:

```html
<link rel="import" href="bower_components/vcf-autocomplete/vcf-autocomplete.html">
```

## Getting Started

Vaadin components use the Lumo theme by default.

## The file structure for Vaadin components

- `src/vcf-autocomplete.html`

  Unstyled component.

- `theme/lumo/vcf-autocomplete.html`

  Component with Lumo theme.

- `vcf-autocomplete.html`

  Alias for theme/lumo/vcf-autocomplete.html


## Running demos and tests in browser

1. Fork the `vcf-autocomplete` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vcf-autocomplete` directory, run `npm install` and then `bower install` to install dependencies.

1. Run `polymer serve --open`, browser will automatically open the component API documentation.

1. You can also open demo or in-browser tests by adding **demo** or **test** to the URL, for example:

  - http://127.0.0.1:8080/components/vcf-autocomplete/demo
  - http://127.0.0.1:8080/components/vcf-autocomplete/test


## Running tests from the command line

1. When in the `vcf-autocomplete` directory, run `polymer test`


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `gulp lint`, which will automatically lint all `.js` files as well as JavaScript snippets inside `.html` files.


## Contributing

  - Make sure your code is compliant with our code linters: `gulp lint`
  - Check that tests are passing: `polymer test`
  - [Submit a pull request](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github) with detailed title and description
  - Wait for response from one of Vaadin components team members


## License

Commercial Vaadin Add-on License version 3 (CVALv3). For license terms, see LICENSE.

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
