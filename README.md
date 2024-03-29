# &lt;vcf-autocomplete&gt;

[![npm version](https://badgen.net/npm/v/@vaadin-component-factory/vcf-autocomplete)](https://www.npmjs.com/package/@vaadin-component-factory/vcf-autocomplete)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadin-component-factoryvcf-autocomplete)

This is the npm version [vcf-autocomplete](https://github.com/vaadin-component-factory/vcf-autocomplete) developed using Polymer 3.

[Live demo ↗](https://vcf-autocomplete.netlify.com)
|
[API documentation ↗](https://vcf-autocomplete.netlify.com/api/#/elements/Vaadin.VcfAutocomplete)

![screenshot](https://user-images.githubusercontent.com/3392815/67003977-ea44cd80-f0e7-11e9-971c-175bdc31407c.gif)

## Installation

Install `vcf-autocomplete`:

```sh
npm i @vaadin-component-factory/vcf-autocomplete --save
```

## Usage

Once installed, import it in your application:

```js
import '@vaadin-component-factory/vcf-autocomplete';
```

Add `<vcf-autocomplete>` to the page. In attribute `options` you should declare options that will be offered for user to select. All change listener to the element in which you will update `options` appribute.

```html
<vcf-autocomplete id="demo1" label="Choose country" placeholder="Start typing a country name..." options="[[options]]">
</vcf-autocomplete>
```

## Running demo

1. Fork the `vcf-autocomplete` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vcf-autocomplete` directory, run `npm install` to install dependencies.

1. Run `npm start` to open the demo.

## Contributing

To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.

## Vaadin Prime

This component is available in the Vaadin Prime subscription. It is still open source, but you need to have a valid CVAL license in order to use it. Read more at: https://vaadin.com/pricing

## License

Apache License 2
