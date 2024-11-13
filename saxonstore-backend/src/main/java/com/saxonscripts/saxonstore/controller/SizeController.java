package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.ResponseWrapper;
import com.saxonscripts.saxonstore.dto.SizeDTO;
import com.saxonscripts.saxonstore.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("sizes")
public class SizeController {
    @Autowired
    private SizeService sizeService;

    @GetMapping
    public ResponseWrapper<List<SizeDTO>> getSizes(){
        List<SizeDTO> allSizes = sizeService.getAllSizes();
        return new ResponseWrapper<>(200, "SUCCESS", "All colors", allSizes);
    }
}
