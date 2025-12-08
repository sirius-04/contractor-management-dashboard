package spring_react.contractor_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring_react.contractor_backend.entity.Contractor;

public interface ContractorRepository extends JpaRepository<Contractor, Long> {

}
