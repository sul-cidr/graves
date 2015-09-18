# County data preparation

1. Merge the counties into a single Shapefile:
  `mapshaper counties/*/export.shp encoding=utf8 combine-files -merge-layers -o counties-merged.shp`

1. Simplify the geometry:
  `mapshaper counties-merged.shp -simplify 5% -o counties.shp`
