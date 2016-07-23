# itsme-dropdown

With no dependencies.

## Sample

### HTML

```html
<select name="colours" id="colours">
    <option value="red">Red</option>
    <option value="yellow">Yellow</option>
    <option value="green">Green</option>
    <option value="orange">Orange</option>
    <option value="teal">Teal</option>
</select>
```

### JavaScript

```javascript
// without options
new itsmeDropdown('colours');
```

```javascript
// with options
new itsmeDropdown('colours', {
    width: 150,
    placeholder: 'Please Select'
});
```

## Options

| Key | Default | Description |
| --- | --- | --- |
| placeholder | -- Select -- | The text set to be shown by default before the options are shown. |
| arrow | \u25BE | The arrow indicator to show that it is a dropdown |
