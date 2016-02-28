# == Schema Information
#
# Table name: collection_tag_rels
#
#  id            :integer          not null, primary key
#  collection_id :integer          not null
#  tag_id        :integer          not null
#

class CollectionTagRel < ActiveRecord::Base
  belongs_to :collection
  belongs_to :tag
end
