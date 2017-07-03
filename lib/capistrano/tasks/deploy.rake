##
# Note: This is done in a non-standard way as the deployed server relies on a
# grunt compiled version rather than the asset pipeline.
desc 'Upload compiled JavaScript/CSS files to server'
task :upload_assets do
  on roles(:app) do
    with rails_env: fetch(:rails_env) do
      upload!(
        './public/javascripts',
        "#{release_path}/public/javascripts", recursive: true
      )
      upload!(
        './public/stylesheets',
        "#{release_path}/public/stylesheets", recursive: true
      )
    end
  end
end

desc 'Compile assets using grunt'
task :compile_assets do
  run_locally do
    execute 'node_modules/.bin/grunt compile:min'
  end
end
