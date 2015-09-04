
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

      Collection.where { lonlat != nil }.each do |c|
        fh << [
          c.province_p,
          c.province_c,
          c.county_p,
          c.county_c,
          c.town_p,
          c.town_c,
          c.lonlat.x,
          c.lonlat.y,
        ]
      end

    end

  end

  desc 'Geocoding QA'
  task :geocoding, [:path] => :environment do |t, args|

    args.with_defaults(path: 'geocoding.csv')

    CSV.open(args.path, 'w',
      :write_headers => true,
      :headers => [
        'province',
        'province_cdc',
        'county',
        'county_cdc',
        'town',
        'town_cdc',
      ]
    ) do |fh|

      Collection.all.each do |c|

        row = {}

        if c.town
          row[:town] = c.town_c
          row[:town_cdc] = c.town.name_c
          row[:county] = c.county_c
          row[:county_cdc] = c.town.county.name_c
          row[:province] = c.province_c
          row[:province_cdc] = c.town.county.province.name_c
        elsif c.county
          row[:county] = c.county_c
          row[:county_cdc] = c.county.name_c
          row[:province] = c.province_c
          row[:province_cdc] = c.county.province.name_c
        elsif c.province
          row[:province] = c.province_c
          row[:province_cdc] = c.province.name_c
        end

        fh << row.values

      end

    end

  end

end
