
require_all './lib/vacuum', './lib/import'

runner = Vacuum::Runner.from_steps([
  Import::CreateNotices,
  Import::CreateCollections,
  Import::CreateTowns,
  Import::CreateProvinces,
  Import::SimplifyCounties,
  Import::CreateCounties,
])

namespace :db do
  namespace :import do

    desc 'Import data'
    task :up => :environment do
      runner.up
    end

    desc 'Roll back import'
    task :down => :environment do
      runner.down
    end

    desc 'Run an individual step'
    task :run, [:step] => :environment do |t, args|
      runner.down(args.step)
      runner.up(args.step)
    end

  end
end
