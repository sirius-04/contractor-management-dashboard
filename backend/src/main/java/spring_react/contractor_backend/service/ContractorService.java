package spring_react.contractor_backend.service;

import spring_react.contractor_backend.dto.ContractorDto;
import spring_react.contractor_backend.dto.ContractorRatingDto;
import spring_react.contractor_backend.dto.SummaryStatsDto;

import java.util.List;

public interface ContractorService {
    ContractorDto createContractor(ContractorDto contractorDto);
    ContractorDto getContractorById(Long contractorId);
    List<ContractorDto> getAllContractors();
    ContractorDto updateContractor(Long contractorId, ContractorDto updatedContractor);
    ContractorDto disableContractor(Long contractorId);
    void deleteContractor(Long contractorId);
    List<SummaryStatsDto> getSummaryStats();
    List<ContractorRatingDto> getTopRatedContractors();
}
