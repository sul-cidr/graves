set :application, 'chinesedeathscape'
ask :server_user, 'deathscape'
set :deploy_to, "/home/#{fetch(:server_user)}/chinesedeathscape"

server 'chinesedeathscape.supdigital.org', user: fetch(:server_user),
                                           roles: %w[web db app]
set :default_env, RECLAIM_HOSTING: 'true',
                  PASSENGER_INSTANCE_REGISTRY_DIR: '/opt/cpanel/ea-ruby24' \
                                                   '/root/usr/var' \
                                                   '/run/passenger-instreg'
Capistrano::OneTimeKey.generate_one_time_key!

set :shared_configs_default_branch, 'cidr-graves'
before 'deploy:check', :upload_shared_configs
after 'deploy', :restart_httpd
