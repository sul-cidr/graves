
class Import::Step

  extend MethodHooks

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
  # Generate a slug for the step.
  #
  # @return [String]
  #
  def slug
    name.demodulize
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
  # Print satisfied.
  #
  def puts_satisfied
    puts "SATISFIED: #{name}".colorize(:light_white)
  end

  #
  # Print importing.
  #
  def puts_importing
    puts "IMPORTING: #{name}".colorize(:green)
  end

  #
  # Print reverting.
  #
  def puts_reverting
    puts "REVERTING: #{name}".colorize(:green)
  end

  around :up do |method|
    if ImportStep.satisfied?(slug)
      puts_satisfied
    else
      puts_importing
      method.call
      ImportStep.up(slug)
    end
  end

  around :down do |method|
    if ImportStep.satisfied?(slug)
      puts_reverting
      method.call
      ImportStep.down(slug)
    else
      puts_satisfied
    end
  end

end
