package spring_react.contractor_backend.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import spring_react.contractor_backend.dto.ContractorDto;
import spring_react.contractor_backend.dto.ContractorRatingDto;
import spring_react.contractor_backend.dto.SummaryStatsDto;
import spring_react.contractor_backend.entity.Contractor;
import spring_react.contractor_backend.exception.ResourceNotFoundException;
import spring_react.contractor_backend.mapper.ContractorMapper;
import spring_react.contractor_backend.repository.ContractorRepository;
import spring_react.contractor_backend.service.ContractorService;

import java.math.BigDecimal;
import java.util.Comparator;
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

    @Override
    public List<SummaryStatsDto> getSummaryStats() {
        List<Contractor> contractors = contractorRepository.findAll();

        int totalContractors = contractors.size();
        int totalProjects = contractors.stream()
                .mapToInt(Contractor::getProjectCount)
                .sum();

        double avgProjects = totalContractors > 0 ? (double) totalProjects / totalContractors : 0;
        String topRatedContractor = contractors.stream()
                .filter(c -> c.getStatus() != Contractor.ContractorStatus.disabled)
                .max(Comparator.comparing(c -> c.getRating(), Comparator.naturalOrder()))
                .map(Contractor::getName)
                .orElse("N/A");

        return List.of(
                new SummaryStatsDto(String.valueOf(totalContractors), "Total Contractors"),
                new SummaryStatsDto(String.valueOf(totalProjects), "Total Projects"),
                new SummaryStatsDto(String.format("%.1f", avgProjects), "Average Projects / Contractors"),
                new SummaryStatsDto(topRatedContractor, "Top Rated Contractor")
        );
    }

    @Override
    public List<ContractorRatingDto> getTopRatedContractors() {
        List<Contractor> contractors = contractorRepository.findAll();

        // Filter out disabled contractors and sort by rating (descending)
        List<Contractor> activeContractors = contractors.stream()
                .filter(c -> c.getStatus() != Contractor.ContractorStatus.disabled)
                .sorted((c1, c2) -> c2.getRating().compareTo(c1.getRating()))
                .toList();

        List<ContractorRatingDto> result = new java.util.ArrayList<>();

        // Get top 4 contractors
        int topCount = Math.min(4, activeContractors.size());
        for (int i = 0; i < topCount; i++) {
            Contractor contractor = activeContractors.get(i);
            result.add(new ContractorRatingDto(
                    contractor.getName(),
                    contractor.getRating().doubleValue()
            ));
        }

        // Calculate average rating for remaining contractors (if any)
        if (activeContractors.size() > 4) {
            BigDecimal sum = activeContractors.stream()
                    .skip(4)
                    .map(Contractor::getRating)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            int remainingCount = activeContractors.size() - 4;
            BigDecimal average = sum.divide(
                    BigDecimal.valueOf(remainingCount),
                    1,
                    java.math.RoundingMode.HALF_UP
            );

            result.add(new ContractorRatingDto(
                    "Other Contractors",
                    average.doubleValue()
            ));
        }

        return result;
    }
}
