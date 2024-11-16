package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.ColorDTO;
import com.saxonscripts.saxonstore.dto.ResponseWrapper;
import com.saxonscripts.saxonstore.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("color")
public class ColorController {
    @Autowired
    private ColorService colorService;

    @GetMapping
    public ResponseWrapper<List<ColorDTO>> getColors(){
        List<ColorDTO> allColors = colorService.getAllColors();
        return new ResponseWrapper<>(200, "SUCCESS", "All colors", allColors);
    }
}
