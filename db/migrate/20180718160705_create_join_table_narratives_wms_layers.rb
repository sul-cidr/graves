class CreateJoinTableNarrativesWmsLayers < ActiveRecord::Migration
  def change
    create_join_table :narratives, :wms_layers do |t|
      t.index [:narrative_id, :wms_layer_id]
      t.index [:wms_layer_id, :narrative_id]
    end
  end
end
