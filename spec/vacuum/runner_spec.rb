
require 'rails_helper'

describe Vacuum::Runner, :quiet do

  attr_accessor :usteps, :dsteps

  def listen
    @usteps = []
    @dsteps = []
  end

  def make_step(name, depends=[])

    suite = self

    Class.new(Vacuum::Step) do

      @depends = depends

      define_singleton_method :name do
        name
      end

      define_method :up do
        suite.usteps << name
      end

      define_method :down do
        suite.dsteps << name
      end

    end

  end

  before(:each) do
    listen
  end

  describe '.from_steps()' do

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

    it 'registers steps with no dependencies' do

      step1 = make_step('Step1')
      step2 = make_step('Step2')
      step3 = make_step('Step3')

      steps = [
        step1,
        step2,
        step3,
      ]

      runner = Vacuum::Runner.from_steps(steps)

      expect(runner.udeps.tsort).to include(*steps)
      expect(runner.ddeps.tsort).to include(*steps)

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
        expect(@usteps).to eq [
          'Step1',
          'Step2',
        ]
      end

    end

    context 'when a step is not passed' do

      it 'runs all steps in order' do
        runner.up
        expect(@usteps).to eq [
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
      listen
    end

    context 'when a step is passed' do

      it 'reverts the step, and all steps that depend on it' do
        runner.down('Step2')
        expect(@dsteps).to eq [
          'Step3',
          'Step2',
        ]
      end

    end

    context 'when a step is not passed' do

      it 'reverts all steps' do
        runner.down
        expect(@dsteps).to eq [
          'Step3',
          'Step2',
          'Step1',
        ]
      end

    end

  end

end
