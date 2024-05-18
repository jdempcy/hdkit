# Bootstrap Icons

A package that distributes Bootstrap Icons in a gem based in GitHub OctIcons gem.

## Install

1. Add this to your `Gemfile`

        $ gem 'bootstrap-icons'
Then `bundle install`.

## Usage

```ruby
require 'bootstrap-icons'
icon = BootstrapIcons::BootstrapIcon.new('x')
icon.to_svg
# "<svg class=\"bi bi-x\" viewBox=\"0 0 16 16\" fill=\"currentColor\" version=\"1.1\" width=\"1em\" height=\"1em\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z\"></path>\n  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z\"></path></svg>"
```

## Documentation

The `BootstrapIcon` class takes two arguments. The first is the symbol of the icon, and the second is a hash of arguments representing html attributes.

### `symbol` _(required)_

This is the name of the bootstrap icon you want to use. For example `check`. [Full list of icons](https://icons.getbootstrap.com/#icons)

### Options

- `class:` - When setting the class, it will be included in svg class attribute.
- `fill:` - When setting the fill, the icon will be filled to that color.
- `height:` - When setting the height to a number, the icon will scale to that size. If `width` isn't set, it will assume the same size of `height`.
- `width:` - When setting the width to a number, the icon will scale to that size. If `height` isn't set, it will assume the same size of `width`

If both `:width, :height` are passed into the options hash, then the icon will be sized exactly at those dimensions.

If none of them are passed into the options hash, then the icon will be sized to his default size, as described in [bootstrap icons usage](https://icons.getbootstrap.com/#usage).

For now it's not possible to set a custom `viewBox` value.


### Attributes

Once initialized, you can read a few properties from the icon.

### `symbol`

Returns the string of the symbol name

```ruby
icon = BootstrapIcons::BootstrapIcon.new('x')
icon.symbol
# "x"
```


### `path`

Returns the string representation of the path of the icon.

```ruby
icon = BootstrapIcons::BootstrapIcon.new('x')
icon.path
# "<path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z\"></path>\n  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z\"></path>"
```

### `fill`

Returns the icon default color. _Note, this doesn't change if you provide a custom color in fill options._

### `viewBox`

Returns the icon default `viewBox` value.

### `options`

This is a hash of all the `options` that will be added to the output tag.

```ruby
icon = BootstrapIcons::BootstrapIcon.new('x')
icon.options
# {:class=>"bi bi-x", :viewBox=>"0 0 16 16", :fill=>"currentColor", :version=>"1.1", :width=>"1em", :height=>"1em", :"aria-hidden"=>"true"}
```

### `width` / `height`

Returns icon true `width` / `height`, it the most cases `1em`. _Note, this doesn't change if you scale it up with/height size options, it only is the "natural width/height" of the icon_.

### Methods

#### `to_svg`

Returns a string of the svg tag

```ruby
icon = BootstrapIcons::BootstrapIcon.new('x')
icon.to_svg
# "<svg class=\"bi bi-x\" viewBox=\"0 0 16 16\" fill=\"currentColor\" version=\"1.1\" width=\"1em\" height=\"1em\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z\"></path>\n  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z\"></path></svg>"
```