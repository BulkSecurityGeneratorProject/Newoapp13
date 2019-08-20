package io.github.jhipster.newoapp13.repository.search;

import io.github.jhipster.newoapp13.domain.CategoriaContenidos;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link CategoriaContenidos} entity.
 */
public interface CategoriaContenidosSearchRepository extends ElasticsearchRepository<CategoriaContenidos, Long> {
}
