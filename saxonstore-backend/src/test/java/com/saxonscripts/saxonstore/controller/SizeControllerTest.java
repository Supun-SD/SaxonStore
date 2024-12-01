package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.*;

import com.saxonscripts.saxonstore.service.SizeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SizeControllerTest {

    @Mock
    private SizeService sizeService;

    @InjectMocks
    private SizeController sizeController;

    @Test
    void testGetSizes() {
        // Arrange: Create mock data for sizes
        SizeDTO size1 = new SizeDTO(1, "Small");
        SizeDTO size2 = new SizeDTO(2, "Medium");
        List<SizeDTO> sizes = Arrays.asList(size1, size2);

        // Mock the service method
        when(sizeService.getAllSizes()).thenReturn(sizes);

        // Act: Call the controller method
        ResponseWrapper<List<SizeDTO>> response = sizeController.getSizes();

        // Assert: Verify the response
        assertEquals(200, response.getHttpCode());
        assertEquals("SUCCESS", response.getStatus());
        assertEquals("All colors", response.getMessage()); // You may want to update this message to "All sizes"
        assertEquals(sizes, response.getData());
        verify(sizeService, times(1)).getAllSizes(); // Ensure the service method is called once
    }
}
