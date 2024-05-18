# Change Log

## 2.3.0 (2018-05-24)
### Feature
- remove rails 5.2 deprecation: _Passing the environment's name as a regular argument is deprecated and will be removed in the next Rails version. Please, use the -e option instead._
- allow to set capistrano role to select server for remote console (#33)
- allow to set shell used on server (#31)
- [add rails:c alias to rails:console](https://github.com/ydkn/capistrano-rails-console/issues/36)

## 2.2.1 (2017-09-04)
### Feature
- [add rails:db alias to rails:dbconsole](https://github.com/ydkn/capistrano-rails-console/pull/32)

## 2.2.0 (2016-10-25)
### Feature
- support for rbenv and chruby

## 2.1.1 (2016-10-04)
### Feature
- use password from database.yml for dbconsole

## 2.1.0 (2016-09-23)
### Feature
- add support for `rails dbconsole`
### Fixed
- revert unintentional change when the gem is required

## 2.0.0 (2016-09-16)
### Changed
- switched connection part to _sshkit-interactive_
- allow setting rails environment separately from deployment environment
- allow setting user to run rails console separately from ssh user

## 1.0.2 (2015-12-06)
### Fixed
- works with sshkit 1.8

## 1.0.1 (2015-11-12)
### Fixed
- setting ssh hostname through `ssh_options`
- use login shell

### Feature
- log ssh command before it is being executed

## 1.0.0 (2015-08-01)
### Fixed
- removed dependency on capistrano-rails gem setting propper rails_env
- setting ssh port through `ssh_options`
- setting ssh user through `ssh_options`
- require a minimum version of 3.1.0 for capistrano (sshkit compatibility)

### Feature
- support for ssh keys

## 0.5.2 (2015-04-02)
### Fixed
- removed rails binary check due to different environments in sshkit and the ssh shellout

## 0.5.1 (2015-04-01)
### Fixed
- missing ssh proxy options in console task
