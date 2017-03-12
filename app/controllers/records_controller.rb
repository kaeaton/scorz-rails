class RecordsController < ApplicationController

  def index
  end

  def new
    # @records = Record.all
  end

  def create
    # begin
    @text = Record.new(incoming_data)
    # @csv.records = params[:file]
      # @record = RecordsHelper.import_records(params.to_s) 
      # @csv_two = @csv_one.to_s.read

    #   flash[:success] = "<strong>Contacts Imported!</strong>"

    #   redirect_to '/records/new'

    # rescue => exception 
    #   flash[:error] = "There was a problem importing that contacts file.<br>
    #     <strong>#{exception.message}</strong><br>"

      # redirect_to import_new_contacts_path
    # end

    # uploaded_io.original_filename), 'wb') do |file|
    # file.write(uploaded_io.read)

    # RecordsHelper.import_records(incoming)
      # @csv_one = params[:record][:file]
      # # @csv_text = @csv_one.read
      # @csv_two = CSV.parse(@csv_one, :headers => true)
    #   return @csv_two
    # end


    # @incoming_data = RecordsHelper.import_records(params[:file])
    
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

  private
      def incoming_data
      params.require(:file).permit(:file).fetch(:file)
   end
end
