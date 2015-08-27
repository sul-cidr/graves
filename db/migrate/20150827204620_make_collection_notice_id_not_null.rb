class MakeCollectionNoticeIdNotNull < ActiveRecord::Migration
  def change
    change_column_null :collections, :notice_id, false
  end
end
