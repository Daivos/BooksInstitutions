package simplePage.client;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import simplePage.record.Record;

/**
 * @author ggrazevicius
 */
@Entity
@Table(name = "CLIENT")
@EqualsAndHashCode(exclude = { "records" })
@PrimaryKeyJoinColumn(name = "id")

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

	private boolean useAlcohol;

	private boolean isNutsAlergy;

	private boolean isMilkAlergy;

	// new
	@JsonIgnore
	@OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
	private List<Record> records = new ArrayList<>();

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

	public boolean isUseAlcohol() {
		return useAlcohol;
	}

	public void setUseAlcohol(boolean useAlcohol) {
		this.useAlcohol = useAlcohol;
	}

	public boolean isNutsAlergy() {
		return isNutsAlergy;
	}

	public void setNutsAlergy(boolean isNutsAlergy) {
		this.isNutsAlergy = isNutsAlergy;
	}

	public boolean isMilkAlergy() {
		return isMilkAlergy;
	}

	public void setMilkAlergy(boolean isMilkAlergy) {
		this.isMilkAlergy = isMilkAlergy;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
