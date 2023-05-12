/*
 * Copyright 2000-2020 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ElementMixin } from '@vaadin/component-base';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior';
import '@vaadin/text-field';
import '@vaadin/list-box';
import '@vaadin/item';
import '@vaadin/button';
import '@vaadin/vaadin-lumo-styles/icons';
import '@polymer/iron-icon';
import './vcf-autocomplete-overlay';

/**
 * `<vcf-autocomplete>` Web Component with a text input that provides a panel of suggested options.
 *
 * ```html
 * <vcf-autocomplete></vcf-autocomplete>
 * ```
 *
 * @memberof Vaadin
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @demo demo/index.html
 */
class VcfAutocomplete extends ElementMixin(ThemableMixin(mixinBehaviors([IronResizableBehavior], PolymerElement))) {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }

        :host([opened]) {
          pointer-events: auto;
        }

        [part='options-container'] {
          min-width: var(--vcf-autocomplete-options-width);
        }

        [part='bold'] {
          font-weight: 600;
        }

        [part='loading-indicator']::after {
          content: 'Loading...';
        }

        [part='no-results']::after {
          content: 'No results';
        }
      </style>

      <vaadin-text-field id="textField" on-focus="_textFieldFocused" label="[[label]]" placeholder="[[placeholder]]" theme$="[[theme]]">
        <template is="dom-if" if="[[_hasValue(value)]]">
          <vaadin-button part="clear" theme="icon tertiary small" aria-label="Add new item" slot="suffix" on-click="clear">
            <iron-icon icon="lumo:cross"> </iron-icon>
          </vaadin-button>
        </template>
      </vaadin-text-field>

      <vcf-autocomplete-overlay opened="{{opened}}" theme$="[[theme]]">
        <template>
          <vaadin-list-box part="options-container">
            <template is="dom-if" if="[[!loading]]">
              <template is="dom-repeat" items="[[_limitedOptions]]" as="option">
                <vaadin-item on-click="_optionClicked" part="option">
                  [[_getSuggestedStart(value, option)]]<span part="bold">[[_getInputtedPart(value, option)]]</span>[[_getSuggestedEnd(value, option)]]
                </vaadin-item>
              </template>
            </template>

            <template is="dom-if" if="[[_noResultsShown(options, loading)]]">
              <vaadin-item disabled part="option">
                <div part="no-results"></div>
              </vaadin-item>
            </template>

            <template is="dom-if" if="[[loading]]">
              <vaadin-item disabled part="option">
                <div part="loading-indicator"></div>
              </vaadin-item>
            </template>
          </vaadin-list-box>
        </template>
      </vcf-autocomplete-overlay>
    `;
  }

  static get is() {
    return 'vcf-autocomplete';
  }

  static get version() {
    return '1.2.10';
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        reflectToAttribute: true,
        value: false,
        observer: '_openedChange'
      },

      value: {
        type: String,
        notify: true,
        observer: '_valueChange'
      },

      options: {
        type: Array,
        value: () => []
      },

      limit: {
        type: Number,
        value: 10
      },

      loading: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },

      label: {
        type: String
      },

      placeholder: {
        type: String
      },

      caseSensitive: {
        type: Boolean,
        value: false
      },

      _limitedOptions: {
        type: Array
      },

      _savedValue: {
        type: String
      },

      _overlayElement: Object,
      _optionsContainer: Object,
      _selectedOption: Object,
      _boundOutsideClickHandler: Object,
      _boundSetOverlayPosition: Object
    };
  }

  /**
   * @protected
   */
  static _finalizeClass() {
    super._finalizeClass();
  }

  static get observers() {
    return ['_selectedOptionChanged(_selectedOption)', '_optionsChange(options, options.splices)'];
  }

  constructor() {
    super();
    this._boundSetOverlayPosition = this._setOverlayPosition.bind(this);
    this._boundOutsideClickHandler = this._outsideClickHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener('click', this._boundOutsideClickHandler);
  }

  ready() {
    super.ready();

    this.$.textField.addEventListener('input', this._onInput.bind(this));
    this.addEventListener('iron-resize', this._boundSetOverlayPosition);
    this.addEventListener('click', this._elementClickListener);
    this.addEventListener('keydown', this._onKeyDown.bind(this));
    this._overlayElement = this.shadowRoot.querySelector('vcf-autocomplete-overlay');
    this._optionsContainer = this._overlayElement.$.content.querySelector('vaadin-list-box');

    this._overlayElement.addEventListener('vaadin-overlay-outside-click', ev => ev.preventDefault());
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('click', this._boundOutsideClickHandler);
  }

  _elementClickListener(event) {
    event.stopPropagation();
  }

  _setOverlayPosition() {
    const inputRect = this.$.textField.getBoundingClientRect();

    this._overlayElement.style.left = inputRect.left + 'px';
    this._overlayElement.style.top = inputRect.bottom + window.pageYOffset + 'px';

    this._overlayElement.updateStyles({ '--vcf-autocomplete-options-width': inputRect.width + 'px' });
  }

  _outsideClickHandler() {
    this.opened = false;
  }

  _valueChange(value) {
    if (this._selectedOption) {
      this._selectedOption._setFocused(false);
      this._selectedOption = null;
    }

    if (value.length > 0 && !this.opened) {
      this.opened = true;
    } else if (value.length == 0 && this.opened) {
      this.opened = false;
    }
  }

  _optionClicked(ev) {
    this._applyValue(ev.model.option);
  }

  _applyValue(value) {
    this.dispatchEvent(
      new CustomEvent('vcf-autocomplete-value-applied', {
        bubbles: true,
        detail: {
          value: value
        }
      })
    );

    this._changeTextFieldValue(value);
    this.opened = false;
    this.$.textField.blur();
  }

  _textFieldFocused() {
    if (this.value && this.value.length > 0) {
      this.opened = true;
    }
  }

  _hasValue(value) {
    return value.length > 0;
  }

  _optionsChange(options) {
    this._limitedOptions = options.slice(0, this.limit);
  }

  clear() {
    this._changeTextFieldValue('');
    this.$.textField.focus();
  }

  _getSuggestedStart(value, option) {
    if (!value) {
      return;
    }

    return option.substr(0, this._getValueIndex(value, option));
  }

  _getInputtedPart(value, option) {
    if (!value) {
      return option;
    }

    return option.substr(this._getValueIndex(value, option), value.length);
  }

  _getSuggestedEnd(value, option) {
    if (!value) {
      return;
    }

    return option.substr(this._getValueIndex(value, option) + value.length, option.length);
  }

  _getValueIndex(value, option) {
    if (!this.caseSensitive) {
      value = value.toLowerCase();
      option = option.toLowerCase();
    }
    return option.indexOf(value) >= 0 ? option.indexOf(value) : 0;
  }

  _onKeyDown(event) {
    const key = event.key.replace(/^Arrow/, '');

    switch (key) {
      case 'Down':
        event.preventDefault();
        this._navigate('next');

        break;
      case 'Up':
        event.preventDefault();
        this._navigate('prev');

        break;
      case 'Enter':
        if (this._selectedOption) {
          this._applyValue(this._selectedOption.value);
        } else {
          this._applyValue(this.$.textField.value);
        }

        break;
      case 'Escape':
        this.$.textField.blur();
        this.opened = false;

        break;
    }
  }

  _navigate(to) {
    const items = this._optionsContainer.items.filter(item => !item.disabled);

    if (!items.length) {
      return;
    }

    const index = items.indexOf(this._selectedOption);

    // Store the current value if an arrow clicked in the first time
    if (index === -1) {
      this._savedValue = this.value;
    }

    // Reset the previously selected option
    if (this._selectedOption) {
      this._selectedOption._setFocused(false);
      this._selectedOption = null;
    }

    let nextIndex;

    // Calculate where to navigate next
    if (to === 'next') {
      nextIndex = index + 1;

      // If out of bounds then navigate to -1, which means 'previously stored value'
      if (nextIndex > items.length - 1) {
        nextIndex = -1;
      }
    } else if (to === 'prev') {
      nextIndex = index - 1;

      // If out of bounds then navigate to -1, which means 'previously stored value'
      if (nextIndex < -1) {
        nextIndex = items.length - 1;
      }
    }

    // Navigate to the next option
    if (nextIndex >= 0) {
      items[nextIndex]._setFocused(true);
      this._selectedOption = items[nextIndex];

      return this._selectedOption.value;
      // or restore the saved value
    } else {
      this.$.textField.value = this._savedValue;

      return this._savedValue;
    }
  }

  _selectedOptionChanged(selectedOption) {
    if (!selectedOption) {
      return;
    }

    this.$.textField.value = selectedOption.value;
  }

  _changeTextFieldValue(newValue) {
    this.$.textField.value = newValue;
    this.$.textField.dispatchEvent(
      new Event('input', {
        bubbles: true,
        cancelable: true
      })
    );
  }

  _onInput(event) {
    this.value = event.target.value;
  }

  _noResultsShown(options, loading) {
    return (!options || !options.length) && !loading;
  }

  _openedChange(opened) {
    if (opened) {
      this._setOverlayPosition();
    }
  }
}

customElements.define(VcfAutocomplete.is, VcfAutocomplete);

/**
 * @namespace Vaadin
 */
window.Vaadin.VcfAutocomplete = VcfAutocomplete;
