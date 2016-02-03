
require 'rails_helper'

describe GravesController, type: :controller do

  describe 'GET index' do

    before(:each) do
      get :index
    end

    it 'assigns the narratives' do
      expect(assigns(:narratives)).to eq(Narrative.all)
    end

    it 'renders the index template' do
      expect(response).to render_template(:index)
    end

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
