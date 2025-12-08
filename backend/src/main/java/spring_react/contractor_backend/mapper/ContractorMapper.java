package spring_react.contractor_backend.mapper;

import spring_react.contractor_backend.dto.ContractorDto;
import spring_react.contractor_backend.entity.Contractor;

public class ContractorMapper {
    public static ContractorDto mapToContractorDto(Contractor contractor) {
        return new ContractorDto(
                contractor.getId(),
                contractor.getName(),
                contractor.getEmail(),
                contractor.getProjectCount(),
                contractor.getRating(),
                contractor.getStatus()
        );
    }

    public static Contractor mapToContractor(ContractorDto contractorDto) {
        return new Contractor(
                contractorDto.getId(),
                contractorDto.getName(),
                contractorDto.getEmail(),
                contractorDto.getProjectCount(),
                contractorDto.getRating(),
                contractorDto.getStatus()
        );
    }
}
