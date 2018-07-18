# == Schema Information
#
# Table name: narratives
#
#  id                      :integer          not null, primary key
#  title                   :string
#  markup                  :text
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  author_id               :integer          not null
#  slug                    :string           not null
#  blurb                   :text
#  pub_date                :date
#  subtitle                :string
#  base_layer_id           :integer          not null
#  wms_layer_id            :integer          not null
#  choropleth              :string           null
#  hero_image_file_name    :string
#  hero_image_content_type :string
#  hero_image_file_size    :integer
#  hero_image_updated_at   :datetime
#

class Narrative < ActiveRecord::Base


  include Slug

  belongs_to :author
  belongs_to :base_layer
  has_and_belongs_to_many :wms_layers

  validates :author, presence: true
  validates :base_layer, presence: true

  has_attached_file :hero_image

  validates_attachment_content_type(
    :hero_image,
    content_type: /\Aimage\/.*\Z/
  )


  #
  # Assemble .js globals.
  #
  # @return hash
  #
  def for_js
    {

      baseLayers: BaseLayer.all.index_by(&:slug),
      baseLayerSlug: base_layer.slug,

      wmsLayers: WmsLayer.all.index_by(&:slug),
      wmsLayerSlug: wms_layers && wms_layers.map(&:slug).join(","),

      choroplethCode: choropleth,
    }
  end


end
