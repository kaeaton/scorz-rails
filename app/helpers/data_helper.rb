module DataHelper

  def self.hookers_n_blow
    everyone = []
    everyone << Record.where(description: 'COCAINE').where(sale: true)
    everyone << Record.where(description: 'LOITERING')
    everyone << Record.where(description: 'PIMPING')
    return everyone.flatten
  end
end
