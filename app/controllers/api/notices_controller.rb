
module API
  class NoticesController < ApplicationController

    def index
      respond_to do |format|
        format.json { render text: Notice.all.to_json }
        format.csv { render text: Notice.to_csv }
      end
    end

  end
end
