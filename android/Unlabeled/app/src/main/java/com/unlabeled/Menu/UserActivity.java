package com.unlabeled.Menu;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;

import com.unlabeled.R;

import java.util.ArrayList;

public class UserActivity extends AppCompatActivity {
    private static final int REQ_PERM = 4321;

    private RecyclerView menu;
    private LinearLayoutManager mLayoutManager;
    private MenuAdapter mAdapter;
    private double longitudeNetwork;
    private double latitudeNetwork;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);
        menu = findViewById(R.id.menu);
        mLayoutManager = new LinearLayoutManager(this);
        menu.setLayoutManager(mLayoutManager);
        // Acquire a reference to the system Location Manager
        final LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);

        final LocationListener locationListener = new LocationListener() {
            public void onLocationChanged(Location location) {
                // Called when a new location is found by the network location provider.
                newLocation(location);
            }

            public void onStatusChanged(String provider, int status, Bundle extras) {}

            public void onProviderEnabled(String provider) {}

            public void onProviderDisabled(String provider) {}
        };


        final ArrayList<MenuItem> myMenu = new ArrayList<>();
        myMenu.add(new MenuItem("Burger"));
        myMenu.add(new MenuItem("Pizza"));
        myMenu.add(new MenuItem("Döner"));
        mAdapter = new MenuAdapter(myMenu, new MenuAdapter.OnItemClickListener(){
            @Override
            public void onItemClick(View view, int pos){
                MenuItem j = myMenu.get(pos);
                Log.d("MenuItem",pos + " " + j.name + "");
                if (ContextCompat.checkSelfPermission(UserActivity.this, Manifest.permission.ACCESS_FINE_LOCATION)!= PackageManager.PERMISSION_GRANTED) {
                    if (ActivityCompat.shouldShowRequestPermissionRationale(UserActivity.this, Manifest.permission.ACCESS_FINE_LOCATION)) {
                    }
                    else {
                        ActivityCompat.requestPermissions(UserActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, REQ_PERM);
                    }
                }
                else {

                }
                locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, locationListener);
                Log.d("MenuItem",latitudeNetwork + "," + longitudeNetwork);

                //Intent i = new Intent();
                //startActivity(i);
            }

        });
        menu.setAdapter(mAdapter);


    }

    private void newLocation(Location location) {
        latitudeNetwork = location.getLatitude();
        longitudeNetwork = location.getLongitude();
    }

}
