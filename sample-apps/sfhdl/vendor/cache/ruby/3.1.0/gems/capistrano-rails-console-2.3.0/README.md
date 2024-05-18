[![Gem Version](https://img.shields.io/gem/v/capistrano-rails-console.svg)](https://rubygems.org/gems/capistrano-rails-console)
[![Code Climate](https://img.shields.io/codeclimate/github/ydkn/capistrano-rails-console.svg)](https://codeclimate.com/github/ydkn/capistrano-rails-console)


# Capistrano::Rails::Console

Remote rails console and dbconsole for capistrano.


## Installation

Add this line to your application's Gemfile:

```ruby
gem 'capistrano-rails-console', require: false
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install capistrano-rails-console


## Usage

You should ensure there is a `rails` binstub in the `current/bin` directory on the server otherwise
this gem won't work (because rails itself won't work).
If you experience any problems please verify that manually running `rails console` on the server does work.
If it doesn't you are deploying your rails application wrong (check [#18](https://github.com/ydkn/capistrano-rails-console/issues/18) or [#26](https://github.com/ydkn/capistrano-rails-console/issues/26) for details)!

Require in `Capfile` to use the default task:

```ruby
require 'capistrano/rails/console'
```

Run a remote rails console with:

    $ cap production rails:console
    $ cap production rails:c

You can also start a sandbox session:

    $ cap production rails:console sandbox=1

Or run a dbconsole:

    $ cap production rails:dbconsole
    $ cap production rails:db


## Options

### Rails environment

```ruby
set :console_env, :production # use different environment than deployment environment (rails_env)
```

### User

```ruby
set :console_user, :appuser # run rails console as appuser through sudo
set :console_user, nil # explicitly disable switching user through sudo
```

### Role

```ruby
set :console_role, :app # start remote console on primary server for this role
```

### Shell

```ruby
set :console_shell, '/bin/bash' # select shell to be used on server in case you experience problems (see #31)
```


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ydkn/capistrano-rails-console.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
