[![Available in Vaadin_Directory](https://img.shields.io/vaadin-directory/v/incubator-autocomplete.svg)](https://vaadin.com/directory/component/incubator-autocomplete)
[![Stars in Vaadin_Directory](https://img.shields.io/vaadin-directory/stars/incubator-autocomplete.svg)](https://vaadin.com/directory/component/incubator-autocomplete)

# &lt;incubator-autocomplete&gt;

[&lt;incubator-autocomplete&gt;](https://vaadin.com/components/incubator-autocomplete) is a Web Component providing an easy way to ask the user to confirm a choice, part of the [Vaadin components](https://vaadin.com/components).

[<img src="https://raw.githubusercontent.com/vaadin/incubator-autocomplete/master/screenshot.png" width="200" alt="Screenshot of incubator-autocomplete">](https://vaadin.com/components/incubator-autocomplete)

## Example Usage

```html
  <incubator-autocomplete header="Unsaved changes" confirm-text="Save" on-confirm="save"
    cancel on-cancel="cancel" reject reject-text="Discard" on-reject="discard">
    Do you want to save or discard your changes before navigating away?
  </incubator-autocomplete>
```
