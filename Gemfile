
source 'https://rubygems.org'
ruby '2.2.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'

# Use postgresql as the database for Active Record
gem 'pg'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'require_all'
gem 'squeel'
gem 'activerecord-postgis-adapter'
gem 'rgeo-geojson'
gem 'progress_bar'
gem 'method_hooks'
gem 'unicode'
gem 'rgeo-shapefile'
gem 'slim-rails'
gem 'dotenv-rails'
gem 'oj'
gem 'rails_admin'
gem 'geocoder'

group :development, :test do

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem 'annotate'
  gem 'sequel'
  gem 'colorize'
  gem 'rack-livereload'

end

group :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'shoulda-matchers', require: false
  gem 'rspec-mocks'
  gem 'database_cleaner'
  gem 'with_model'
end

group :deployment do
  gem 'capistrano', '~> 3.0'
  gem 'capistrano-rails'
  gem 'capistrano-rvm'
  gem 'capistrano-bundler'
  gem 'capistrano-npm'
  gem 'dlss-capistrano'
  gem 'therubyracer', platforms: :ruby
end
