
package com.unlabeled.Menu;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.unlabeled.R;

import java.util.ArrayList;

public class MenuAdapter extends RecyclerView.Adapter<MenuAdapter.MyViewHolder> {

    private final OnItemClickListener myListener;
    private ArrayList<MenuItem> mDataset;
    public interface OnItemClickListener {
        void onItemClick(View v,int pos);
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        private TextView mTextView;
        private RelativeLayout mRoot;
        public MyViewHolder(RelativeLayout v) {
            super(v);
            mRoot = v;
            mTextView = v.findViewById(R.id.abc);
        }
    }

    public MenuAdapter(ArrayList<MenuItem> myDataset, OnItemClickListener listener) {
        mDataset = myDataset;
        myListener = listener;
    }

    @Override
    public MenuAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        RelativeLayout v = (RelativeLayout) LayoutInflater.from(parent.getContext()).inflate(R.layout.menu_list_item, parent, false);
        MyViewHolder vh = new MyViewHolder(v);
        return vh;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, final int position) {
        holder.mRoot.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                myListener.onItemClick(v,position);
            }
        });
        holder.mTextView.setText(mDataset.get(position).name);
    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }
}