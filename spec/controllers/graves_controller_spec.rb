
require 'rails_helper'

describe GravesController, type: :controller do

  describe 'GET index' do
  end

  describe 'GET read' do

    let!(:narrative) {
      create(:narrative)
    }

    before(:each) do
      get :read, slug: narrative.slug
    end

    it 'assigns the narrative' do
      expect(assigns(:narrative)).to eq(narrative)
    end

    it 'renders the read template' do
      expect(response).to render_template(:read)
    end

  end

end
