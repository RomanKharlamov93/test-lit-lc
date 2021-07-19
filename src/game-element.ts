import {
  LitElement,
  html,
  customElement,
  property,
  css,
  state,
} from 'lit-element';

interface IState {
  left: number[];
  right: number[];
}

@customElement('game-element')
export class GameElement extends LitElement {
  range = Array.from(Array(20), (d, i) => i + 1);
  @property()
  button: string = '';
  @property()
  limit: number = 0;

  @state()
  state: IState = {
    left: [],
    right: [],
  };

  renderNumbers(field: string) {
    return this.range.map(
      (num) => html`
        <label>
          <input
            type="checkbox"
            ?disabled=${this._checkNumberDsabled(field as keyof IState, num)}
            id=${field + '-' + num}
            @change=${this._handleChange}
          />
          <span>${num}</span>
        </label>
      `
    );
  }

  render() {
    return html`
      <div id="left" }>${this.renderNumbers('left')}</div>
      <div id="right" }>${this.renderNumbers('right')}</div>
      <button
        type="button"
        ?disabled=${this._checkButtonDsabled()}
        @click=${this._handleSubmit}
      >
        ${this.button}
      </button>
    `;
  }

  _handleSubmit() {
    const event = new CustomEvent('game-done', { detail: {} });
    this.dispatchEvent(event);
  }

  _handleChange(e: Event) {
    const id = (<HTMLInputElement>e.target).id;
    const checked = (<HTMLInputElement>e.target).checked;
    const name: keyof IState = id.split('-')[0] as keyof IState;
    const num = +id.split('-')[1];

    if (checked) {
      this.state[name].push(num);
    } else {
      this.state[name] = this.state[name].filter((it) => it !== num);
    }
    this.requestUpdate();
  }

  _checkNumberDsabled(field: keyof IState, num: number) {
    return (
      !this.state[field].includes(num) &&
      this.state[field].length >= this.limit / 2
    );
  }

  _checkButtonDsabled() {
    return this.state.left.length + this.state.right.length < this.limit;
  }
}
