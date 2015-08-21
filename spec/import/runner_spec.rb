
require 'rails_helper'

describe Import::Runner, :quiet do

  describe '#up()' do

    it 'runs all steps in order' do

      # Stub in up/down methods.
      step = Class.new(Import::Step) do

        def up
          true
        end

        def down
          true
        end

      end

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
        step3, step1, step2
      ])

      runner.up

      pp step1.depends
      pp step2.depends
      pp step3.depends

    end

  end

end
