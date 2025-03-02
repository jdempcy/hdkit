# HDKit Sample App

This is a sample application for **HDKit**, a toolkit for generating Human Design bodygraphs and doing other Human Design-related calculations.

## Quickstart
Make sure your computer set up for Ruby on Rails development (i.e. installing Ruby and Ruby version manager of your choice, Rails, Bundler) as well as PostgreSQL.
Clone the repo and navigate to the root of the project: ``git clone https://github.com/jdempcy/hdkit.git`` and ``cd hdkit/sample-apps/hdkit_sample_app``
Install all gems: ``bundle install``
Create database and tables: ``rails db:create`` and ``rails db:migrate``
Run the server: ``./bin/dev`` or ``rails server`` (``./bin/dev`` is preferred in modern Rails development as it loads webpack and other pipelines, but for the purposes of this demo app, ``rails server`` is sufficient)
Visit localhost:3000/bodygraphs and make a new bodygraph!
Note: If you do not configure a GOOGLE_API_KEY in your environment, then it will fail in the Google API calls. This is no problem if you are using the default sample data as we have a hard-coded value fallback, but if you want to test it out with your own bodygraphs, you need to set GOOGLE_API_KEY to be your key for accessing their APIs.
