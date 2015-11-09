
require 'rails_helper'

describe 'Shared', type: :controller do

  render_views

  before(:each) do
    request.headers['Accept'] = 'application/json'
  end

  it 'empty counties' do

    @controller = API::CountiesController.new
    get :index

    write_fixture(
      'shared',
      'empty-counties',
      response.body
    )

  end

end
