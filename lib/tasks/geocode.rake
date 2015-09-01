
namespace :geocode do

  desc 'Geocode collections'
  task :query => :environment do
    Collection.geocode
  end

  desc 'Link collection points with CDC records'
  task :link => :environment do
    Collection.link_cdc
  end

end
