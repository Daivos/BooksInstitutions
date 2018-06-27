package simplePage.dish;

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
 * The Class DishController.
 */
@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class DishControler {

	/** The Dish Service. */
	@Autowired
	private DishService dishService;

	@GetMapping("/dishs")
	private List<Dish> getAllDishs() {
		return dishService.getDishsList();
	}

	@GetMapping("/singleDish/{dishId}")
	private Dish getDishById(@PathVariable Long dishId) {
		return dishService.getOneDishById(dishId);
	}

	@PostMapping("/dish/newDish")
	@ResponseStatus(HttpStatus.CREATED)
	private void addDish(@RequestBody Dish dish) {
		dishService.saveDish(dish);
	}

	@PutMapping("/singleDish/updateDish/{dishId}")
	private void updateDishById(@PathVariable("dishId") Long dishId, @RequestBody Dish dish) {
		dishService.updateDish(dishId, dish);
	}

	@DeleteMapping("/deleteDish/{dishId}")
	private void deleteDish(@PathVariable("dishId") Long dishId) {
		dishService.deleteDishFromDb(dishId);
	}

	public DishService getDishService() {
		return dishService;
	}

	public void setDishService(DishService dishService) {
		this.dishService = dishService;
	}

}
