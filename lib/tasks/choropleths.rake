
namespace :choropleths do

  desc 'Generate county choropleths'
  task :counties => :environment do
    County.generate_choropleths
  end

end
