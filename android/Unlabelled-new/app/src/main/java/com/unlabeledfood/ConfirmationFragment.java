package com.unlabeledfood;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.gson.Gson;
import com.koushikdutta.async.http.AsyncHttpClient;
import com.koushikdutta.async.http.WebSocket;


/**
 * A simple {@link Fragment} subclass.
 */
public class ConfirmationFragment extends Fragment {


    PizzaIngredientsFragment.OrderReq getOrderReq() {
        return ((MainActivity) getActivity()).getOrderReq();
    }

    public ConfirmationFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {


        View v = inflater.inflate(R.layout.fragment_confirmation, container, false);
        initWS();

        return v;
    }

    void initWS() {
        AsyncHttpClient.getDefaultInstance().websocket("ws://twinone.xyz:17001/ws", "blah", new AsyncHttpClient.WebSocketConnectCallback() {
            @Override
            public void onCompleted(Exception ex, WebSocket webSocket) {
                if (ex != null) {
                    ex.printStackTrace();
                    return;
                }

                PizzaIngredientsFragment.OrderReq req = getOrderReq();
                String json = new Gson().toJson(req);

                webSocket.send(json);
                webSocket.setStringCallback(new WebSocket.StringCallback() {
                    public void onStringAvailable(String s) {
                        Log.d("WebSocket", "Received: " + s);
                    }
                });
            }
        });



    }


}
