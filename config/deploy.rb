set :application, 'graves'
set :repo_url, 'https://github.com/sul-cidr/graves.git'
set :user, 'cidr'

set :deploy_host, ENV['CAP_DEPLOY_HOST']
set :home_directory, "/opt/app/#{fetch(:user)}"
set :deploy_to, "#{fetch(:home_directory)}/#{{fetch(:application)}}"
set :bundle_without, nil

set :npm_target_path, -> { release_path }
set :npm_flags, '--production --silent --no-progress'

server "#{fetch(:deploy_host)}.stanford.edu", user: fetch(:user), roles: %w{web db app}

# Default branch is :master
ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push(
  'config/secrets.yml',
  'config/database.yml',
  '.env',
)

# Default value for linked_dirs is []
 set :linked_dirs, fetch(:linked_dirs, []).push(
   'log',
   'public/system',
   'tmp/pids',
   'tmp/cache',
   'tmp/sockets',
   'data',
 )

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5
