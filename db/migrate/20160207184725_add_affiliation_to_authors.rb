class AddAffiliationToAuthors < ActiveRecord::Migration
  def change
    add_column :authors, :affiliation, :string
  end
end
