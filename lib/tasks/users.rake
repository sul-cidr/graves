
namespace :users do

  desc 'Create a user'
  task :create, [:email, :pass] => :environment do |t, args|

    User.create!(
      email: args.email,
      password: args.pass,
      password_confirmation: args.pass,
    )

  end

end
