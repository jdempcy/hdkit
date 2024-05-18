# Quill Editor Rails
[![Gem Version](https://badge.fury.io/rb/quill-editor-rails.svg)](https://badge.fury.io/rb/quill-editor-rails)

This gem adds a lastest version of [Quill Rich Text Editor](https://quilljs.com/docs/quickstart/) to Rails. The gem only includes `quill.min.js`, `quill.bubble.scss` and `quill.snow.scss`. You can also use alternative gems like [quilljs-rails](https://github.com/abhinavmathur/quilljs-rails) or [quill-rails5](https://github.com/paul-at/quill-rails5) if you need view_helper or something else to help you render Quill editor easily.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'quill-editor-rails'
```

And then execute:

    $ bundle install

Or install it yourself as:

    $ gem install quill-editor-rails

## Usage

- app/assets/javascripts/application.js
```
//= require quill.min
```

- app/assets/stylesheets/application.css.scss
```
@import 'quill.snow';
// or
@import 'quill.bubble';
```
