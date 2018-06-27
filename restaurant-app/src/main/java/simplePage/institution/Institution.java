package simplePage.institution;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;

import lombok.Data;

@Entity
@Table (name = "INSTITUTION")
@Data
public class Institution {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column (unique = true, nullable = false)
	private Long institutionId;
	private String institutionName;
	private String city;
	private String typeId;
	private Boolean isPrivate;
	
//	@ManyToMany
//	@JoinTable(name = "institution_book", 
//	joinColumns = @JoinColumn(name = "inst_Id", referencedColumnName = "institutionId"), 
//	inverseJoinColumns = @JoinColumn(name = "book_id", referencedColumnName = "bookId"))
//	private List<Book> books = new ArrayList<>();
	
}
