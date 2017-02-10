# config valid only for current version of Capistrano
lock '3.4.0'

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

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

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

# Install devDependencies
set :npm_flags, '--silent --no-spin'

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
