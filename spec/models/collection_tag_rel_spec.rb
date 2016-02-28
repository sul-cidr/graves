# == Schema Information
#
# Table name: collection_tag_rels
#
#  id            :integer          not null, primary key
#  collection_id :integer          not null
#  tag_id        :integer          not null
#

require 'rails_helper'

describe CollectionTagRel, type: :model do

  describe "columns" do
    it { should have_db_column(:collection_id).with_options(null: false) }
    it { should have_db_column(:tag_id).with_options(null: false) }
  end

  describe "indexes" do
    it { should have_db_index([:collection_id, :tag_id]).unique }
    it { should have_db_index(:collection_id) }
    it { should have_db_index(:tag_id) }
  end

  describe "associations" do
    it { should belong_to(:collection) }
    it { should belong_to(:tag) }
  end

end
