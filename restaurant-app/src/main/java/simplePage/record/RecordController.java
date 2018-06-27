package simplePage.record;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class RecordController {

	@Autowired
	private RecordService recordService;

	public RecordService getService() {
		return recordService;
	}

	public void setService(RecordService recordService) {
		this.recordService = recordService;
	}

	// new
	@RequestMapping(value = "/newRecord/{dishId}/{id}", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createRecord(@RequestBody final Record record, @PathVariable(value = "dishId") Long dishId,
			@PathVariable(value = "id") Long id) {
		recordService.addNewRecord(record, dishId, id);
	}

	// get all
	@GetMapping("/records")
	private List<Record> getAllRecords() {
		return recordService.getRecordsList();
	}

	// get one
	@GetMapping("/singleRecord/{recordId}")
	private Record getRecordById(@PathVariable Long recordId) {
		return recordService.getOneRecordById(recordId);
	}

	@DeleteMapping("/deleteRecord/{recordId}")
	private void deleteRecord(@PathVariable("recordId") Long recordId) {
		recordService.deleteRecordFromDb(recordId);
	}

	public RecordService getRecordService() {
		return recordService;
	}

	public void setRecordService(RecordService recordService) {
		this.recordService = recordService;
	}

}
