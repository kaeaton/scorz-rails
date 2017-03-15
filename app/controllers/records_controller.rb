class RecordsController < ApplicationController

  def index
  end

  def new
    @records = Record.all #.find(1)
    @test = "test"
    @incoming_data = RecordsHelper.get_records 


  end

  def create
    # @incoming_data = RecordsHelper.get_records 
    # @test = "test"

    # # whitelisting records for the db. This will halve the db size.
    # @all_records = []
    # @incoming_data.each do |record|
    #   RecordsHelper.screen_records_for_input(record, @all_records)
    # end

    # # giving descriptions for tagging in JS
    # @described_records = []
    # @all_records.each do |record|
    #   RecordsHelper.description(record, @described_records)
    # end

    # # work around to allow locally generated, non-url 
    # # params to be used to create records
    # ActionController::Parameters.permit_all_parameters = true
    # @described_records.each do |record|
    #   Record.create(RecordsHelper.create_params(record))
    # end

    redirect_to '/records/new'
  end

  def show
  end

  # private
  #     def incoming_data
  #     params.require(:file).permit(:file).fetch(:file)
  #  end
end
