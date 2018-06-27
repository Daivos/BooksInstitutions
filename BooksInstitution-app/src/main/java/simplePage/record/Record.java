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

import lombok.EqualsAndHashCode;
import simplePage.client.Client;
import simplePage.dish.Dish;

@Entity
@Table(name = "RECORD")
@EqualsAndHashCode(exclude = { "dish" })
@PrimaryKeyJoinColumn(name = "recordId")

public class Record implements Serializable {
	private static final long serialVersionUID = 416974951348630192L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long recordId;
	private String recordName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference(value = "dishId")
	@JoinColumn(name = "dishId")
	private Dish dish;

	// new
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference(value = "id")
	@JoinColumn(name = "id")
	private Client client;

	public Long getRecordId() {
		return recordId;
	}

	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	public String getRecordName() {
		return recordName;
	}

	public void setRecordName(String recordName) {
		this.recordName = recordName;
	}

	public Dish getDish() {
		return dish;
	}

	public void setDish(Dish dish) {
		this.dish = dish;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

}
