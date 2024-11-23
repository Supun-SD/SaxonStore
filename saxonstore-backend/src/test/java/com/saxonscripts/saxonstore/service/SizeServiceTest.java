package com.saxonscripts.saxonstore.service;

import com.saxonscripts.saxonstore.dto.SizeDTO;
import com.saxonscripts.saxonstore.model.Size;
import com.saxonscripts.saxonstore.repo.SizeRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SizeServiceTest {

    @Mock
    private SizeRepo sizeRepo;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private SizeService sizeService;

    @BeforeEach
    void setUp() {
        // Initialize mocks and the service before each test
    }

    @Test
    void testGetAllSizes() {
        // Arrange: Create mock data for sizes
        Size size1 = new Size(1, "Small");
        Size size2 = new Size(2, "Medium");
        List<Size> sizesList = Arrays.asList(size1, size2);

        SizeDTO sizeDTO1 = new SizeDTO(1, "Small");
        SizeDTO sizeDTO2 = new SizeDTO(2, "Medium");
        List<SizeDTO> sizesDTOList = Arrays.asList(sizeDTO1, sizeDTO2);

        // Mock the repository call
        when(sizeRepo.findAll()).thenReturn(sizesList);

        // Mock ModelMapper's map method
        when(modelMapper.map(sizesList, new TypeToken<List<SizeDTO>>(){}.getType())).thenReturn(sizesDTOList);

        // Act: Call the service method
        List<SizeDTO> result = sizeService.getAllSizes();

        // Assert: Verify the result
        assertEquals(2, result.size());
        assertEquals("Small", result.get(0).getName());
        assertEquals("Medium", result.get(1).getName());
    }
}
