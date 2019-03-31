package com.unlabeledfood;


import android.opengl.Visibility;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import java.util.ArrayList;
import java.util.List;


/**
 * A simple {@link Fragment} subclass.
 */
public class PizzaIngredientsFragment extends Fragment {

    private static final float BASE_PRICE = 3.00f;
    private static final float INGREDIENT_PRICE = 0.5f;

    private RelativeLayout mRoot;

    boolean olives;
    boolean onion;
    boolean tomato;
    boolean pepperoni;
    boolean cheese;
    boolean mushroom;

    private ImageButton image_olives;
    private ImageButton image_onion;
    private ImageButton image_tomato;
    private ImageButton image_pepperoni;
    private ImageButton image_cheese;
    private ImageButton image_mushroom;


    private ImageView pizza_olives;
    private ImageView pizza_onion;
    private ImageView pizza_tomato;
    private ImageView pizza_pepperoni;
    private ImageView pizza_cheese;
    private ImageView pizza_mushroom;

    ImageView imgs[];


    View.OnClickListener listener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            switch (v.getId()) {
                case R.id.olives:
                    olives = !olives;
                    break;
                case R.id.onion:
                    onion = !onion;
                    break;
                case R.id.tomato:
                    tomato = !tomato;
                    break;
                case R.id.pepperoni:
                    pepperoni = !pepperoni;
                    break;
                case R.id.cheese:
                    cheese = !cheese;
                    break;
                case R.id.mushroom:
                    mushroom = !mushroom;
                    break;
            }


            image_olives.setBackgroundResource(olives ? R.drawable.olivescolour : R.drawable.olivesbw);
            image_onion.setBackgroundResource(onion ? R.drawable.onioncolour : R.drawable.onionbw);
            image_tomato.setBackgroundResource(tomato ? R.drawable.tomatocolour : R.drawable.tomatobw);
            image_pepperoni.setBackgroundResource(pepperoni ? R.drawable.pepperonicolour : R.drawable.pepperonibw);
            image_cheese.setBackgroundResource(cheese ? R.drawable.cheesecolour : R.drawable.cheesebw);
            image_mushroom.setBackgroundResource(mushroom ? R.drawable.mushroomcolour : R.drawable.mushroombw);

            pizza_olives.setVisibility(olives ? View.VISIBLE : View.INVISIBLE);
            pizza_onion.setVisibility(onion ? View.VISIBLE : View.INVISIBLE);
            pizza_tomato.setVisibility(tomato ? View.VISIBLE : View.INVISIBLE);
            pizza_pepperoni.setVisibility(pepperoni ? View.VISIBLE : View.INVISIBLE);
            pizza_cheese.setVisibility(cheese ? View.VISIBLE : View.INVISIBLE);
            pizza_mushroom.setVisibility(mushroom ? View.VISIBLE : View.INVISIBLE);

