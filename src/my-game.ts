import { LitElement, html, customElement, property, state } from 'lit-element';

import './game-element.ts';
import './result-element.ts';

@customElement('my-game')
export class MyGame extends LitElement {
  @property({ type: String })
  button = '';

  @property({ type: Number, attribute: 'element_limit' })
  limit = 0;

  @state()
  dialog_open = false;

  @state()
  game_done = false;

  getContent() {
    if (this.game_done) {
      return html`<result-element @reset=${this._onReset}></result-element>`;
    }
    return html`
      <game-element
        .button=${this.button}
        .limit=${this.limit}
        @game-done=${this._onGameDone}
      ></game-element>
    `;
  }

  render() {
    return html`
      <button @click=${this._openDialog} ?hidden=${this.dialog_open}>
        Начать игру
      </button>
      <dialog ?open=${this.dialog_open}>
        <button @click=${this._closeDialog}>X</button>
        ${this.getContent()}
      </dialog>
    `;
  }

  _openDialog() {
    this.dialog_open = true;
  }

  _closeDialog() {
    this.dialog_open = false;
  }

  _onGameDone() {
    this.game_done = true;
  }

  _onReset() {
    this.game_done = false;
  }
}
