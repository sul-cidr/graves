
HighVoltage.configure do |config|

  # Un-prefixed routes for static pages.
  config.route_drawer = HighVoltage::RouteDrawers::Root

  # Use the custom layout.
  config.layout = 'page'

end
