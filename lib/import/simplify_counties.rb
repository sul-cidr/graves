
module Import
  class SimplifyCounties < Step

    def up
      run do
        merge
        unproject
        simplify
        finalize
      end
    end

    def down
      run do
        FileUtils.rm(Dir.glob('counties*'), force: true)
      end
    end

    def run
      Dir.chdir(Rails.root.join('data/cdc/counties')) do
        yield
      end
    end

    #
    # Merge into a single shapefile.
    #
    def merge
      `mapshaper */export.shp \
      encoding=gb18030 combine-files -merge-layers \
      -o counties-merged.shp`
    end

    #
    # Unproject the combined shapefile.
    #
    def unproject
      `ogr2ogr --config SHAPE_ENCODING UTF-8 \
      counties-unprojected.shp counties-merged.shp \
      -t_srs EPSG:4326`
    end

    #
    # Convert to simplified TopoJSON.
    #
    def simplify
      `topojson counties-unprojected.shp -p -s 0.000001 \
      -o counties-simplified.topojson`
    end

    #
    # Convert back into a shapefile.
    #
    def finalize
      `mapshaper counties-simplified.topojson \
      -o counties.shp`
    end

  end
end
