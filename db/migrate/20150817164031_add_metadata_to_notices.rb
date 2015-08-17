class AddMetadataToNotices < ActiveRecord::Migration
  def change
    add_column :notices, :site_p, :string
    add_column :notices, :site_c, :string
    add_column :notices, :title_p, :string
    add_column :notices, :title_c, :string
    add_column :notices, :org_p, :string
    add_column :notices, :org_c, :string
    add_column :notices, :contact_p, :string
    add_column :notices, :contact_c, :string
    add_column :notices, :contact_phone, :string
  end
end
