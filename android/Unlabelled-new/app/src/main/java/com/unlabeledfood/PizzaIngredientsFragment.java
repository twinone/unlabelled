package com.unlabeledfood;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;


/**
 * A simple {@link Fragment} subclass.
 */
public class PizzaIngredientsFragment extends Fragment {
    ImageButton olives;
    boolean selOlives = false;
    ImageButton onion;
    boolean selOnion = false;
    ImageButton tomato;
    boolean selTomato = false;
    ImageButton pep;
    boolean selPep = false;
    ImageButton cheese;
    boolean selCheese = false;






    public PizzaIngredientsFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_pizza_ingredients, container, false);

        olives = v.findViewById(R.id.olives);
        olives.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!selOlives) {
                    olives.setBackgroundResource(R.drawable.olivescolour);

                } else {
                    olives.setBackgroundResource(R.drawable.olivesbw);
                }
                selOlives = !selOlives;
            }
        });

        onion = v.findViewById(R.id.onion);
        onion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!selOnion) {
                    onion.setBackgroundResource(R.drawable.onioncolour);

                } else {
                    onion.setBackgroundResource(R.drawable.onionbw);
                }
                selOnion = !selOnion;
            }
        });

        tomato = v.findViewById(R.id.tomato);
        tomato.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!selTomato) {
                    tomato.setBackgroundResource(R.drawable.tomatocolour);

                } else {
                    tomato.setBackgroundResource(R.drawable.tomatobw);
                }
                selTomato = !selTomato;
            }
        });

        pep = v.findViewById(R.id.pep);
        pep.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!selPep) {
                    pep.setBackgroundResource(R.drawable.pepperonicolour);

                } else {
                    pep.setBackgroundResource(R.drawable.pepperonibw);
                }
                selPep = !selPep;
            }
        });


        cheese = v.findViewById(R.id.cheese);
        cheese.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!selCheese) {
                    cheese.setBackgroundResource(R.drawable.cheesecolour);

                } else {
                    cheese.setBackgroundResource(R.drawable.cheesebw);
                }
                selCheese = !selCheese  ;
            }
        });

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
