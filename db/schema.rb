# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160208230332) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "authors", force: :cascade do |t|
    t.text     "first_name"
    t.text     "last_name"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "affiliation"
  end

  create_table "collections", force: :cascade do |t|
    t.integer  "num_graves"
    t.string   "location"
    t.string   "destination"
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.string   "province_p"
    t.string   "province_c"
    t.string   "prefect_p"
    t.string   "prefect_c"
    t.string   "county_p"
    t.string   "county_c"
    t.string   "town_p"
    t.string   "town_c"
    t.string   "village_p"
    t.string   "village_c"
    t.integer  "notice_id",                                         null: false
    t.geometry "geometry",    limit: {:srid=>4326, :type=>"point"}
    t.integer  "province_id"
    t.integer  "county_id"
    t.integer  "town_id"
    t.integer  "legacy_id"
  end

  add_index "collections", ["county_id"], name: "index_collections_on_county_id", using: :btree
  add_index "collections", ["geometry"], name: "index_collections_on_geometry", using: :gist
  add_index "collections", ["legacy_id"], name: "index_collections_on_legacy_id", unique: true, using: :btree
  add_index "collections", ["notice_id"], name: "index_collections_on_notice_id", using: :btree
  add_index "collections", ["province_id"], name: "index_collections_on_province_id", using: :btree
  add_index "collections", ["town_id"], name: "index_collections_on_town_id", using: :btree

  create_table "counties", force: :cascade do |t|
    t.integer  "province_id"
    t.string   "cdc_id"
    t.string   "name_p"
    t.string   "name_c"
    t.geometry "geometry",     limit: {:srid=>4326, :type=>"geometry"}
    t.jsonb    "demographics",                                          default: {}, null: false
    t.jsonb    "choropleths",                                           default: {}, null: false
  end

  add_index "counties", ["cdc_id"], name: "index_counties_on_cdc_id", unique: true, using: :btree
  add_index "counties", ["geometry"], name: "index_counties_on_geometry", using: :gist

  create_table "import_steps", force: :cascade do |t|
    t.string  "step",                     null: false
    t.boolean "finished", default: false
  end

  add_index "import_steps", ["step"], name: "index_import_steps_on_step", unique: true, using: :btree

  create_table "narratives", force: :cascade do |t|
    t.string   "title"
    t.text     "markup"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "author_id",  null: false
    t.string   "slug",       null: false
    t.string   "blurb"
    t.date     "pub_date"
    t.string   "subtitle"
  end

  add_index "narratives", ["author_id"], name: "index_narratives_on_author_id", using: :btree
  add_index "narratives", ["slug"], name: "index_narratives_on_slug", unique: true, using: :btree

  create_table "notices", force: :cascade do |t|
    t.date     "pub_date"
    t.date     "notice_date"
    t.date     "deadline"
    t.string   "url"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "site_p"
    t.string   "site_c"
    t.string   "title_p"
    t.string   "title_c"
    t.string   "org_p"
    t.string   "org_c"
    t.string   "contact_p"
    t.string   "contact_c"
    t.string   "contact_phone"
    t.integer  "legacy_id"
  end

  add_index "notices", ["legacy_id"], name: "index_notices_on_legacy_id", unique: true, using: :btree

  create_table "provinces", force: :cascade do |t|
    t.string   "cdc_id"
    t.string   "name_p"
    t.string   "name_c"
    t.geometry "geometry", limit: {:srid=>4326, :type=>"geometry"}
  end

  add_index "provinces", ["cdc_id"], name: "index_provinces_on_cdc_id", unique: true, using: :btree
  add_index "provinces", ["geometry"], name: "index_provinces_on_geometry", using: :gist

  create_table "towns", force: :cascade do |t|
    t.integer  "county_id"
    t.string   "cdc_id"
    t.string   "name_p"
    t.string   "name_c"
    t.geometry "geometry",  limit: {:srid=>4326, :type=>"geometry"}
  end

  add_index "towns", ["cdc_id"], name: "index_towns_on_cdc_id", unique: true, using: :btree
  add_index "towns", ["geometry"], name: "index_towns_on_geometry", using: :gist

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "collections", "counties"
  add_foreign_key "collections", "notices"
  add_foreign_key "collections", "provinces"
  add_foreign_key "collections", "towns"
  add_foreign_key "counties", "provinces"
  add_foreign_key "narratives", "authors"
  add_foreign_key "towns", "counties"
end
