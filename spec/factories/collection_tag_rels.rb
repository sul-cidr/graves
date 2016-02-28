# == Schema Information
#
# Table name: collection_tag_rels
#
#  id            :integer          not null, primary key
#  collection_id :integer          not null
#  tag_id        :integer          not null
#

FactoryGirl.define do

  factory :collection_tag_rel do
    collection
    tag
  end

end
