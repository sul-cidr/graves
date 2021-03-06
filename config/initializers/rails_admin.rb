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

  end


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
    'BaseLayer',
    'WmsLayer',
    'Tag',
    'User',
    'Province',
    'Town',
    'County',
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


  config.model BaseLayer do

    label 'Base Layer'
    object_label_method :name

    edit do
      field :name
      field :slug
      field :url
    end

  end

  config.model Collection do

    configure :geometry do
      show
      help 'Optional - WKT format: POINT(-71.064544 42.28787)'
    end

    configure :no_marker do
      show
      help 'Optional - When checked, no marker, popup, or modal ' \
           'will be rendered on the map'
    end

    edit do
      include_all_fields
      field :geometry
    end
  end

  config.model County do

    configure :geometry do
      show
      help 'Optional - WKT format: POINT(-71.064544 42.28787)'
    end

    edit do
      include_all_fields
      field :geometry
    end
  end

  config.model Province do

    configure :geometry do
      show
      help 'Optional - WKT format: POINT(-71.064544 42.28787)'
    end

    edit do
      include_all_fields
      field :geometry
    end
  end

  config.model Town do

    configure :geometry do
      show
      help 'Optional - WKT format: POINT(-71.064544 42.28787)'
    end

    edit do
      include_all_fields
      field :geometry
    end
  end

  config.model WmsLayer do

    label 'WMS Layer'
    object_label_method :name

    edit do
      field :name
      field :slug
      field :address
      field :layer
    end

  end

  CDC_CODES_PATH = '../../../app/assets/javascripts/read/src/data/cdc-codes.yml'
  config.model Narrative do

    configure :pub_date do
      show
      label 'Publication Date'
    end

    list do
      sort_by :order
    end

    edit do

      field :title
      field :subtitle
      field :author
      field :slug
      field :order do
        show
        label 'Order'
        help 'Optional. Use negative values to hide them from TOC and navigation links'
      end
      field :blurb
      field :markup
      field :hidden do
        show
        label 'Hide in table of contents'
        help '"About" and "People" narratives should have this attribute set to true'
      end
      field :year_start do
        show
        label 'Time slider year start'
        help 'Optional (defaults to 2000)'
      end
      field :year_end do
        show
        label 'Time slider year end'
        help 'Optional (defaults to 2015)'
      end
      field :base_layer do
        show
        label 'Base layer (initial)'
      end
      field :wms_layers do
        show
        label 'WMS layer (initial)'
      end
      field :choropleth, :enum do
        label 'Choropleth layer (initial)'
        enum do
        HashWithIndifferentAccess.new(
          YAML.load(
            File.read(
              File.expand_path(CDC_CODES_PATH, __FILE__)
            )
          )
        )["counties"].invert
        end
      end

      include_all_fields

    end

  end


  config.model Tag do
    object_label_method :label
  end


end
