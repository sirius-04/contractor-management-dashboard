package spring_react.contractor_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import spring_react.contractor_backend.entity.Contractor;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractorDto {
    private Long id;
    private String name;
    private String email;
    private int projectCount;
    private BigDecimal rating;
    private Contractor.ContractorStatus status;

}
