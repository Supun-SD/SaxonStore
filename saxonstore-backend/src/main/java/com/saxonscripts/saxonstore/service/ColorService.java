package com.saxonscripts.saxonstore.service;

import com.saxonscripts.saxonstore.dto.ColorDTO;
import com.saxonscripts.saxonstore.model.Color;
import com.saxonscripts.saxonstore.repo.ColorRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ColorService {
    @Autowired
    private ColorRepo colorRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<ColorDTO> getAllColors(){
        List<Color> colorsList = colorRepo.findAll();
        return modelMapper.map(colorsList, new TypeToken<List<ColorDTO>>(){}.getType());
    }
}
