
require 'rails_helper'

describe Import::Step do

  describe '#up()' do

    context 'satisfied' do
      it 'does not run the step'
    end

    context 'not satisfied' do
      it 'runs the step'
      it 'registers the step'
    end

  end

  describe '#down()' do

    context 'satisfied' do
      it 'reverts the step'
      it 'unregisters the step'
    end

    context 'not satisfied' do
      it 'does not revert the step'
    end

  end

end
