module DataHelper

  def self.hookers_n_blow
    everyone = []
    everyone << Record.where(description: 'COCAINE').where(sale: true)
    everyone << Record.where(description: 'LOITERING')
    everyone << Record.where(description: 'PIMPING')
    return everyone.flatten
  end

  def self.dealers(drug)
    Record.where(description: drug).where(sale: true)
  end

  def self.growers
    Record.where(description: 'GROWER')
  end
end
