RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version'

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show


    # Authenticate with Devise

    config.authenticate_with do
      warden.authenticate! scope: :user
    end

    config.current_user_method(&:current_user)

    # Disable .js form validation
    config.browser_validations = false

    config.included_models = [
      'Notice',
      'Collection',
      'Author',
      'Narrative',
      'User',
    ]

    config.model User do
      list do
        field :email
      end
      edit do
        field :email
        field :password
        field :password_confirmation
      end
    end

    config.model Author do
      object_label_method :full_name
    end


  end
end
