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

ActiveRecord::Schema.define(version: 20150817164031) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_users", force: :cascade do |t|
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

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree

  create_table "collections", force: :cascade do |t|
    t.integer  "grave_count"
    t.string   "location"
    t.string   "destination"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "province_e"
    t.string   "province_c"
    t.string   "prefect_e"
    t.string   "prefect_c"
    t.string   "county_e"
    t.string   "county_c"
    t.string   "town_e"
    t.string   "town_c"
    t.string   "village_e"
    t.string   "village_c"
  end

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
  end

end
