package com.unlabeledfood;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;


/**
 * A simple {@link Fragment} subclass.
 */
public class ConfirmationFragment extends Fragment {


    RequestQueue q = Volley.newRequestQueue(getActivity());


    PizzaIngredientsFragment.OrderReq getOrderReq() {
        return ((MainActivity) getActivity()).getOrderReq();
    }

    public ConfirmationFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        return inflater.inflate(R.layout.fragment_confirmation, container, false);
    }


}
