class AddNoticeToCollections < ActiveRecord::Migration
  def change
    add_reference :collections, :notice, index: true, foreign_key: true
  end
end
