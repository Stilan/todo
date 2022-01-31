package store;

import model.Item;

import java.util.List;

public interface Store {
    Item add(Item item);
    boolean replace(int id);
    boolean delete(int id);
    List<Item> findAll();
    List<Item> findByName(String key);
    Item findById(int id);
}
