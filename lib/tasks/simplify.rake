
namespace :simplify do

  desc 'Simplify counties'
  task :counties => :environment do

    # Merge:

    `mapshaper \
    data/cdc/counties/*/export.shp \
    encoding=gb18030 \
    combine-files \
    -merge-layers \
    -o data/cdc/counties/counties.shp`

    # Simplify:

    `ogr2ogr \
    --config SHAPE_ENCODING UTF-8 \
    data/cdc/counties/counties-unprojected.shp \
    data/cdc/counties/counties.shp \
    -t_srs EPSG:4326`

  end

end
