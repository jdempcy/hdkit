# SmartKv

[![Build Status](https://travis-ci.org/styd/smart_kv.svg?branch=master)](https://travis-ci.org/styd/smart_kv)
[![Coverage Status](https://coveralls.io/repos/github/styd/smart_kv/badge.svg?branch=master)](https://coveralls.io/github/styd/smart_kv?branch=master)
[![Gem Version](https://badge.fury.io/rb/smart_kv.svg)](https://rubygems.org/gems/smart_kv)

Write options or configurations without worry of typos and the need to remember all the keys.

## Background

Have you ever used ruby options like this:

```ruby
# this example is for rails
d = DateTime.now
e = d.change(hour: 1, minute: 5)
```

You think everything works fine, but it's not.  
There is no key `:minute` in options used by `#change`.  
If only the source of the `DateTime#change` method starts like this:

```ruby
# this class can be defined on its own file, just remember to require it
class ChangeOptions < SmartKv
  optional :nsec, :usec, :year, :month, :day, :hour, :min, :sec, :offset, :start
end

class DateTime
...
  def change(options)
    options = ChangeOptions.check(options)
    ...
  end
end
```

So, when you do this `d.change(hour: 1, minute: 5)`, it will yell:

```
KeyError: unrecognized key: :minute in ChangeOptions
```

That's better. But, how do you know all the right options?  
Type: `ChangeOptions.keys`


## More Usage Examples

```ruby
class Config < SmartKv
  required :some_key, :second_key
  optional :an_option
end

Config.check({some_key: "val"})
```

This will complain that you're not using the `:second key`.
If you add another key that is not recognized, it will complain too.
If there is a key that you don't always use but want it to be recognized, mark it as `optional`.


### Inheritable

```ruby
class ChildConfig < Config
  required :first_key
end

ChildConfig.check({first_key: "val", second_key: "val 2"})
```

This will also complain that you're not using the `:some_key`.


### Directly callable

Whatever given as input is callable directly.

```ruby
c = Config.check({some_key: "val", second_key: "val 2"})
c[:some_key]

c2 = Config.check(OpenStruct.new({some_key: "val", second_key: "val 2"}))
c2.second_key
```


### Override callable object

You can change the callable object to any class that accepts hash as input of its new class method.

```ruby
class Convertable < SmartKv
  required :abcd
  callable_as OpenStruct
end

c = Convertable.check({abcd: 123})
c.abcd #=> 123
```


### Get suggestions

When you make typo when writing a key of an options, you can get suggestions.

```ruby
class LanguageScore < SmartKv
  required :ruby
  optional :rust, :kotlin, :elixir
end

LanguageScore.check({ruby: 100, korting: 90})

# SmartKv::KeyError: unrecognized key: :korting in LanguageScore.
# Did you mean?  :kotlin
```


### Not using it for options or configs?

You can choose not to use it for options or configs. Maybe for strict request body keys?

```ruby
class PostBody < SmartKv
  required :app_key, :secret_key
end
.
.
request.set_form_data(PostBody.check({app_key: "abc", secret_key: "def"}))
```

### Alternative

One close alternative that is quite similar in objective is probably
[dry-schema](https://github.com/dry-rb/dry-schema).


## Installation

Add this line to your application's Gemfile:

```ruby
gem 'smart_kv'
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/styd/smart_kv. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
