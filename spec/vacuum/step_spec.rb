
require 'rails_helper'

describe Vacuum::Step, :quiet do

  let(:step) {

    klass = Class.new(Vacuum::Step) do

      attr_reader :calls

      def initialize
        super
        @calls = []
      end

      def self.name
        'TestStep'
      end

      def up
        @calls << 'u'
      end

      def down
        @calls << 'd'
      end

    end

    klass.new

  }

  describe '#_up()' do

    context 'when the step is safisfied' do

      before(:each) do
        create(:import_step, step: 'TestStep')
      end

      it 'does not run the step' do
        step._up
        expect(step.calls).to eq []
      end

    end

    context 'when the step is not satisfied' do

      it 'reverts and runs the step' do
        step._up
        expect(ImportStep.satisfied?('TestStep')).to be true
        expect(step.calls).to eq ['u']
      end

    end

  end

  describe '#_down()' do

    context 'when the step is satisfied' do

      before(:each) do
        create(:import_step, step: 'TestStep')
      end

      it 'reverts the step' do
        step._down
        expect(ImportStep.satisfied?('TestStep')).to be false
        expect(step.calls).to eq ['d']
      end

    end

    context 'when the step is not satisfied' do

      it 'does not revert the step' do
        step._down
        expect(step.calls).to eq []
      end

    end

  end

end
