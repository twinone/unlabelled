package com.unlabeled.Menu;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;

import com.unlabeled.R;

import java.util.ArrayList;

public class UserActivity extends AppCompatActivity {
    private RecyclerView menu;
    private LinearLayoutManager mLayoutManager;
    private MenuAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);
        menu = findViewById(R.id.menu);
        mLayoutManager = new LinearLayoutManager(this);
        menu.setLayoutManager(mLayoutManager);


        final ArrayList<MenuItem> myMenu = new ArrayList<>();
        myMenu.add(new MenuItem("Burger"));
        myMenu.add(new MenuItem("Pizza"));
        myMenu.add(new MenuItem("Döner"));
        mAdapter = new MenuAdapter(myMenu, new MenuAdapter.OnItemClickListener(){
            @Override
            public void onItemClick(View view, int pos){
                MenuItem j = myMenu.get(pos);
                Log.d("MenuItem",pos + " " + j.name + "");
                //Intent i = new Intent();
                //startActivity(i);
            }

        });
        menu.setAdapter(mAdapter);


    }

}
