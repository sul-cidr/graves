class SetAuthorFieldsNotNull < ActiveRecord::Migration
  def change
    change_column_null :authors, :first_name, false
    change_column_null :authors, :last_name, false
    change_column_null :authors, :affiliation, false
  end
end
