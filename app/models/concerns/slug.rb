
module Slug

  extend ActiveSupport::Concern

  included do

    validates :slug, presence: true
    validates :slug, uniqueness: true
    validates :slug, format: { with: /\A[a-z0-9-]*\z/ }

  end

end
