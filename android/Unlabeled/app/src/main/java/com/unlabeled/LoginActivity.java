package com.unlabeled;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.unlabeled.Menu.UserActivity;

public class LoginActivity extends AppCompatActivity {
    private EditText email;
    private EditText passw;
    private Button login;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        email = findViewById(R.id.input_email);
        passw = findViewById(R.id.input_password);
        login = findViewById(R.id.btn_login);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RequestQueue queue = Volley.newRequestQueue(LoginActivity.this);
                String url = "http://twinone.xyz:17001/login/"+email.getText()+"/" + passw.getText();
                Log.d("Token",url);

                // Request a string response from the provided URL.
                StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                // Display the first 500 characters of the response string.
                                String result = new Gson().fromJson(response, JsonObject.class).get("status").toString();

                                if(result.equals("error")){
                                    // TODO throw error

                                }

                                else {
                                    String token = new Gson().fromJson(response, JsonObject.class).get("token").toString();
                                    Intent i = new Intent(LoginActivity.this, UserActivity.class);
                                    i.putExtra("token",token);
                                    startActivity(i);
                                }
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Token", "Error",error);
                    }
                });

                // Add the request to the RequestQueue.
                queue.add(stringRequest);
            }
        });



    }
}
