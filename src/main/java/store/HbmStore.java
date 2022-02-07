package store;

import model.Item;
import model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.query.Query;

import java.util.List;
import java.util.function.Function;

public class HbmStore implements Store {

    final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
            .configure().build();

    private SessionFactory sf = new MetadataSources(registry).buildMetadata().buildSessionFactory();


    private static final class Lazy {
        private static final Store INST = new HbmStore();
    }

    public static Store instOf() {
        return Lazy.INST;
    }

    private <T> T tx(final Function<Session, T> command) {
        final Session session = sf.openSession();
        final Transaction tx = session.beginTransaction();
        try {
            T rsl = command.apply(session);
            tx.commit();
            return rsl;
        } catch (final Exception e) {
            session.getTransaction().rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    @Override
    public Item add(Item item) {
        return this.tx(
                session -> {
                    session.save(item);
                    return item;
                }
        );
    }

    @Override
    public Item replace(int id) {
        return this.tx(
               session -> {
                   session.createQuery("update model.Item set done = false where id = :id")
                           .setParameter("id", id)
                           .executeUpdate();
                   return  session.get(Item.class, id);
               }
        );
    }

    @Override
    public boolean delete(int id) {
        return this.tx(
                session -> {
                    Item item = new Item();
                    item.setId(id);
                    session.delete(item);
                    if (findById(id) == null) {
                        return false;
                    } else {
                        session.delete(item);
                        return true;
                    }
                }
        );
    }

    @Override
    public List<Item> findAll() {
        return this.tx(
             session -> session.createQuery("from model.Item").list()
        );
    }

    @Override
    public List<Item> findByName(String key) {
        return this.tx(
                session -> {
                    Query query =  session.createQuery("from model.Item where description = :descriptionKey");
                    query.setParameter("descriptionKey", key);
                    return query.list();
                }
        );
    }

    @Override
    public Item findById(int id) {
        return this.tx(
                session ->
                     session.get(Item.class, id)
        );
    }

    @Override
    public User findByNameUser(String name) {
          return  this.tx(
                session -> {
                    Query query =  session.createQuery("from model.User where name = : nameUser");
                    query.setParameter("nameUser", name);
                    return (User) query.uniqueResult();
                }
        );
    }

    @Override
    public User addUser(User user) {
        return this.tx(
                session -> {
                    session.save(user);
                    return user;
                }
        );
    }


}
