server 'cidr-graves-dev.stanford.edu', user: 'cidr', roles: %w{web db app}
Capistrano::OneTimeKey.generate_one_time_key!
