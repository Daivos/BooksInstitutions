package simplePage.record;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import lombok.EqualsAndHashCode;
import simplePage.book.Book;

@Entity
@Table(name = "RECORD")
@EqualsAndHashCode(exclude = { "book" })
@PrimaryKeyJoinColumn(name = "recordId")
@Data
public class Record implements Serializable {
	private static final long serialVersionUID = 416974951348630192L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long recordId;
	private String recordName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference(value = "bookId")
	@JoinColumn(name = "bookId")
	private Book book;

}
