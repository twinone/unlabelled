package com.unlabeledfood;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


public class DeliveryFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_delivery, container, false);
        v.findViewById(R.id.pizza).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onPizzaClick();
            }
        });

        return v;

    }

    private void onPizzaClick() {

    }
}