package maxeh.androidsdk.masternews;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;
import com.squareup.picasso.RequestCreator;

import java.io.File;
import java.util.List;

public class WeatherTabRecyclerAdapter extends RecyclerView.Adapter<WeatherTabRecyclerAdapter.ViewHolder> {
    private List<WeatherTabItem> mWeatherList;
    private LayoutInflater mInflater;
    private Context mContext;
    private WeatherTab mWeatherTab;

    public WeatherTabRecyclerAdapter(Context context, List<WeatherTabItem> weatherList) {
        this.mContext = context;
        this.mInflater = LayoutInflater.from(context);
        this.mWeatherList = weatherList;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.fragment_weather_tab_recycler_row, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        String date, temp;
        holder.cityTextView.setText(mWeatherList.get(position).getCityName());

        date = mWeatherList.get(position).getWeatherDetails(0).getDateText();
        date = date.split(" ")[1].split(":")[0] + ":" + date.split(" ")[1].split(":")[1];
        holder.dateTextView1.setText(date);
        temp = mWeatherList.get(position).getWeatherDetails(0).getTemp();
        temp = Math.round(Double.parseDouble(temp) - 273.15) + "°";
        holder.tempTextView1.setText(temp);

        date = mWeatherList.get(position).getWeatherDetails(1).getDateText();
        date = date.split(" ")[1].split(":")[0] + ":" + date.split(" ")[1].split(":")[1];
        holder.dateTextView2.setText(date);
        temp = mWeatherList.get(position).getWeatherDetails(1).getTemp();
        temp = Math.round(Double.parseDouble(temp) - 273.15) + "°";
        holder.tempTextView2.setText(temp);

        date = mWeatherList.get(position).getWeatherDetails(2).getDateText();
        date = date.split(" ")[1].split(":")[0] + ":" + date.split(" ")[1].split(":")[1];
        holder.dateTextView3.setText(date);
        temp = mWeatherList.get(position).getWeatherDetails(2).getTemp();
        temp = Math.round(Double.parseDouble(temp) - 273.15) + "°";
        holder.tempTextView3.setText(temp);

        date = mWeatherList.get(position).getWeatherDetails(3).getDateText();
        date = date.split(" ")[1].split(":")[0] + ":" + date.split(" ")[1].split(":")[1];
        holder.dateTextView4.setText(date);
        temp = mWeatherList.get(position).getWeatherDetails(3).getTemp();
        temp = Math.round(Double.parseDouble(temp) - 273.15) + "°";
        holder.tempTextView4.setText(temp);

        date = mWeatherList.get(position).getWeatherDetails(4).getDateText();
        date = date.split(" ")[1].split(":")[0] + ":" + date.split(" ")[1].split(":")[1];
        holder.dateTextView5.setText(date);
        temp = mWeatherList.get(position).getWeatherDetails(4).getTemp();
        temp = Math.round(Double.parseDouble(temp) - 273.15) + "°";
        holder.tempTextView5.setText(temp);

        date = mWeatherList.get(position).getWeatherDetails(5).getDateText();
        date = date.split(" ")[1].split(":")[0] + ":" + date.split(" ")[1].split(":")[1];
        holder.dateTextView6.setText(date);
        temp = mWeatherList.get(position).getWeatherDetails(5).getTemp();
        temp = Math.round(Double.parseDouble(temp) - 273.15) + "°";
        holder.tempTextView6.setText(temp);

        new Thread(new Runnable() {
            public void run() {
                final RequestCreator rq1 = Picasso.get().load("https://openweathermap.org/img/w/" + mWeatherList.get(position).getWeatherDetails(0).getIcon() + ".png");
                final RequestCreator rq2 = Picasso.get().load("https://openweathermap.org/img/w/" + mWeatherList.get(position).getWeatherDetails(1).getIcon() + ".png");
                final RequestCreator rq3 = Picasso.get().load("https://openweathermap.org/img/w/" + mWeatherList.get(position).getWeatherDetails(2).getIcon() + ".png");
                final RequestCreator rq4 = Picasso.get().load("https://openweathermap.org/img/w/" + mWeatherList.get(position).getWeatherDetails(3).getIcon() + ".png");
                final RequestCreator rq5 = Picasso.get().load("https://openweathermap.org/img/w/" + mWeatherList.get(position).getWeatherDetails(4).getIcon() + ".png");
                final RequestCreator rq6 = Picasso.get().load("https://openweathermap.org/img/w/" + mWeatherList.get(position).getWeatherDetails(5).getIcon() + ".png");
                ((AppCompatActivity) mContext).runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        rq1.into(holder.weatherImage1);
                        rq2.into(holder.weatherImage2);
                        rq3.into(holder.weatherImage3);
                        rq4.into(holder.weatherImage4);
                        rq5.into(holder.weatherImage5);
                        rq6.into(holder.weatherImage6);
                    }
                });
            }
        }).start();
    }

    @Override
    public int getItemCount() {
        return mWeatherList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView cityTextView, dateTextView1, dateTextView2, dateTextView3, dateTextView4, dateTextView5, dateTextView6,
                 tempTextView1, tempTextView2, tempTextView3, tempTextView4, tempTextView5, tempTextView6;
        ImageView weatherImage1, weatherImage2, weatherImage3, weatherImage4, weatherImage5, weatherImage6;
        ImageButton deleteButton;

        ViewHolder(View itemView) {
            super(itemView);
            cityTextView = itemView.findViewById(R.id.cityTextView);
            dateTextView1 = itemView.findViewById(R.id.dateTextView1);
            dateTextView2 = itemView.findViewById(R.id.dateTextView2);
            dateTextView3 = itemView.findViewById(R.id.dateTextView3);
            dateTextView4 = itemView.findViewById(R.id.dateTextView4);
            dateTextView5 = itemView.findViewById(R.id.dateTextView5);
            dateTextView6 = itemView.findViewById(R.id.dateTextView6);
            tempTextView1 = itemView.findViewById(R.id.tempTextView1);
            tempTextView2 = itemView.findViewById(R.id.tempTextView2);
            tempTextView3 = itemView.findViewById(R.id.tempTextView3);
            tempTextView4 = itemView.findViewById(R.id.tempTextView4);
            tempTextView5 = itemView.findViewById(R.id.tempTextView5);
            tempTextView6 = itemView.findViewById(R.id.tempTextView6);
            weatherImage1 = itemView.findViewById(R.id.weatherImage1);
            weatherImage2 = itemView.findViewById(R.id.weatherImage2);
            weatherImage3 = itemView.findViewById(R.id.weatherImage3);
            weatherImage4 = itemView.findViewById(R.id.weatherImage4);
            weatherImage5 = itemView.findViewById(R.id.weatherImage5);
            weatherImage6 = itemView.findViewById(R.id.weatherImage6);
            deleteButton = itemView.findViewById(R.id.deleteButton);
            deleteButton.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            if (mWeatherTab != null) {
                mWeatherTab.onDeleteClick(view, getAdapterPosition());
            }
        }
    }

    public void setClickListener(WeatherTab weatherTab) {
        this.mWeatherTab = weatherTab;
    }
}
