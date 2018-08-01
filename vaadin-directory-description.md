[![Available in Vaadin_Directory](https://img.shields.io/vaadin-directory/v/vaadinvaadin-autocomplete.svg)](https://vaadin.com/directory/component/vaadinvaadin-autocomplete)
[![Stars in Vaadin_Directory](https://img.shields.io/vaadin-directory/stars/vaadinvaadin-autocomplete.svg)](https://vaadin.com/directory/component/vaadinvaadin-autocomplete)

# &lt;vaadin-autocomplete&gt;

[&lt;vaadin-autocomplete&gt;](https://vaadin.com/components/vaadin-autocomplete) is a Web Component providing an easy way to ask the user to confirm a choice, part of the [Vaadin components](https://vaadin.com/components).

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-autocomplete/master/screenshot.png" width="200" alt="Screenshot of vaadin-autocomplete">](https://vaadin.com/components/vaadin-autocomplete)

## Example Usage

```html
  <vaadin-autocomplete header="Unsaved changes" confirm-text="Save" on-confirm="save"
    cancel on-cancel="cancel" reject reject-text="Discard" on-reject="discard">
    Do you want to save or discard your changes before navigating away?
  </vaadin-autocomplete>
```
