# == Schema Information
#
# Table name: narratives
#
#  id            :integer          not null, primary key
#  title         :string
#  markup        :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  author_id     :integer          not null
#  slug          :string           not null
#  blurb         :text
#  pub_date      :date
#  subtitle      :string
#  base_layer_id :integer          not null
#

class Narrative < ActiveRecord::Base


  belongs_to :author
  belongs_to :base_layer

  validates :author, presence: true
  validates :base_layer, presence: true

  validates :slug, presence: true
  validates :slug, uniqueness: true
  validates :slug, format: { with: /\A[a-z0-9-]*\z/ }


  #
  # Assemble .js globals.
  #
  # @return hash
  #
  def for_js
    {

      baseLayers: BaseLayer.all.index_by(&:id),
      baseLayerId: base_layer.id,

      wmsLayers: WmsLayer.all.index_by(&:id),

    }
  end


end
