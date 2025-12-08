package spring_react.contractor_backend.service;

import spring_react.contractor_backend.dto.ContractorDto;

import java.util.List;

public interface ContractorService {
    ContractorDto createContractor(ContractorDto contractorDto);
    ContractorDto getContractorById(Long contractorId);
    List<ContractorDto> getAllContractors();
    ContractorDto updateContractor(Long contractorId, ContractorDto updatedContractor);
    ContractorDto disableContractor(Long contractorId);
}
