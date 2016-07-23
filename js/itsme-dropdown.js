"use strict";

function itsmeDropdown(el, options) {
    this.el = document.getElementById(el);
    this.options = options || {};

    if (this.el.hasAttribute('multiple') && this.el.getAttribute('multiple') === 'true') {
        this.options.multiple = true;
    }

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
    const selectButton = document.createElement('div');
    selectButton.id = `imdd-select-button-${this.el.id}`;
    selectButton.setAttribute('tabindex', 0);
    selectButton.className = 'imdd-select-button';
    const optionList = document.createElement('div');
    optionList.id = `imdd-option-list-${this.el.id}`;
    optionList.className = 'imdd-option-list';
    optionList.innerHTML = this.options.placeholder ? this.options.placeholder : '-- Select --';
    selectButton.appendChild(optionList);
    const arrow = document.createElement('span');
    arrow.className = 'imdd-arrow';
    arrow.innerHTML = this.options.arrow ? this.options.arrow : '\u25BE';
    selectButton.appendChild(arrow);
    const imddSelectBox = document.createElement('div');
    imddSelectBox.id = `imdd-select-box-${this.el.id}`;
    imddSelectBox.className = 'imdd-select-box';
    let i = 0;

    this.el.style.display = 'none';

    for (let option of options) {
        button = document.createElement('button');
        button.className = 'imdd-button';
        button.innerHTML = option.innerHTML;
        button.setAttribute('data-value', option.value);
        button.setAttribute('data-index', i++);
        fragment.appendChild(button);
    }

    imddSelectBox.appendChild(fragment);

    imddElement.appendChild(selectButton);
    imddElement.appendChild(imddSelectBox);

    parentNode.insertBefore(imddElement, this.el);

    selectButton.style.minWidth = `${selectButton.offsetWidth + 6}px`;
    imddSelectBox.style.marginTop = '-1px';
    imddSelectBox.style.minWidth = `${selectButton.offsetWidth}px`;

    selectButton.addEventListener('click', (el) => this.action(el));
    selectButton.addEventListener('keyup', (el) => {
        if (el.key === 'Enter' || (el.key === 'ArrowDown' && !imddSelectBox.classList.contains('show')))
            this.action(el)
    });
    selectButton.addEventListener('blur', (_) => {
        console.log('blur');
        setTimeout((_) => {
            if (imddSelectBox.classList.contains('show') && (!document.activeElement || document.activeElement.className !== 'imdd-button'))
                this.action();
        }, 100);
    });
    imddSelectBox.addEventListener('click', (el) => this.select(el));
};

itsmeDropdown.prototype.action = function(el) {
    const imddSelectBox = document.getElementById(`imdd-select-box-${this.el.id}`);

    if (el && el.target.classList.contains('remove-option')) {
        this.handleMultipleOption(null, el.target.getAttribute('data-index'));
        return;
    }

    if (imddSelectBox.classList.contains('show')) {
        imddSelectBox.classList.remove('show');
    } else {
        imddSelectBox.classList.add('show');
    }

};

itsmeDropdown.prototype.testSelectHasValue = function() {
    const options = this.el.options;
    for (let option of options) {
        if (option.hasAttribute('selected')) return true;
    }

    return false;
};

itsmeDropdown.prototype.handleMultipleOption = function(value, index) {
    const optionList = document.getElementById(`imdd-option-list-${this.el.id}`);
    const option = this.el[index];

    if (option.hasAttribute('selected') && option.getAttribute('selected') === 'true') {
        const optionLabel = document.getElementById(`remove-option-${index}`).remove();
        option.removeAttribute('selected');

        if (!this.testSelectHasValue()) {
            optionList.innerHTML = this.options.placeholder;
        }

        return;
    }

    const optionLabel = document.createElement('span');
    const optionLabelRemove = document.createElement('span');

    if (!this.testSelectHasValue()) {
        optionList.innerHTML = '';
    }

    optionLabelRemove.innerHTML = ' ×';
    optionLabelRemove.className = 'remove-option';
    optionLabelRemove.setAttribute('data-index', index);

    optionLabel.id = `remove-option-${index}`;
    optionLabel.className = 'imdd-option';
    optionLabel.innerHTML = value;
    optionLabel.appendChild(optionLabelRemove);

    option.setAttribute('selected', 'true');
    optionList.appendChild(optionLabel);

};

itsmeDropdown.prototype.select = function(el) {
    const optionList = document.getElementById(`imdd-option-list-${this.el.id}`);
    const value = el.target.getAttribute('data-value');
    const index = el.target.getAttribute('data-index');
    const label = el.target.innerHTML;

    if (this.options.multiple) {
        this.handleMultipleOption(value, index);
    } else {
        optionList.innerHTML = label;
        this.el.value = value;
    }

    this.action();
};
