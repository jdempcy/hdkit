# SFHDL
### The Santa Fe Human Design Library


Based on `https://github.com/hfpp2012/railstart-niceadmin`. (Now defunct.)

### Quickstart
```
rvm use 3.1.2
bundle install
rails db:migrate
rails db:seed
```

### To run the app:

```
rails server
```

### Admin the site:

Back-end admin:
```
http://localhost:3000/rails_admin
```

Admin dashboard:
```
http://localhost:3000/admin
```


### Sidekiq

```
http://localhost:3000/sidekiq
```


### Troubleshooting

If you run into an issue with ExecJS not finding a JS runtime:
```
brew install v8
```

Some issues can be fixed by:
```
gem install bundler
bundle update --bundler
rm Gemfile.lock
bundle install
```


###


(Now defunct) LEGACY RAILSTART NICEADMIN README


###


## railstart-niceadmin

Backend admin dashboard management system based on [Bootstrap 5](https://getbootstrap.com/) and [NiceAdmin](https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/) and [Rails 7](https://rubyonrails.org/)

[![License](http://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://github.com/hfpp2012/railstart-niceadmin/blob/master/LICENSE)

Preview: https://start.rails365.net/admin

![](https://l.ruby-china.com/photo/hfpp2012/2de9f33b-690e-4f9b-9a2c-b1d3550d4601.png!large)

[NiceAdmin](https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/) is open source template based on [Bootstrap 5](https://getbootstrap.com/), you can download it from network, I integrate it with Rails 7.

It will integrate various functions and plugins, mainly for easy writing code.

### Dependency:

- [Ruby 3.0.0](https://www.ruby-lang.org/)

- [Rails 7](https://rubyonrails.org/)

- [PostgreSQL](https://www.postgresql.org/)

- [Redis](https://redis.io/)

- [ImageMagick](https://imagemagick.org/index.php)

Please make sure that Redis and PostgreSQL server is running.

### Features

- Beautiful style based on [NiceAdmin](https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/)
- Based on [Rails 7](https://rubyonrails.org/) and [hotwired turbo](https://turbo.hotwired.dev/) and [stimulus](https://stimulus.hotwired.dev/)
- Integrate automation deployment: [capistrano](https://github.com/capistrano/capistrano)
- [Devise](https://github.com/heartcombo/devise) for authentication
- Pagination(comming soon)
- Charts with [chartjs](https://www.chartjs.org/) and [apexcharts](https://apexcharts.com/) and [echarts](https://echarts.apache.org/zh/index.html)
- Icons: [Bootstrap Icons](https://icons.getbootstrap.com/) and [RemixIcons](https://remixicon.com/) and [Boxicons](https://boxicons.com/) and [FontAwesome](https://fontawesome.com/)
- Text Editor: [Quill](https://www.quill.org/) and [TinyMCE](https://www.tiny.cloud/)
- Breadcrumbs(comming soon)
- Integrate [Action Text](https://guides.rubyonrails.org/action_text_overview.html)
- Support frontend website seo
- Custom error page
- Flash helper
- Support API(comming soon)
- Integrate [tailwind](https://tailwindcss.com/) for frontend(comming soon)
- Integrate [Simple-DataTables](https://github.com/fiduswriter/Simple-DataTables)

### Included gems

- [rails_admin](https://github.com/railsadminteam/rails_admin)
- [sidekiq](https://github.com/mperham/sidekiq)
- [meta_tags](https://github.com/kpumuk/meta-tags)
- [awesome_print](https://github.com/awesome-print/awesome_print)
- [groupdate](https://github.com/ankane/groupdate)
- [pghero](https://github.com/ankane/pghero)
- [whenever](https://github.com/javan/whenever)
- [devise](https://github.com/heartcombo/devise)
- [dotenv-rails](https://github.com/bkeepers/dotenv)
- [image_processing](https://github.com/janko/image_processing)
- [importmap-rails](https://github.com/rails/importmap-rails)
- [sprockets-rails](https://github.com/rails/sprockets-rails)
- [turbo-rails](https://github.com/hotwired/turbo-rails)
- [stimulus-rails](https://github.com/hotwired/stimulus-rails)
- [jbuilder](https://github.com/rails/jbuilder)

### Installation

Install your system softwares first.

#### Mac OS X

```
brew install imagemagick vips redis postgresql gs
```

#### Ubuntu

```
$ sudo apt-get install postgresql-14 redis-server imagemagick ghostscript libvips
```

Then follow this link to install Ruby and Rails

[https://rails.new/](https://rails.new/)

Or install [rvm](https://rvm.io/) and then install Rails manually.

### Running

Running the app finally

```bash
git clone git@github.com:hfpp2012/railstart-niceadmin.git
cd railstart-niceadmin
bundle install
cp .env.template .env
# and then change .env configurations for you
rails db:migrate
rails db:seed
rails server
```

### Deployment

```bash
# change .env file configurations and upload nginx config
bundle exec cap production puma:nginx_config
# then
bundle exec cap production deploy
```

Also support other capistrano commands.

```
gem "capistrano", "~> 3.16", require: false
gem "capistrano-rails", "~> 1.6", require: false
gem "capistrano-rvm", "~> 0.1.2"
gem "capistrano3-puma", "~> 5.2"
gem "capistrano-rails-console", "~> 2.3", require: false
gem "capistrano-db-tasks", "~> 0.6", require: false
gem "capistrano-sidekiq", "~> 2.0"
```

You can type `cap -T` for details.

## License

Copyright (c) 2022 hfpp2012

Released under the MIT license:

- [www.opensource.org/licenses/MIT](http://www.opensource.org/licenses/MIT)
