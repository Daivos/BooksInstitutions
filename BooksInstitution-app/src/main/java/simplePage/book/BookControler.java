package simplePage.book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * The Class BookController.
 */
@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class BookControler {

	/** The Book Service. */
	@Autowired
	private BookService bookService;

	@GetMapping("/books")
	private List<Book> getAllBooks() {
		return bookService.getBooksList();
	}

	@GetMapping("/singleBook/{bookId}")
	private Book getBookById(@PathVariable Long bookId) {
		return bookService.getOneBookById(bookId);
	}

	@PostMapping("/book/newBook")
	@ResponseStatus(HttpStatus.CREATED)
	private void addBook(@RequestBody Book book) {
		bookService.saveBook(book);
	}

	@PutMapping("/singleBook/updateBook/{bookId}")
	private void updateBookById(@PathVariable("bookId") Long bookId, @RequestBody Book book) {
		bookService.updateBook(bookId, book);
	}

	@DeleteMapping("/deleteBook/{bookId}")
	private void deleteBook(@PathVariable("bookId") Long bookId) {
		bookService.deleteBookFromDb(bookId);
	}

	public BookService getBookService() {
		return bookService;
	}

	public void setBookService(BookService bookService) {
		this.bookService = bookService;
	}

}
