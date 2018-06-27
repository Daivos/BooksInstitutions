package simplePage.client;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;

/**
 * @author ggrazevicius
 */
@Entity
@Table(name = "CLIENT")
@EqualsAndHashCode(exclude = { "records" })
@PrimaryKeyJoinColumn(name = "clientId")

// @NamedQueries({
// @NamedQuery(name = "findAllClients", query = "select client from Client
// client")
// })
public class Client implements Serializable {
	private static final long serialVersionUID = 416974951348630192L;
	@Id
	@GeneratedValue
	private Long id;

	private String firstName;

	private String lastName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

}
