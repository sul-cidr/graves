
desc 'Upload shared configs for non DLSS setups'
task :upload_shared_configs do
  tmp_repo = "#{Dir.mktmpdir}/shared_configs"
  ask :shared_configs_repo, 'sul-dlss/shared_configs'
  ask :shared_configs_branch, fetch(:shared_configs_default_branch)
  ask :ssh_key, '~/.ssh/id_rsa'
  run_locally do
    execute("ssh-agent bash -c 'ssh-add #{fetch(:ssh_key)}; " \
            "git clone -b #{fetch(:shared_configs_branch)} " \
            "git@github.com:#{fetch(:shared_configs_repo)}.git " \
            "#{tmp_repo}'")
  end
  on roles(:app) do
    with rails_env: fetch(:rails_env) do
      upload!(
        "#{tmp_repo}/config",
        "#{deploy_to}/shared/", recursive: true
      )
    end
  end
  run_locally do
    execute "rm -rf #{tmp_repo}"
  end
end

desc 'Restart the httpd service'
task :restart_httpd do
  on roles(:all) do
    execute :sudo, '/sbin/service httpd restart'
  end
end
