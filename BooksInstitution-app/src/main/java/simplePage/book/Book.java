package simplePage.book;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
import simplePage.record.Record;

@Entity
@Table(name = "BOOK")
@EqualsAndHashCode(exclude = { "records" })
@PrimaryKeyJoinColumn(name = "bookId")
@Data
public class Book implements Serializable {
	private static final long serialVersionUID = 416974951348630192L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true)
	private Long bookId;
	private String bookName;
	private String author;
	private Integer pageNumber;
	private String image;
	private Double price;
	private String status;
	private Long quantity;

	@JsonIgnore
	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
	private List<Record> records = new ArrayList<>();

}
