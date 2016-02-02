
require 'rails_helper'

describe GravesController, type: :controller do

  describe 'GET read' do

    it 'templates the narrative markup' do

      narrative = create(:narrative, title: 'Title')

      get :read, slug: narrative.slug

      expect(response).to render_template(:read)
      expect(assigns(:narrative)).to eq(narrative)

    end

  end

end
