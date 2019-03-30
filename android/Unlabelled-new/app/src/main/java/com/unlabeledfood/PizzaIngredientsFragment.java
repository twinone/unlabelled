package com.unlabeledfood;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


/**
 * A simple {@link Fragment} subclass.
 */
public class PizzaIngredientsFragment extends Fragment {


    public PizzaIngredientsFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_pizza_ingredients, container, false);


        // ImageButton onclick listeners


        return v;
    }

    private void openConfirmFragment() {
        getActivity()
                .getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.content, new ConfirmationFragment())
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                .addToBackStack(null)
                .commit();
    }


}
