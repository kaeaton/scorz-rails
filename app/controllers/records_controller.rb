class RecordsController < ApplicationController

  def index
    @drug_options = [['Meth', 'METH-AMPHETAMINE'], ['Heroin', 'HEROIN'], ['Crack', 'CRACK'], ['Cocaine', 'COCAINE'], ['Marijuana', 'MARIJUANA'], ['Opium', 'OPIATES'], ['Hallucinogens', 'HALLUCINOGENIC'], ['Prostitutes', 'LOITERING'], ['Pimps', 'PIMPING'], ['Brothels', 'HOUSE']]
    @pros_options = [['Prostitutes', 'LOITERING'], ['Pimps', 'PIMPING'],  ['Indecent Exposure', 'INDECENT'], ['Lewd Behavior', 'LEWD']]
  end

  def new
    @records = Record.all
  end

  def create
    incoming_data = RecordsHelper.get_records 

    # whitelisting records for the db. This will halve the db size.
    all_records = []
    incoming_data.each do |record|
      RecordsHelper.screen_records_for_input(record, all_records)
    end

    # giving descriptions for tagging in JS
    described_records = []
    all_records.each do |record|
      RecordsHelper.description(record, described_records)
    end

    # work around to allow locally generated, non-url 
    # params to be used to create records
    ActionController::Parameters.permit_all_parameters = true
    described_records.each do |record|
      Record.create(RecordsHelper.create_params(record))
    end

    redirect_to '/records/new'
  end

  def show
    @incoming_drug_request = params[:drug].to_s
    @dealer_request = params[:dealers].to_s
    @returned_records = Record.where(description: @incoming_drug_request)
    

    # pry
    respond_to do |format|
      format.html
      format.json {render json: @returned_records }  #=> format
      # pry
    end
  end

  # private
  #   def incoming_data
  #     params.require(:drug).permit(:drug).fetch(:drug)
  #  end
end
