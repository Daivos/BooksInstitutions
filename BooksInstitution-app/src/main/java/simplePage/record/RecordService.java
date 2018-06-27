package simplePage.record;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import simplePage.book.Book;
import simplePage.book.JpaBookRepository;

@Transactional
@Service
public class RecordService {

	@Autowired
	private JpaRecordRepository recordRepository;
	@Autowired
	private JpaBookRepository bookRepository;

	public void addNewRecord(Record record, Long bookId) {
		record.setRecordName(record.getRecordName());
		Book book = bookRepository.findOne(bookId);
		record.setBook(book);
		recordRepository.save(record);
	}

	public JpaRecordRepository getRecordRepository() {
		return recordRepository;
	}

	public void setRecordRepository(JpaRecordRepository recordRepository) {
		this.recordRepository = recordRepository;
	}

	public JpaBookRepository getBookRepository() {
		return bookRepository;
	}

	public void setBookRepository(JpaBookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

}
