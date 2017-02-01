
module API
  class CountiesController < ApplicationController

    def index
      @counties = County.as_geojson(:name_p, :choropleths)

      respond_to do |format|
        format.json
        format.csv { render text: County.to_csv }
      end
    end

  end
end
