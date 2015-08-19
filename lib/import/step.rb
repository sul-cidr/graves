
class Import::Step

  class << self
    attr_accessor :depends
  end

  @depends = []

  #
  # Initialize the progress bar.
  #
  def initialize

    @DB = Helpers::Legacy.DB

    if count
      @bar = ProgressBar.new(count)
    end

  end

  #
  # How many items will the step process?
  #
  # @return [Integer]
  #
  def count
    nil
  end

  #
  # Increment the progress bar.
  #
  def increment
    @bar.increment
  end

  #
  # Run the step.
  #
  def up
    raise NotImplementedError
  end

  #
  # Reverse the step.
  #
  def down
    raise NotImplementedError
  end

  #
  # Has the step been run?
  #
  def satistied?
    return false
    # TODO: Query import_steps.
  end

end
