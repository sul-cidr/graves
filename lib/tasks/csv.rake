
namespace :csv do

  desc 'Google Fusion Table'
  task :fusion_table, [:path] => :environment do |t, args|

    args.with_defaults(path: 'fusion-table.csv')

    CSV.open(args.path, 'w',
      :write_headers => true,
      :headers => [
        'province_p',
        'province_c',
        'county_p',
        'county_c',
        'town_p',
        'town_c',
        'longitude',
        'latitude'
      ]
    ) do |fh|

      Collection.where { geometry != nil }.each do |c|
        fh << [
          c.province_p,
          c.province_c,
          c.county_p,
          c.county_c,
          c.town_p,
          c.town_c,
          c.geometry.x,
          c.geometry.y,
        ]
      end

    end

  end

  desc 'Geocoding QA'
  task :geocoding_qa, [:path] => :environment do |t, args|

    args.with_defaults(path: 'geocoding-qa.csv')

    # Omit PostGIS + timestamps.
    fields = Collection.column_names - [
      'geometry',
      'created_at',
      'updated_at',
    ]

    geojson = Collection.as_geojson(*fields)

    CSV.open(args.path, 'w',
      :write_headers => true,
      :headers => fields + ['latlon']
    ) do |fh|

      geojson['features'].each do |f|
        lonlat = f['geometry']['coordinates'].join(',')
        fh << f['properties'].merge('latlon' => lonlat)
      end

    end

  end

end
