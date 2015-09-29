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
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

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

    # TODO: Devise.
    config.authenticate_with do
      authenticate_or_request_with_http_basic do |u, p|
        u == ENV['GRAVES_USERNAME'] && p = ENV['GRAVES_PASSWORD']
      end
    end

    config.browser_validations = false

    config.included_models = [
      'Notice',
      'Collection',
      'Author',
      'Narrative',
    ]

    config.model Author do
      object_label_method :full_name
    end

  end
end
