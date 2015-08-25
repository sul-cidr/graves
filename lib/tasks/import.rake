
require_all './lib/vacuum', './lib/import'

runner = Vacuum::Runner.from_steps([
  Import::CreateNotices,
  Import::CreateCollections,
  Import::CreateTowns,
])

namespace :db do
  namespace :import do

    desc "Import data"
    task :up => :environment do
      runner.up
    end

    desc "Roll back import"
    task :down, [:step] => :environment do |t, args|
      runner.down(args.step)
    end

  end
end
