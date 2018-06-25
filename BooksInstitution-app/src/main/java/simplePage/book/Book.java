package simplePage.book;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;



import lombok.Data;

@Entity
@Table (name ="BOOK")
@Data
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long bookId;
	@Column(unique = true)
	private String bookName;
	private String author;
	private Integer pageNumber;
	private String image;
	private Double price;
	private String status;
	private Long quantity;

//	public Book() {
//		super();
//	}
	
}
