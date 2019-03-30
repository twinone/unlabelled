package com.unlabeledfood;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class UserFragment extends Fragment {


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_user, container, false);
        v.findViewById(R.id.pizza).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onPizzaClick();
            }
        });

        return v;

    }

    private void onPizzaClick() {
        getActivity()
                .getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.content, new PizzaIngredientsFragment())
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                .addToBackStack(null)
                .commit();

    }
}
