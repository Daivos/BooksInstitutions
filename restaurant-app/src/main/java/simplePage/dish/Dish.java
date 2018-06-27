package simplePage.dish;

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

import lombok.EqualsAndHashCode;
import simplePage.record.Record;

@Entity
@Table(name = "dish")
@EqualsAndHashCode(exclude = { "records" })
@PrimaryKeyJoinColumn(name = "dishId")

public class Dish implements Serializable {
	private static final long serialVersionUID = 416974951348630192L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true)
	private Long dishId;
	private String dishName;
	private boolean isNuts;
	private boolean isMilk;

	@JsonIgnore
	@OneToMany(mappedBy = "dish", cascade = CascadeType.ALL)
	private List<Record> records = new ArrayList<>();

	public Long getDishId() {
		return dishId;
	}

	public void setDishId(Long dishId) {
		this.dishId = dishId;
	}

	public String getDishName() {
		return dishName;
	}

	public void setDishName(String dishName) {
		this.dishName = dishName;
	}

	public List<Record> getRecords() {
		return records;
	}

	public void setRecords(List<Record> records) {
		this.records = records;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public boolean isNuts() {
		return isNuts;
	}

	public void setNuts(boolean isNuts) {
		this.isNuts = isNuts;
	}

	public boolean isMilk() {
		return isMilk;
	}

	public void setMilk(boolean isMilk) {
		this.isMilk = isMilk;
	}

}
