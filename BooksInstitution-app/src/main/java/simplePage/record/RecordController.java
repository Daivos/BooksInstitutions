package simplePage.record;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
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

	// create new item
	@RequestMapping(value = "/newRecord/{bookId}/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createRecord(@RequestBody final Record record, @PathVariable(value = "bookId") Long bookId) {
		recordService.addNewRecord(record, bookId);
	}

	public RecordService getRecordService() {
		return recordService;
	}

	public void setRecordService(RecordService recordService) {
		this.recordService = recordService;
	}

}
