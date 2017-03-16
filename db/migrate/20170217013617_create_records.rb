class CreateRecords < ActiveRecord::Migration[5.0]
  def change
    create_table :records do |t|
      t.string :popo_id
      t.string :category
      t.string :description
      t.string :full_description
      t.string :day_of_week
      t.string :district
      t.boolean :sale
      t.decimal :lat
      t.decimal :long
      t.datetime :datetime
      
      t.timestamps
    end
  end
end
