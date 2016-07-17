"use strict";

function itsmeDropdown(el, options) {
    this.el = document.getElementById(el);
    this.options = options || {};
    this.arrow = (options && options.arrow) ? options.arrow : '\u25BE';

    this.setup();
}

itsmeDropdown.prototype.setup = function() {
    const options = this.el.options;
    const fragment = document.createDocumentFragment();
    let button;
    const parentNode = this.el.parentNode;
    const imddElement = document.createElement('div');
    imddElement.id = `imdd-select-${this.el.id}`;
    imddElement.className = 'imdd-select';
    const selectButton = document.createElement('button');
    selectButton.id = `imdd-select-button-${this.el.id}`;
    selectButton.className = 'imdd-select-button';
    selectButton.innerHTML = this.options.placeholder ? `${this.options.placeholder} <span class="imdd-arrow">${this.arrow}</span>` : `-- Select -- <span class="imdd-arrow">${this.arrow}</span>`;
    const imddSelectBox = document.createElement('div');
    imddSelectBox.id = `imdd-select-box-${this.el.id}`;
    imddSelectBox.className = 'imdd-select-box';

    this.el.style.display = 'none';

    for (let option of options) {
        button = document.createElement('button');
        button.className = 'imdd-button';
        button.innerHTML = option.innerHTML;
        button.setAttribute('data-value', option.value);
        fragment.appendChild(button);
    }

    imddSelectBox.appendChild(fragment);

    imddElement.appendChild(selectButton);
    imddElement.appendChild(imddSelectBox);

    parentNode.insertBefore(imddElement, this.el);

    selectButton.style.minWidth = this.options.width ? `${this.options.width}px` : `${selectButton.offsetWidth + 6}px`;
    imddSelectBox.style.marginTop = '-1px';
    imddSelectBox.style.minWidth = this.options.width ? `${this.options.width}px` : `${selectButton.offsetWidth}px`;

    selectButton.addEventListener('click', (_) => this.action());
    selectButton.addEventListener('blur', (_) => {
        setTimeout((_) => {
            if (imddSelectBox.classList.contains('show') && (!document.activeElement || document.activeElement.className !== 'imdd-button'))
                this.action();
        }, 100);
    });
    imddSelectBox.addEventListener('click', (el) => this.select(el));
};

itsmeDropdown.prototype.action = function() {
    const imddSelectBox = document.getElementById(`imdd-select-box-${this.el.id}`);

    if (imddSelectBox.classList.contains('show')) {
        imddSelectBox.classList.remove('show');
    } else {
        imddSelectBox.classList.add('show');
    }

};

itsmeDropdown.prototype.select = function(el) {
    const selectButton = document.getElementById(`imdd-select-button-${this.el.id}`);
    const value = el.target.getAttribute('data-value');

    selectButton.innerHTML = `${value} <span class="imdd-arrow">${this.arrow}</span>`;

    this.action();

    this.el.value = value;
};
