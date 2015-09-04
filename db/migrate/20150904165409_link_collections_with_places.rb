class LinkCollectionsWithPlaces < ActiveRecord::Migration
  def change
    add_reference :collections, :province, index: true, foreign_key: true
    add_reference :collections, :county, index: true, foreign_key: true
    add_reference :collections, :town, index: true, foreign_key: true
  end
end
