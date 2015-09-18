# County data preparation

1. Merge the counties into a single Shapefile, simplify by 95%:
  `mapshaper */export.shp encoding=gb18030 combine-files -merge-layers -simplify 5% -o counties-merged.shp`

1. Convert to EPSG:4326:
  `ogr2ogr --config SHAPE_ENCODING UTF-8 counties-4326.shp counties-merged.shp -t_srs EPSG:4326`
