server 'cidr-graves-demo.stanford.edu', user: 'cidr', roles: %w{web db app}
Capistrano::OneTimeKey.generate_one_time_key!
