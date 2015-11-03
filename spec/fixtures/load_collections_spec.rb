
require 'rails_helper'

describe API::CollectionsController, type: :controller do

  render_views

  before(:each) do
    request.headers["Accept"] = "application/json"
  end

  describe "GET #index" do

    it "collections" do

      create(:collection, geometry: Helpers::Geo.point(1, 2))
      create(:collection, geometry: Helpers::Geo.point(3, 4))
      create(:collection, geometry: Helpers::Geo.point(5, 6))

      get :index

      write_fixture('load-collections', response.body)

    end

  end

end
