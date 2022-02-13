package store;

import model.Category;
import model.Item;
import model.User;

import java.util.List;

public interface Store {
    Item add(Item item);
    Item replace(int id);
    boolean delete(int id);
    List<Item> findAll();
    List<Item> findByName(String key);
    Item findById(int id);
    User findByNameUser(String name);
    User addUser(User user);
    List<Category> findAllCategory();
    Item addNewCategory(Item item, String[] ids);
}
