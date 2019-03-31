package com.unlabeledfood;


import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RatingBar;
import android.widget.TextView;

import com.google.gson.Gson;
import com.koushikdutta.async.http.AsyncHttpClient;
import com.koushikdutta.async.http.WebSocket;


/**
 * A simple {@link Fragment} subclass.
 */
public class ConfirmationFragment extends Fragment {


    private View mRoot;
    private WebSocket mWebSocket;

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


        RatingBar rb = v.findViewById(R.id.rating);
        rb.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {
                if (mWebSocket != null) mWebSocket.send("{\"rating\":" + (int) rating + "}");
            }
        });
        mRoot = v;
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

                mWebSocket = webSocket;
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


                            ((TextView) mRoot.findViewById(R.id.tvState))
                                    .setText("The restaurant is preparing your order");


                            ((TextView) mRoot.findViewById(R.id.tvMinutes))
                                    .setVisibility(View.VISIBLE);
                            ((TextView) mRoot.findViewById(R.id.tvDesc))
                                    .setVisibility(View.VISIBLE);
                            ((TextView) mRoot.findViewById(R.id.tvRemaining))
                                    .setVisibility(View.VISIBLE);


                        }
                        if (sm.status.equals("shipped")) {

                            ((TextView) mRoot.findViewById(R.id.tvState))
                                    .setText("Your order is on its way!");
                            ((TextView) mRoot.findViewById(R.id.tvRemaining))
                                    .setText("5");


                        }

                        if (sm.status.equals("delivered")) {

                            ((TextView) mRoot.findViewById(R.id.tvState))
                                    .setText("Your order is delivered!");
                            ((TextView) mRoot.findViewById(R.id.tvRemaining))
                                    .setVisibility(View.INVISIBLE);
                            ((TextView) mRoot.findViewById(R.id.tvMinutes))
                                    .setVisibility(View.INVISIBLE);


                            ((TextView) mRoot.findViewById(R.id.tvDesc))
                                    .setText("We hope you enjoyed your pizza!");


                            (mRoot.findViewById(R.id.tvRateIt))
                                    .setVisibility(View.VISIBLE);

                            (mRoot.findViewById(R.id.rating))
                                    .setVisibility(View.VISIBLE);
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
