require 'httparty'
require 'csv'
require 'smarter_csv'

module RecordsHelper

  # Crimespotting API, stopped updating 2015
  # def self.get_records
  #   HTTParty.get ("http://sanfrancisco.crimespotting.org/crime-data?format=json&count=1000&type=Pr,Na&dstart=2013-01-01")
  # end

  # CSV files downloaded from SF OpenData 2015-2016
  def self.import_records(uploaded_file)
    @csv_two = SmarterCSV.process(uploaded_file)
    # @csv_one = uploaded_file
    # @csv_text = IO.readlines(@csv_one.to_s)
    # @csv_two = CSV.parse(@csv_text, :headers => true)
    # # return @csv_two
  end

  @@hits = [/HALLUCINOGENIC/, /METH-AMPHETAMINE/, /MARIJUANA/, /PROSTITUTION/, /OPIATES/, /COCAINE/, /HEROIN/]
  @@prostitution = [/PIMPING/, /PANDERING/, /INDECENT EXPOSURE/, /LEWD CONDUCT/, /HOUSE/, /LOITERING/, /SOLICITS/]

  def self.screen_records_for_input(record, array)
    @@hits.each do |hit|
      if record['properties']['description'] =~ hit
        array << record
      end 
    end
    return array
  end

  def self.description(record, array)
    # tag sales
    record['properties']['description'] =~ /SALE/ ? record[:sale] = true : record[:sale] = false

    # separate between cocaine and crack
    if record['properties']['description'] =~ /COCAINE/
      if record['properties']['description'] =~ /ROCK/
        record[:description] = 'CRACK'
      else
        record[:description] = 'COCAINE'
      end

    #find the marijuana growers
    elsif record['properties']['description'] =~ /MARIJUANA/
      if record['properties']['description'] =~ /CULTIVATING/
        record[:description] = 'GROWER'
      else
        record[:description] = 'MARIJUANA'
      end

    # break out prostitution charges
    elsif record['properties']['crime_type'] =~ /PROSTITUTION/
      @@prostitution.each do |prostitution|
        if record['properties']['description'] =~ prostitution
          record[:description] = prostitution.match(prostitution.to_s)[0]
        end
      end

    # label all other charges.
    else    
      @@hits.each do |hit|
        if record['properties']['description'] =~ hit
          # record[:description] = 'test'
          record[:description] = hit.match(hit.to_s)[0]
          # record[:description].gsub(/''/, 'MARIJUANA')
        end
      end
    end
    array << record
    return array
  end

  def self.create_params(record)
    new_record = ActionController::Parameters.new(popo_id: record['id'],
                                              record_type: record['properties']['crime_type'],
                                              description: record[:description],
                                              full_description: record['properties']['description'],
                                              sale: record[:sale],
                                              lat: record['geometry']['coordinates'][1],
                                              long: record['geometry']['coordinates'][0],
                                              datetime: record['properties']['date_time']
                                              )
    return new_record
  end
end
