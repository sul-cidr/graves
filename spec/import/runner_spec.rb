
require 'rails_helper'

describe Import::Runner, :quiet do

  before(:each) do
    $up = []
    $down = []
  end

  after(:each) do
    $up = nil
    $down = nil
  end

  let(:step) do
    Class.new(Import::Step) do

      def up
        $up.append(self.class.name)
      end

      def down
        $down.append(self.class.name)
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

      expect($up).to eq [
        'Step1',
        'Step2',
        'Step3',
      ]

    end

  end

  describe '#down()' do

    it 'reverts a step, and all steps that depend on it' do

      # step1 -> step2
      #       -> step3 -> step4

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
        @depends = [step1]
        def self.name
          'Step3'
        end
      end

      step4 = Class.new(step) do
        @depends = [step3]
        def self.name
          'Step4'
        end
      end

      runner = Import::Runner.from_steps([
        step1,
        step2,
        step3,
        step4,
      ])

      runner.up
      runner.down('Step3')

      expect($down).to eq [
        'Step4',
        'Step3',
      ]

    end

  end

end
