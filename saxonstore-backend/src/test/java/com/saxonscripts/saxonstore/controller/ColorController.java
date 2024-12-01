package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.ColorDTO;
import com.saxonscripts.saxonstore.dto.ResponseWrapper;
import com.saxonscripts.saxonstore.service.ColorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class ColorControllerTest {

    @MockBean
    private ColorService colorService;

    @InjectMocks
    private ColorController colorController;

    @BeforeEach
    void setUp() {
        // Initialize the mocks manually (helps if you need to manually initialize some mocks)
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetColors() {
        // Arrange
        ColorDTO color1 = new ColorDTO(1, "Red", "#FF0000");
        ColorDTO color2 = new ColorDTO(2, "Blue", "#0000FF");
        List<ColorDTO> colorList = Arrays.asList(color1, color2);

        // Mock the service method to return the list of colors
        when(colorService.getAllColors()).thenReturn(colorList);

        // Act
        ResponseWrapper<List<ColorDTO>> response = colorController.getColors();

        // Assert
        assertEquals(200, response.getHttpCode()); // Check the HTTP status code
        assertEquals("SUCCESS", response.getStatus()); // Check the status message
        assertEquals("All colors", response.getMessage()); // Check the message
        assertNotNull(response.getData()); // Check that the data is not null
        assertEquals(2, response.getData().size()); // Check that the list contains 2 colors
        assertEquals("Red", response.getData().get(0).getName()); // Verify the first color's name
        assertEquals("#FF0000", response.getData().get(0).getHexValue()); // Verify the first color's hex value
        assertEquals("Blue", response.getData().get(1).getName()); // Verify the second color's name
        assertEquals("#0000FF", response.getData().get(1).getHexValue()); // Verify the second color's hex value
    }
}
