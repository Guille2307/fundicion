import { Directive } from '@angular/core';

@Directive({
  selector: '[autoListDivider]'
})
export class AutoListDividerDirective {

  constructor() { }

  autoListDivide($timeout) {
    let lastDivideKey = '';
    return {
      link(scope, element, attrs) {
        const key = attrs.autoListDividerValue;

        const defaultDivideFunction = (k) => {
          return k.slice(0, 1).toUpperCase();
        };

        const doDivide = () => {
          const divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;
          const divideKey = divideFunction(key);

          if (divideKey !== lastDivideKey) {
            const contentTr = document.createElement('<div class=\'item item-divider\'>' + divideKey + '</div>');
            element[0].parentNode.insertBefore(contentTr[0], element[0]);
          }

          lastDivideKey = divideKey;
        };

        $timeout(doDivide, 0);
      }
    };
  }
}
