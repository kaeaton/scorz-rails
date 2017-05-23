require 'httparty'
require 'soda/client'

module RecordsHelper

  attr_reader :hits

  # SFGov Data - Currently set for 2017 
  def self.get_records
    client = SODA::Client.new({:domain => "data.sfgov.org", :app_token => "YSf0ezIV7JKqotNR8TEexPqaL", :ignore_ssl => 'true'})
    client.get("cuks-n6tp", {"$where" => "category = 'PROSTITUTION' AND date > '2015-12-31T00:00:00.000' or category = 'DRUG/NARCOTIC' AND date > '2015-12-31T00:00:00.000'"})
  end
  # https://data.sfgov.org/resource/cuks-n6tp.json
  # "$limit" => 5, 

  # Crimespotting API, stopped updating 2015
  # def self.get_records
  #   HTTParty.get ("http://sanfrancisco.crimespotting.org/crime-data?format=json&count=1000&type=Pr,Na&dstart=2013-01-01")
  # end

  @@hits = [/HALLUCINOGENIC/, /METH-AMPHETAMINE/, /MARIJUANA/, /PROSTITUTION/, /OPIATES/, /COCAINE/, /HEROIN/] #/PRESCRIPTION/
  @@prostitution = [/PIMPING/, /PANDERING/, /INDECENT/, /LEWD/, /HOUSE/, /LOITERING/] #/SOLICITS/

  def self.screen_records_for_input(record, array)
    @@hits.each do |hit|
      if record.descript =~ hit || record.category =~ /PROSTITUTION/
        array << record
      end 
    end
    return array
  end

  def self.description(record, array)
    # tag sales
    if record.category =~ /PROSTITUTION/
      record.sale = true
    else
      record.descript =~ /SALE/ ? record.sale = true : record.sale = false
    end

    # separate between cocaine and crack
    if record.descript =~ /COCAINE/
      if record.descript =~ /ROCK/
        record.description = 'CRACK'
      else
        record.description = 'COCAINE'
      end

    #find the marijuana growers
    elsif record.descript =~ /MARIJUANA/
      if record.descript =~ /CULTIVATING/
        record.description = 'GROWER'
      else
        record.description = 'MARIJUANA'
      end

    # break out prostitution charges
    elsif record.category =~ /PROSTITUTION/
      @@prostitution.each do |prostitution|
        if record.descript =~ prostitution
          record.description = prostitution.match(prostitution.to_s)[0]
        end
      end

    # label all other charges.
    else    
      @@hits.each do |hit|
        if record.descript =~ hit
          # record[:description] = 'test'
          record.description = hit.match(hit.to_s)[0]
          # record[:description].gsub(/''/, 'MARIJUANA')
        end
      end
    end
    array << record
    return array
  end

  def self.create_params(record)
    new_record = ActionController::Parameters.new(popo_id: record.incidntnum,
                                              category: record.category,
                                              description: record.description,
                                              full_description: record.descript,
                                              day_of_week: record.dayofweek,
                                              district: record.pddistrict,
                                              sale: record.sale,
                                              lat: record.y,
                                              long: record.x,
                                              datetime: record.date
                                              )
    return new_record
  end
end
