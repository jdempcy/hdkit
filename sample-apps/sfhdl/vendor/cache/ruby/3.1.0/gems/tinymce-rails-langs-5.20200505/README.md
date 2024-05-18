Language Packs for tinymce-rails
================================

The `tinymce-rails-langs` gem adds language packs for [TinyMCE](http://www.tinymce.com/) (with [tinymce-rails](https://github.com/spohlenz/tinymce-rails)).

The gem currently includes all language packs available from https://www.tinymce.com/download/language-packages/, some of which may be incomplete.


Instructions
------------

**Add the `tinymce-rails-langs` gem to your Gemfile**

    gem 'tinymce-rails'
    gem 'tinymce-rails-langs'

Language files will then be available during development mode and will be copied across when the `assets:precompile` rake task is run.

See the [tinymce-rails project](https://github.com/spohlenz/tinymce-rails) for further integration instructions.
