
require 'rails_helper'

describe Vacuum::Step, :quiet do

  let(:step) {
    Class.new(Vacuum::Step) do

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

    context 'when the step is safisfied' do

      before(:each) do
        create(:import_step, step: 'TestStep')
      end

      it 'does not run the step' do
        expect(step.new.up).to be nil
      end

    end

    context 'when the step is not satisfied' do

      it 'runs the step' do
        expect(step.new.up).to be true
        expect(ImportStep.satisfied?('TestStep')).to be true
      end

    end

  end

  describe '#down()' do

    context 'when the step is satisfied' do

      before(:each) do
        create(:import_step, step: 'TestStep')
      end

      it 'reverts the step' do
        expect(step.new.down).to be true
        expect(ImportStep.satisfied?('TestStep')).to be false
      end

    end

    context 'when the step is not satisfied' do

      it 'does not revert the step' do
        expect(step.new.down).to be nil
      end

    end

  end

end
