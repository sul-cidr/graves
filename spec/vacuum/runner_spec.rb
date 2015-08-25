
require 'rails_helper'

describe Vacuum::Runner, :quiet do

  attr_accessor :up, :down

  before(:each) do
    @up   = []
    @down = []
  end

  after(:each) do
    @up   = nil
    @down = nil
  end

  def make_step(name, depends=[])

    suite = self

    Class.new(Vacuum::Step) do

      @depends = depends

      define_singleton_method :name do
        name
      end

      define_method :up do
        suite.up.append(self.class.name)
      end

      define_method :down do
        suite.down.append(self.class.name)
      end

    end

  end

  describe '#add_step()' do

    it 'registers up / down dependencies' do

      step1 = make_step('Step1')
      step2 = make_step('Step2', [step1])
      step3 = make_step('Step3', [step2])
      step4 = make_step('Step4', [step3])
      step5 = make_step('Step5', [step4])

      steps = [
        step1,
        step2,
        step3,
        step4,
        step5,
      ]

      # Add steps in all orders.
      steps.permutation(5).each do |order|

        runner = Vacuum::Runner.from_steps(order)

        expect(runner.udeps.tsort).to eq [
          step1,
          step2,
          step3,
          step4,
          step5,
        ]

        expect(runner.ddeps.tsort).to eq [
          step5,
          step4,
          step3,
          step2,
          step1,
        ]

      end

    end

  end

  describe '#up()' do

    let(:runner) {

      # step1 -> step2 -> step3
      step1 = make_step('Step1')
      step2 = make_step('Step2', [step1])
      step3 = make_step('Step3', [step2])

      Vacuum::Runner.from_steps([
        step1,
        step2,
        step3,
      ])

    }

    context 'when a step is passed' do

      it 'runs the step, and all steps that it depends on' do
        runner.up('Step2')
        expect(@up).to eq [
          'Step1',
          'Step2',
        ]
      end

    end

    context 'when a step is not passed' do

      it 'runs all steps in order' do
        runner.up
        expect(@up).to eq [
          'Step1',
          'Step2',
          'Step3',
        ]
      end

    end

  end

  describe '#down()' do

    let(:runner) {

      # step1 -> step2 -> step3
      step1 = make_step('Step1')
      step2 = make_step('Step2', [step1])
      step3 = make_step('Step3', [step2])

      Vacuum::Runner.from_steps([
        step1,
        step2,
        step3,
      ])

    }

    before(:each) do
      runner.up
    end

    context 'when a step is passed' do

      it 'reverts the step, and all steps that depend on it' do
        runner.down('Step2')
        expect(@down).to eq [
          'Step3',
          'Step2',
        ]
      end

    end

    context 'when a step is not passed' do

      it 'reverts all steps' do
        runner.down
        expect(@down).to eq [
          'Step3',
          'Step2',
          'Step1',
        ]
      end

    end

  end

end
