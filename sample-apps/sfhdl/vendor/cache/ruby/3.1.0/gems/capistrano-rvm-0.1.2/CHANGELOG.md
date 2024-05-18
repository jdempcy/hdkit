## 0.1.2 (14 Oct 2014)

* suppress this constant RVM checks if QUIET environment variables is set [#42](https://github.com/capistrano/rvm/pull/42)

* `rvm_roles` option [#41](https://github.com/capistrano/rvm/pull/41)

## 0.1.1

* Flexible SSHKit dependency

## 0.1.0

* User rvm is prefered over system (@mpapis)
* Switching to new command map (https://github.com/capistrano/sshkit/pull/45)
  This gives us more flexible integration and command mapping.
  Fixed bug when `cap some_task` didn't invoke RVM hooks.

## 0.0.3
Switching to detect the binaries at runtime using `rvm ruby do binary` (thanks to @mpapis!)

## 0.0.2

Initial release
