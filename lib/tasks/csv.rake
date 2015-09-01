
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

      Collection.where { lonlat != nil }.each do |c|
        fh << [
          c.province_p,
          c.county_p,
          c.town_p,
          c.lonlat.x,
          c.lonlat.y,
        ]
      end

    end

  end

end
