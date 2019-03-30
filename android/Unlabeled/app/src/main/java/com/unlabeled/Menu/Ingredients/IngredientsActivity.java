package com.unlabeled.Menu.Ingredients;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.unlabeled.Menu.Ingredients.ui.ingredients.IngredientsFragment;
import com.unlabeled.R;

public class IngredientsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.ingredients_activity);
        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.container, IngredientsFragment.newInstance())
                    .commitNow();
        }
    }
}
