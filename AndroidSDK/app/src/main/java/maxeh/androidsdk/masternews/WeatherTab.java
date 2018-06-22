package maxeh.androidsdk.masternews;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class WeatherTab extends Fragment {
    private OkHttpClient mClient = new OkHttpClient();
    private ArrayList<WeatherTabItem> mWeatherList = new ArrayList<>();
    private View mView;
    private String[] mStartCities = {"Duisburg"};

    public WeatherTab() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_weather_tab, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        mView = view;
        getRequest(this, 0);
    }

    public void onNewsCardClick(View view, int position) {
        Toast.makeText(getActivity(), "clicked", Toast.LENGTH_LONG).show();
    }

    public void getRequest(final WeatherTab weatherTab, final int count) {
        String url = "https://maxeh.de/masternews.php?type=weather&city=" + mStartCities[count];
        Request request = new Request.Builder().url(url).build();

        mClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e("error", e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) {
                try {
                    String res = response.body().string();
                    JSONObject rootObj = new JSONObject(res);

                    WeatherTabItem weatherTabItem = new WeatherTabItem(rootObj.getJSONObject("city").getString("name"));

                    for (int i = 0; i < 6; i++) {
                        weatherTabItem.addWeatherDetails(
                                rootObj.getJSONArray("list").getJSONObject(i).getString("dt_txt"),
                                rootObj.getJSONArray("list").getJSONObject(i).getJSONObject("main").getString("temp"),
                                rootObj.getJSONArray("list").getJSONObject(i).getJSONArray("weather").getJSONObject(0).getString("icon")
                        );
                    }
                    mWeatherList.add(weatherTabItem);

                    if (count == mStartCities.length - 1) {
                        getActivity().runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                RecyclerView recyclerView = mView.findViewById(R.id.recyclerViewWeather);
                                recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
                                WeatherTabRecyclerAdapter recyclerAdapter = new WeatherTabRecyclerAdapter(getActivity(), mWeatherList);
                                recyclerAdapter.setClickListener(weatherTab);
                                recyclerView.setAdapter(recyclerAdapter);
                            }
                        });
                    } else getRequest(weatherTab, count + 1);

                } catch (Exception e) {
                    Log.e("error", e.getMessage());
                }
            }
        });
    }

    public void test() {
        Toast.makeText(getActivity(), "weather", Toast.LENGTH_LONG).show();
    }
}
