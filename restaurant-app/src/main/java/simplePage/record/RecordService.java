package simplePage.record;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import simplePage.client.Client;
import simplePage.client.JpaClientRepository;
import simplePage.dish.Dish;
import simplePage.dish.JpaDishRepository;

@Transactional
@Service
public class RecordService {

	@Autowired
	private JpaRecordRepository recordRepository;
	@Autowired
	private JpaDishRepository dishRepository;
	@Autowired
	JpaClientRepository clientRepository;

	// new
	public void addNewRecord(Record record, Long dishId, Long id) {
		record.setRecordDate(record.getRecordDate());
		Dish dish = dishRepository.findOne(dishId);
		record.setDish(dish);
		Client client = clientRepository.findOne(id);
		record.setClient(client);
		recordRepository.save(record);
	}

	// get all
	public List<Record> getRecordsList() {
		return recordRepository.findAll();
	}

	// get one
	public Record getOneRecordById(Long recordId) {
		return recordRepository.findOne(recordId);
	}

	public JpaRecordRepository getRecordRepository() {
		return recordRepository;
	}

	public void setRecordRepository(JpaRecordRepository recordRepository) {
		this.recordRepository = recordRepository;
	}

	public JpaDishRepository getDishRepository() {
		return dishRepository;
	}

	public void setDishRepository(JpaDishRepository dishRepository) {
		this.dishRepository = dishRepository;
	}

	public void deleteRecordFromDb(Long recordId) {
		Record recordDb = recordRepository.findOne(recordId);
		recordRepository.delete(recordDb);

	}

}