            updateFloatingIngredientsPosition();
        }

    };


    public PizzaIngredientsFragment() {
    }

    void updateFloatingIngredientsPosition() {
        View pizza = mRoot.findViewById(R.id.pizza);
        int cy = pizza.getHeight() / 2 + (int) pizza.getY() - pizza.getPaddingTop();
        float scale = 0.6f;

        float step = (float) Math.PI * 2 / imgs.length;
        float startingAngle = -(float) Math.PI / 2 - step / 2;
        int radius = (int) (pizza.getWidth() / 3.3);

        for (int i = 0; i < imgs.length; i++) {
            int offsetX = (int) (radius * Math.cos(startingAngle + i * step));
            int offsetY = (int) (radius * Math.sin(startingAngle + i * step));

            View vv = imgs[i];
            vv.setScaleX(scale);
            vv.setScaleY(scale);

            vv.setX(mRoot.getWidth() / 2 - vv.getWidth() / 2 + offsetX);
            //vv.setBackgroundColor(Color.parseColor("#ff0000"));
            vv.setY(cy - vv.getHeight() / 2 + offsetY);
        }


        List<String> ts = new ArrayList<>();
        for (int i = 0; i < imgs.length; i++) {
            if (imgs[i].getVisibility() == View.VISIBLE) {
                ts.add(toppingPosToString(i));
            }
        }
        float totalPrice = BASE_PRICE + INGREDIENT_PRICE * ts.size();
        ((Button) mRoot.findViewById(R.id.btn_confirm))
                .setText("Confirm Order (Total: " + String.valueOf(totalPrice) + "€)");
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_pizza_ingredients, container, false);


        mRoot = v.findViewById(R.id.rlcontent);

        image_olives = v.findViewById(R.id.olives);
        image_onion = v.findViewById(R.id.onion);
        image_tomato = v.findViewById(R.id.tomato);
        image_pepperoni = v.findViewById(R.id.pepperoni);
        image_cheese = v.findViewById(R.id.cheese);
        image_mushroom = v.findViewById(R.id.mushroom);


        pizza_olives = new ImageView(getActivity());
        pizza_onion = new ImageView(getActivity());
        pizza_tomato = new ImageView(getActivity());
        pizza_pepperoni = new ImageView(getActivity());
        pizza_cheese = new ImageView(getActivity());
        pizza_mushroom = new ImageView(getActivity());

        imgs = new ImageView[]{pizza_olives, pizza_onion, pizza_tomato, pizza_pepperoni, pizza_cheese, pizza_mushroom};

        pizza_olives.setImageResource(R.drawable.olivescolour);
        pizza_onion.setImageResource(R.drawable.onioncolour);
        pizza_tomato.setImageResource(R.drawable.tomatocolour);
        pizza_pepperoni.setImageResource(R.drawable.pepperonicolour);
        pizza_cheese.setImageResource(R.drawable.cheesecolour);
        pizza_mushroom.setImageResource(R.drawable.mushroomcolour);

        for (int i = 0; i < imgs.length; i++) {
            RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(500, 500);
            params.setMargins(0, 0, 0, 0);
            View vv = imgs[i];
            vv.setLayoutParams(params);
            vv.setVisibility(View.INVISIBLE);
            mRoot.addView(vv);
        }


        image_olives.setOnClickListener(listener);
        image_onion.setOnClickListener(listener);
        image_tomato.setOnClickListener(listener);
        image_pepperoni.setOnClickListener(listener);
        image_cheese.setOnClickListener(listener);
        image_mushroom.setOnClickListener(listener);

        v.findViewById(R.id.btn_confirm).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openConfirmFragment();
            }
        });

        updateFloatingIngredientsPosition();
        return v;
    }

    public class OrderReq {
        public String foodType;
        public String[] toppings;
        public float price;
        public float lat;
        public float lng;

        public OrderReq(String a, String b[], float c, float d, float e) {
            foodType = a;
            toppings = b;
            price = c;
            lat = d;
            lng = e;
        }
    }


    private void openConfirmFragment() {

        // create OrderReq
        createOrderReq();


        getActivity()
                .getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.content, new ConfirmationFragment())
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                .addToBackStack(null)
                .commit();
    }

    private String toppingPosToString(int pos) {
        switch (pos) {
            case 0:
                return "olives";
            case 1:
                return "onion";
            case 2:
                return "tomato";
            case 3:
                return "pepperoni";
            case 4:
                return "cheese";
            case 5:
                return "mushroom";
        }
        return "";
    }

    private void createOrderReq() {
        List<String> ts = new ArrayList<>();
        for (int i = 0; i < imgs.length; i++) {
            if (imgs[i].getVisibility() == View.VISIBLE) {
                ts.add(toppingPosToString(i));
            }
        }

        Log.d("Location", ((MainActivity) getActivity()).lat + "," + ((MainActivity) getActivity()).lng);
        OrderReq request = new OrderReq("pizza",
                ts.toArray(new String[ts.size()]),
                BASE_PRICE + INGREDIENT_PRICE * ts.size(),
                ((MainActivity) getActivity()).lat,
                ((MainActivity) getActivity()).lng);


        ((MainActivity) getActivity()).setOrderReq(request);

    }


}
