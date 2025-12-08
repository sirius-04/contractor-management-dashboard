package spring_react.contractor_backend.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import spring_react.contractor_backend.dto.ContractorDto;
import spring_react.contractor_backend.entity.Contractor;
import spring_react.contractor_backend.exception.ResourceNotFoundException;
import spring_react.contractor_backend.mapper.ContractorMapper;
import spring_react.contractor_backend.repository.ContractorRepository;
import spring_react.contractor_backend.service.ContractorService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ContractorServiceImpl implements ContractorService {
    private ContractorRepository contractorRepository;

    @Override
    public ContractorDto createContractor(ContractorDto contractorDto) {
        Contractor contractor = ContractorMapper.mapToContractor(contractorDto);
        Contractor savedContractor  = contractorRepository.save(contractor);

        return ContractorMapper.mapToContractorDto(savedContractor);
    }

    @Override
    public ContractorDto getContractorById(Long contractorId) {
        Contractor foundContractor = contractorRepository.findById(contractorId)
                .orElseThrow(() -> new ResourceNotFoundException("Contractor not exist with given id: " + contractorId));

        return ContractorMapper.mapToContractorDto(foundContractor);
    }

    @Override
    public List<ContractorDto> getAllContractors() {
        List<Contractor> contractors = contractorRepository.findAll();

        return contractors.stream().map(contractor -> ContractorMapper.mapToContractorDto(contractor))
                .collect(Collectors.toList());
    }

    @Override
    public ContractorDto updateContractor(Long contractorId, ContractorDto _updatedContractor) {
        Contractor foundContractor = contractorRepository.findById(contractorId)
                .orElseThrow(() -> new ResourceNotFoundException("Contractor not exist with given id: " + contractorId));

        foundContractor.setName(_updatedContractor.getName());
        foundContractor.setEmail(_updatedContractor.getEmail());
        foundContractor.setProjectCount(_updatedContractor.getProjectCount());
        foundContractor.setRating(_updatedContractor.getRating());
        foundContractor.setStatus(_updatedContractor.getStatus());

        Contractor updatedContractor = contractorRepository.save(foundContractor);

        return ContractorMapper.mapToContractorDto(updatedContractor);
    }

    @Override
    public ContractorDto disableContractor(Long contractorId) {
        Contractor foundContractor = contractorRepository.findById(contractorId)
                .orElseThrow(() -> new ResourceNotFoundException("Contractor not exist with given id: " + contractorId));

        foundContractor.setStatus(Contractor.ContractorStatus.disabled);

        Contractor disabledContractor = contractorRepository.save(foundContractor);

        return ContractorMapper.mapToContractorDto(disabledContractor);
    }

    @Override
    public void deleteContractor(Long contractorId) {
        Contractor foundContractor = contractorRepository.findById(contractorId)
                .orElseThrow(() -> new ResourceNotFoundException("Contractor not exist with given id: " + contractorId));

        contractorRepository.deleteById(contractorId);
    }
}
