
require 'rails_helper'

describe Import::Step, :quiet do

  let(:step) {
    Class.new(Import::Step) do

      def self.name
        'TestStep'
      end

      def up
        true
      end

      def down
        true
      end

    end
  }

  describe '#up()' do

    context 'safisfied' do

      it 'does not run the step' do
        create(:import_step, step: 'TestStep')
        expect(step.new.up).to be nil
      end

    end

    context 'not satisfied' do

      it 'runs the step' do
        expect(step.new.up).to be true
        expect(ImportStep.satisfied?('TestStep')).to be true
      end

    end

  end

end
