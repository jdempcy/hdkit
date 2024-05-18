# bootstrap_icons_rubygem

bootstrap_icons_rubygem provides the [Bootstrap icons](https://icons.getbootstrap.com/) web fonts and stylesheets as a Rails engine for use with the asset pipeline.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'bootstrap_icons_rubygem'
```

And then execute:

    $ bundle install

Or install it yourself as:

    $ gem install bootstrap_icons_rubygem

In your `application.css`, include the css file:

```css
 *= require bootstrap-icons
```

or if you prefer scss add this to your `application.scss` file:

```scss
@import "bootstrap-icons"; //application.scss
```

## Usage

```html
<i class="bi bi-alarm-fill"></i>
```

## My other open source projects

[railstart-niceadmin](https://github.com/hfpp2012/railstart-niceadmin)
