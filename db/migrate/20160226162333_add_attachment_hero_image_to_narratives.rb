class AddAttachmentHeroImageToNarratives < ActiveRecord::Migration
  def self.up
    change_table :narratives do |t|
      t.attachment :hero_image
    end
  end

  def self.down
    remove_attachment :narratives, :hero_image
  end
end
