package simplePage.book;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class BookService {

	@Autowired
	private JpaBookRepository bookRepository;

	public List<Book> getBooksList() {
		return bookRepository.findAll();
	}

	public void saveBook(Book book) {
		bookRepository.save(book);
	}

	public Book getOneBookById(Long bookId) {
		return bookRepository.findOne(bookId);
	}

	public void updateBook(Long bookId, Book book) {
		Book bookFromDb = bookRepository.findOne(bookId);
		if (book.getBookName() != null) {
			bookFromDb.setBookName(book.getBookName());
		}
		if (book.getAuthor() != null) {
			bookFromDb.setAuthor(book.getAuthor());
		}
		if (book.getImage() != null) {
			bookFromDb.setImage(book.getImage());
		}
		if (book.getPageNumber() != null) {
			bookFromDb.setPageNumber(book.getPageNumber());
		}
		if (book.getPrice() != null) {
			bookFromDb.setPrice(book.getPrice());
		}
		if (book.getQuantity() != null) {
			bookFromDb.setQuantity(book.getQuantity());
		}
		if (book.getStatus() != null) {
			bookFromDb.setStatus(book.getStatus());
		}
		bookRepository.save(bookFromDb);

	}

	public void deleteBookFromDb(Long bookId) {
		Book bookDb = bookRepository.findOne(bookId);
		bookRepository.delete(bookDb);

	}

	public JpaBookRepository getBookRepository() {
		return bookRepository;
	}

	public void setBookRepository(JpaBookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

}
