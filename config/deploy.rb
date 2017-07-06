set :application, 'graves'
set :repo_url, 'https://github.com/sul-cidr/graves.git'

# Default branch is :master
ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

set :deploy_to, '/opt/app/cidr/graves'

# Default value for :linked_files is []
set :linked_files, %w[config/database.yml config/secrets.yml config/honeybadger.yml]

# Default value for linked_dirs is []
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system data}

# Default value for keep_releases is 5
set :keep_releases, 5

set :bundle_without, %w(test deployment development).join(' ')

set :rails_env, 'production'

set :npm_target_path, -> { release_path }
set :npm_flags, '--production --silent --no-progress'

before 'deploy:publishing', :compile_assets
before 'deploy:publishing', :upload_assets
