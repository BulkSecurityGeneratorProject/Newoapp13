package io.github.jhipster.newoapp13.repository.search;

import io.github.jhipster.newoapp13.domain.Reservas;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Reservas} entity.
 */
public interface ReservasSearchRepository extends ElasticsearchRepository<Reservas, Long> {
}