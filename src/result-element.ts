import { LitElement, html, customElement } from 'lit-element';

@customElement('result-element')
export class ResultElement extends LitElement {
  render() {
    return html` <button @click=${this._handleReset}>reset</button> `;
  }

  _handleReset() {
    const event = new CustomEvent('reset', { detail: {} });
    this.dispatchEvent(event);
  }
}
