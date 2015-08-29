class AddPlaceToCollections < ActiveRecord::Migration
  def change
    add_reference :collections, :place, index: true, foreign_key: true
  end
end
