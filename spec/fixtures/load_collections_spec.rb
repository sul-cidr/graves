
require 'rails_helper'

describe API::CollectionsController, type: :controller do

  render_views

  before(:each) do
    request.headers["Accept"] = "application/json"
  end

  describe "GET #index" do

    it "collections" do

      create(:collection, id: 1, geometry: Helpers::Geo.point(1, 2))
      create(:collection, id: 2, geometry: Helpers::Geo.point(3, 4))
      create(:collection, id: 3, geometry: Helpers::Geo.point(5, 6))

      get :index

      write_fixture('collections', response.body)

    end

  end

end
