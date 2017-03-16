# class Record
#   include ActiveModel::AttributeMethods
#   extend ActiveModel::Naming

#   define_attribute_methods 'text'

#   attr_accessor :text

#   def initialize
#     @text = file
#   end

# end

class Record < ApplicationRecord

  validates :popo_id, presence: true, uniqueness: true
  validates :category, presence: true
  validates :description, presence: true
  validates :full_description, presence: true
  validates :day_of_week, presence: true
  validates :district, presence: true
  validates :datetime, presence: true
  validates :lat, presence: true
  validates :long, presence: true
  # validates :sale, presence: true  # blocks entries where boolean is false.
end
