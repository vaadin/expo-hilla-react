package com.example.application.data.service.dashboard;

import java.util.List;
import dev.hilla.Nonnull;

public class OrderInfo {

    @Nonnull
    private String city;
    @Nonnull
    private List<@Nonnull Integer> values;

    public OrderInfo(String city, List<Integer> values) {
        this.city = city;
        this.values = values;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Nonnull
    public List<@Nonnull Integer> getValues() {
        return values;
    }

    public void setValues(List<Integer> values) {
        this.values = values;
    }
}
