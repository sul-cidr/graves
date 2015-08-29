
namespace :csv do

  desc 'Generate colections CSV'
  task :collections, [:path] => :environment do |t, args|

    args.with_defaults(path: 'collections.csv')

    CSV.open(args.path, 'w',
      :write_headers => true,
      :headers => [
        'province',
        'county',
        'town',
        'longitude',
        'latitude'
      ]
    ) do |fh|

      Collection.where { lonlat != nil }.each do |e|
        fh << [
          e.province_p,
          e.county_p,
          e.town_p,
          e.lonlat.x,
          e.lonlat.y
        ]
      end

    end

  end

end
