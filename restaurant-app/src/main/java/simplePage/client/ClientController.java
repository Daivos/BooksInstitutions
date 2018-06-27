package simplePage.client;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class ClientController {

	@Autowired
	private ClientService clientService;

	@GetMapping("/clients")
	// @ApiOperation(value = "Returns all flights that are currently in the list")
	public List<Client> getClients() {
		return clientService.getClientList();
	}

	@DeleteMapping("/deleteClient/{id}")
	public void deleteClient(@PathVariable("id") Long id) {
		clientService.deleteClientById(id);
	}

	@PostMapping("/newClient")
	@ResponseStatus(HttpStatus.CREATED)
	public void registerClient(@RequestBody Client client) {
		clientService.saveClient(client);
	}

	@GetMapping("/singleClient/{clientId}")
	private Client getClientById(@PathVariable Long clientId) {
		return clientService.getOneClientById(clientId);
	}

	public ClientService getClientService() {
		return clientService;
	}

	public void setClientService(ClientService clientService) {
		this.clientService = clientService;
	}

}
