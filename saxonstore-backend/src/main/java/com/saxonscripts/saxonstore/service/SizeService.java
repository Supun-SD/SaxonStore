package com.saxonscripts.saxonstore.service;

import com.saxonscripts.saxonstore.dto.SizeDTO;
import com.saxonscripts.saxonstore.model.Size;
import com.saxonscripts.saxonstore.repo.SizeRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SizeService {
    @Autowired
    private SizeRepo sizeRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<SizeDTO> getAllSizes(){
        List<Size> sizesList = sizeRepo.findAll();
        return modelMapper.map(sizesList, new TypeToken<List<SizeDTO>>(){}.getType());
    }
}
