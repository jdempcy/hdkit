# SSHKit::Interactive

[![Gem Version](https://badge.fury.io/rb/sshkit-interactive.svg)](http://badge.fury.io/rb/sshkit-interactive) [![Build Status](https://travis-ci.org/afeld/sshkit-interactive.svg?branch=master)](https://travis-ci.org/afeld/sshkit-interactive)

An [SSHKit](https://github.com/capistrano/sshkit) [backend](https://github.com/capistrano/sshkit/tree/master/test/unit/backends) that allows you to execute interactive commands on your servers. Remote commands that you might want to use this for:

* A Rails console
* A text editor
* `less`
* *etc.*

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'sshkit-interactive'
```

And then execute:

    $ bundle

If you're using [Capistrano](http://capistranorb.com/), add the following to your Capfile:

```ruby
require 'sshkit/interactive'
```

## Usage

Running interactive commands will make a system call to `ssh` under the hood.

### DSL

Using the DSL, simply put the command within the `run_interactively` block. In Capistrano, it might look something like this:

```ruby
namespace :rails do
  desc "Run Rails console"
  task :console do
    run_interactively primary(:app) do
      execute(:rails, :console)
    end
  end
end
```

It is also possible to set directory and user the Capistrano way:

```ruby
namespace :rails do
  desc "Run Rails console"
  task :console do
    run_interactively primary(:app) do
      within current_path do
        as user: :foobar do
          execute(:rails, :console)
        end
      end
    end
  end
end
```

And it is possible to set the shell to be used:

```ruby
namespace :foo do
  task :bar do
    run_interactively primary(:app), shell: '/bin/bash' do
      ...
    end
  end
end

### Manually setting the backend

Use the [interactive backend](lib/sshkit/interactive/backend.rb) and execute commands as normal:

```ruby
SSHKit.config.backend = SSHKit::Interactive::Backend
hosts = %w{my.server.com}
on hosts do |host|
  execute(:vim)
end
```

## Contributing

1. [Fork it](https://github.com/afeld/sshkit-interactive/fork)
1. Clone it
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create a new Pull Request
