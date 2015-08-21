
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

  let(:base_step) do
    Class.new(Import::Step) do

      def up
        $up.append(self.class.name)
      end

      def down
        $down.append(self.class.name)
      end

    end
  end

  def make_step(name, depends=[])
    Class.new(base_step) do

      @depends = depends

      define_singleton_method :name do
        name
      end

    end
  end

  describe '#up()' do

    it 'runs all steps in order' do

      # step1 -> step2 -> step3

      step1 = make_step('Step1')
      step2 = make_step('Step2', [step1])
      step3 = make_step('Step3', [step2])

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

      step1 = make_step('Step1')
      step2 = make_step('Step2', depends=[step1])
      step3 = make_step('Step3', depends=[step1])
      step4 = make_step('Step4', depends=[step3])

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
