package simplePage.client;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ClientService {

	@Autowired
	private JpaClientRepository clientRepository;

	public JpaClientRepository getClientRepository() {
		return clientRepository;
	}

	public void setClientRepository(JpaClientRepository clientRepository) {
		this.clientRepository = clientRepository;
	}

	public List<Client> getClientList() {
		return clientRepository.findAll();
	}

	public void deleteClientById(Long id) {
		Client clientDb = clientRepository.findOne(id);
		clientRepository.delete(clientDb);
	}

	public void saveClient(Client client) {
		clientRepository.save(client);
	}

	public Client getOneClientById(Long clientId) {
		return clientRepository.findOne(clientId);
	}

}
