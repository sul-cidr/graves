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
  # Javascript globals.
  #
  # @return hash
  #
  def js_globals
    {
      base_layers: BaseLayer.all,
      default_base_layer: base_layer.id,
    }
  end


end
