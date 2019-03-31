package com.unlabeledfood;


import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

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


                        onStringResponse(s);

                    }
                });
            }
        });


    }

    private Handler mHandler = new Handler();

    private void onStringResponse(final String s) {
        mHandler.post(new Runnable() {
            @Override
            public void run() {

                try {
                    StatusMsg sm = new Gson().fromJson(s, StatusMsg.class);
                    if (sm.status != null) {
                        if (sm.status.equals("accepted")) {


                            ((TextView) getView().findViewById(R.id.tvState))
                                    .setText("The restaurant is preparing your order");


                            ((TextView) getView().findViewById(R.id.tvMinutes))
                                    .setVisibility(View.VISIBLE);
                            ((TextView) getView().findViewById(R.id.tvDesc))
                                    .setVisibility(View.VISIBLE);
                            ((TextView) getView().findViewById(R.id.tvRemaining))
                                    .setVisibility(View.VISIBLE);


                        }
                        if (sm.status.equals("shipped")) {

                            ((TextView) getView().findViewById(R.id.tvState))
                                    .setText("Your order is on its way!");
                            ((TextView) getView().findViewById(R.id.tvRemaining))
                                    .setText("5");


                        }

                        if (sm.status.equals("delivered")) {

                            ((TextView) getView().findViewById(R.id.tvState))
                                    .setText("Your order is delivered!");
                            ((TextView) getView().findViewById(R.id.tvMinutes))
                                    .setVisibility(View.GONE);


                            ((TextView) getView().findViewById(R.id.tvDesc))
                                    .setText("We hope you enjoyed your pizza!");


                        }
                    }
                } catch (Exception e) {
                    Log.e("Error JSON", "WOW", e);
                }
            }
        });
    }

    public class StatusMsg {
        public String status;
    }


}
