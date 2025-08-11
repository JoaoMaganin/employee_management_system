package br.com.enterprise.backend.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;


public enum UserStatusType {

    ACTIVE ("A", "Active"),
    INACTIVE ("I", "Inactive"),
    PENDING ("P", "Pending");

    private String code;
    private String description;

    private UserStatusType(String code, String description) {
        this.code = code;
        this.description = description;
    }

    @JsonValue
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @JsonCreator
    public static UserStatusType ofValue(String code) {
        return switch (code) {
            case "A" -> ACTIVE;
            case "I" -> INACTIVE;
            case "P" -> PENDING;
            default -> null;
        };
    }
}
