
require 'rails_helper'

describe Import::Step do

  let(:step) {
    Import::Step.new
  }

  describe '#up()' do

    it 'does not run the step' do
      step.up
    end

  end

end
