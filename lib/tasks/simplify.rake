
namespace :counties do

  desc 'Clean derivative files'
  task :clean do
    `rm data/cdc/counties/counties*`
  end

  desc 'Merge counties into a single shapefile'
  task :merge => :clean do

    `mapshaper \
    data/cdc/counties/*/export.shp \
    encoding=gb18030 \
    combine-files \
    -merge-layers \
    -o data/cdc/counties/counties.shp`

  end

  desc 'Unproject the merged shapefile'
  task :unproject => :merge do

    `ogr2ogr \
    --config SHAPE_ENCODING UTF-8 \
    data/cdc/counties/counties-unprojected.shp \
    data/cdc/counties/counties.shp \
    -t_srs EPSG:4326`

  end

  desc 'Convert to simplified topojson'
  task :simplify => :unproject do

    `topojson \
    data/cdc/counties/counties-unprojected.shp \
    -s 0.000001 \
    -o data/cdc/counties/counties-simplified.topojson \
    -p`

  end

  desc 'Convert back to shapefile'
  task :finalize => :simplify do

    `mapshaper \
    data/cdc/counties/counties-simplified.topojson \
    -o data/cdc/counties/counties-final.shp`

  end

end
