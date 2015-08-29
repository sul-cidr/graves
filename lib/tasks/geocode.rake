
namespace :geocode do

  desc 'Geocode collections'
  task :collections => :environment do
    Collection.geocode
  end

end
