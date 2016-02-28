class CreateCollectionTagRels < ActiveRecord::Migration
  def change

    create_table :collection_tag_rels do |t|

      t.integer :collection_id, null: false
      t.integer :tag_id, null: false

      t.foreign_key :collections
      t.foreign_key :tags

    end

    add_index(
      :collection_tag_rels,
      [:collection_id, :tag_id],
      unique: true,
    )

    add_index :collection_tag_rels, :collection_id
    add_index :collection_tag_rels, :tag_id

  end
end
