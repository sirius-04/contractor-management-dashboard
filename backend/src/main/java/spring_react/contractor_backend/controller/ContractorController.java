package spring_react.contractor_backend.controller;

import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spring_react.contractor_backend.dto.ContractorDto;
import spring_react.contractor_backend.dto.ContractorRatingDto;
import spring_react.contractor_backend.dto.SummaryStatsDto;
import spring_react.contractor_backend.entity.Contractor;
import spring_react.contractor_backend.service.ContractorService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/contractors")
public class ContractorController {
    private ContractorService contractorService;

    //REST APIs

    // Add Contractor
    @PostMapping
    public ResponseEntity<ContractorDto> createContractor(@RequestBody ContractorDto contractorDto) {
        ContractorDto savedContractor = contractorService.createContractor(contractorDto);

        return new ResponseEntity<>(savedContractor, HttpStatus.CREATED);
    }

    // Find Contractor
    @GetMapping("{id}")
    public ResponseEntity<ContractorDto> getContractorById(@PathVariable("id") Long contractorId) {
        ContractorDto foundContractor = contractorService.getContractorById(contractorId);

        return ResponseEntity.ok(foundContractor);
    }

    // Find ALl Contractor
    @GetMapping
    public ResponseEntity<List<ContractorDto>> getAllContractors() {
        List<ContractorDto> contractors = contractorService.getAllContractors();

        return ResponseEntity.ok(contractors);
    }

    // Update Contractor
    @PutMapping("{id}")
    public ResponseEntity<ContractorDto> updateContractor(@PathVariable("id") Long id, @RequestBody ContractorDto _updatedContractor) {
        ContractorDto updatedContractor = contractorService.updateContractor(id, _updatedContractor);

        return ResponseEntity.ok(updatedContractor);
    }

    // Disable Contractor
    @PutMapping("{id}/disable")
    public ResponseEntity<ContractorDto> disableContractor(@PathVariable("id") Long id) {
        ContractorDto disabledContractor = contractorService.disableContractor(id);

        return ResponseEntity.ok(disabledContractor);
    }

    // Delete Contractor
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteContractor(@PathVariable("id") Long id) {
        contractorService.deleteContractor(id);

        return ResponseEntity.ok("Contractor deleted successfully");
    }

    // Get Summary
    @GetMapping("/summary")
    public ResponseEntity<List<SummaryStatsDto>> getSummaryStats() {
        List<SummaryStatsDto> stats = contractorService.getSummaryStats();

        return ResponseEntity.ok(stats);
    }

    // Get Top Rated Contractors
    @GetMapping("/top-rated")
    public ResponseEntity<List<ContractorRatingDto>> getTopRatedContractors() {
        List<ContractorRatingDto> topRated = contractorService.getTopRatedContractors();

        return ResponseEntity.ok(topRated);
    }
}
