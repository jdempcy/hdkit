# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_03_02_210828) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "bodygraphs", force: :cascade do |t|
    t.string "name"
    t.datetime "birth_date_local"
    t.datetime "birth_date_utc"
    t.datetime "design_date_utc"
    t.string "birth_country"
    t.string "birth_city"
    t.string "aura_type"
    t.string "inner_authority"
    t.string "definition"
    t.string "profile"
    t.string "incarnation_cross"
    t.string "determination"
    t.string "environment"
    t.string "view"
    t.string "motivation"
    t.string "cognition"
    t.string "sense"
    t.string "variable"
    t.string "personality_activations"
    t.string "design_activations"
    t.boolean "head_defined"
    t.boolean "ajna_defined"
    t.boolean "throat_defined"
    t.boolean "spleen_defined"
    t.boolean "solar_plexus_defined"
    t.boolean "g_center_defined"
    t.boolean "sacral_defined"
    t.boolean "root_defined"
    t.boolean "ego_defined"
    t.integer "personality_nodes_tone"
    t.integer "design_nodes_tone"
    t.string "timezone"
    t.float "latitude"
    t.float "longitude"
    t.string "birth_date"
    t.string "birth_time"
    t.string "all_activated_gates"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
