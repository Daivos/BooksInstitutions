package simplePage.client;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author daiva
 */

public interface JpaClientRepository extends JpaRepository<Client, Long> {

}

// @PersistenceContext
// private EntityManager entityManager;
//
// @Transactional(readOnly = true)
// public Client get(Long id) {
// return entityManager.find(Client.class, id);
// }
//
// @Transactional
// public Client save(Client client) {
// return entityManager.merge(client);
// }
//
// @Transactional
// public void delete(Long id) {
// entityManager.remove(entityManager.find(Client.class, id));
// }
//
// @Transactional(readOnly = true)
// public List<Client> findAll() {
// return entityManager.createNamedQuery("findAllClients").getResultList();
// }
