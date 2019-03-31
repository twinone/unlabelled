package com.unlabeledfood;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;


/**
 * A simple {@link Fragment} subclass.
 */
public class ConfirmationFragment extends Fragment {





    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        ConfirmationFragment();
        return inflater.inflate(R.layout.fragment_confirmation, container, false);
    }

    PizzaIngredientsFragment.OrderReq getOrderReq() {
        return ((MainActivity) getActivity()).getOrderReq();
    }

    public void ConfirmationFragment() {
        // Required empty public constructor
        final PizzaIngredientsFragment.OrderReq or = getOrderReq();

        String requestUrl = "http://twinone.xyz:17001/order";
        StringRequest stringRequest = new StringRequest(Request.Method.POST, requestUrl, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.e("Volley Result", ""+response); //the response contains the result from the server, a json string or any other object returned by your server

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                //error.printStackTrace(); //log the error resulting from the request for diagnosis/debugging
                Log.d("err","err",error);
            }
        }){

            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String, String> postMap = new HashMap<>();
                postMap.put("foodName", or.foodType);
                postMap.put("toppings", "{"+String.valueOf(or.toppings)+"}");
                postMap.put("deadline","15");
                postMap.put("maxPrice", String.valueOf((int) or.price*100));
                postMap.put("location","{ 'lat': '" + or.lat +"' , 'lng': '" + or.lng +"'}");
                Log.d("Json", postMap + "");
                return postMap;
            }
        };
//make the request to your server as indicated in your request url
        Volley.newRequestQueue(getContext()).add(stringRequest);
    }





}
