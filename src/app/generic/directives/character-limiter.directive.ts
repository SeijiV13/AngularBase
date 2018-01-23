import { Directive, Input } from '@angular/core'
@Directive({
  selector: '[limit-to]',
  host: {
    '(keypress)': '_onKeypress($event)',

  }
})
export class CharacterLimiterDirective {
  @Input('limit-to') limitTo;
  _onKeypress(e) {
    const limit = +this.limitTo;
    if (e.target.value.length === limit) e.preventDefault();
  }
  _onPaste(e) {
    e.preventDefault();
  }
}