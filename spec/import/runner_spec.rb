
require 'rails_helper'

describe Import::Runner, :quiet do

  before(:each) do
    $order = []
  end

  after(:each) do
    $order = nil
  end

  let(:step) do
    Class.new(Import::Step) do

      def up
        $order.append(self.class.name)
      end

      def down
        $order.append(self.class.name)
      end

    end
  end

  describe '#up()' do

    it 'runs all steps in order' do

      # step1 -> step2 -> step3

      step1 = Class.new(step) do

        def self.name
          'Step1'
        end

      end

      step2 = Class.new(step) do

        @depends = [step1]

        def self.name
          'Step2'
        end

      end

      step3 = Class.new(step) do

        @depends = [step2]

        def self.name
          'Step3'
        end

      end

      runner = Import::Runner.from_steps([
        step3,
        step2,
        step1,
      ])

      runner.up

      expect($order).to eq [
        'Step1',
        'Step2',
        'Step3',
      ]

    end

  end

end
