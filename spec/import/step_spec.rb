
require 'rails_helper'

describe Import::Step do

  let(:step) {
    Class.new(Import::Step) do
      def self.name
        'TestStep'
      end
    end
  }

  describe '#up()' do

    it 'does not run the step' do
      step.new.up
    end

  end

end
