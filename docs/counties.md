# County data preparation

1. Merge the counties into a single Shapefile, simplify by 95%:
  `mapshaper */export.shp encoding=gb18030 combine-files -merge-layers -simplify 5% -o counties.shp`
