package com.saxonscripts.saxonstore.exception;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.saxonscripts.saxonstore.dto.ResponseWrapper;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseWrapper<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseWrapper<>(404, "ERROR", ex.getMessage(), null);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseWrapper<String> handleBadRequestException(BadRequestException ex) {
        return new ResponseWrapper<>(400, "ERROR", ex.getMessage(), null);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseWrapper<String> handleConflictException(ConflictException ex) {
        return new ResponseWrapper<>(409, "ERROR", ex.getMessage(), null);
    }

    // Handle type mismatches (e.g., string instead of integer)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseWrapper<String> handleTypeMismatchException(HttpMessageNotReadableException ex) {
        String errorMessage = "Invalid data format. Please check the request payload.";

        if (ex.getCause() instanceof InvalidFormatException) {
            InvalidFormatException cause = (InvalidFormatException) ex.getCause();
            String fieldName = cause.getPath().stream().map(ref -> ref.getFieldName()).collect(Collectors.joining("."));
            errorMessage = "Invalid format for field '" + fieldName + "'. Expected: " + cause.getTargetType().getSimpleName();
        }

        return new ResponseWrapper<>(400, "TYPE_MISMATCH", errorMessage, null);
    }

    // Handle validation errors (e.g., missing fields or invalid values)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseWrapper<Map<String, String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return new ResponseWrapper<>(400, "VALIDATION_ERROR", "Validation failed for one or more fields", errors);
    }


    //Handle all other unexpected errors
    @ExceptionHandler(Exception.class)
    public ResponseWrapper<String> handleGlobalException(Exception ex) {
        return new ResponseWrapper<>(500, "ERROR", ex.getMessage(), null);
    }
}
