package simplePage.dish;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class DishService {

	@Autowired
	private JpaDishRepository dishRepository;

	public List<Dish> getDishsList() {
		return dishRepository.findAll();
	}

	public void saveDish(Dish dish) {
		dishRepository.save(dish);
	}

	public Dish getOneDishById(Long dishId) {
		return dishRepository.findOne(dishId);
	}

	public void updateDish(Long dishId, Dish dish) {
		Dish dishFromDb = dishRepository.findOne(dishId);
		if (dish.getDishName() != null) {
			dishFromDb.setDishName(dish.getDishName());
		}
		dishFromDb.setMilk(dish.isMilk());
		dishFromDb.setNuts(dish.isNuts());
		dishRepository.save(dishFromDb);
	}

	public void deleteDishFromDb(Long dishId) {
		Dish dishDb = dishRepository.findOne(dishId);
		dishRepository.delete(dishDb);

	}

	public JpaDishRepository getDishRepository() {
		return dishRepository;
	}

	public void setDishRepository(JpaDishRepository dishRepository) {
		this.dishRepository = dishRepository;
	}

}
