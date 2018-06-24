package maxeh.androidsdk.masternews;

import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class WeatherTab extends Fragment {
    private OkHttpClient mClient = new OkHttpClient();
    private ArrayList<WeatherTabItem> mWeatherList = new ArrayList<>();
    private List<String> mStartCities = new ArrayList<>();
    private WeatherTabRecyclerAdapter mRecyclerAdapter;
    private View mView;

    public WeatherTab() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_weather_tab, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        mView = view;
        mStartCities.add("Duisburg");
        getRequest(true, this, mStartCities);
    }

    public void getRequest(final Boolean isInitialLoading, final WeatherTab weatherTab, final List<String> cities) {
        String url = "https://maxeh.de/masternews.php?type=weather&city=" + cities.remove(0);
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

                    if (isInitialLoading && cities.size() == 0) {
                        getActivity().runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                mView.findViewById(R.id.weatherEmptyTextView).setVisibility(View.INVISIBLE);
                                RecyclerView recyclerView = mView.findViewById(R.id.recyclerViewWeather);
                                recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
                                mRecyclerAdapter = new WeatherTabRecyclerAdapter(getActivity(), mWeatherList);
                                mRecyclerAdapter.setClickListener(weatherTab);
                                recyclerView.setAdapter(mRecyclerAdapter);
                            }
                        });
                    } else if (isInitialLoading) {
                        getRequest(true, weatherTab, cities);
                    } else {
                        getActivity().runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                mView.findViewById(R.id.weatherEmptyTextView).setVisibility(View.INVISIBLE);
                                mRecyclerAdapter.notifyItemInserted(mWeatherList.size());
                            }
                        });
                    }

                } catch (Exception e) {
                    Log.e("error", e.getMessage());
                }
            }
        });
    }

    public void onDeleteClick(View view, final int position) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setMessage("Wirklich löschen?");
        builder.setCancelable(true);

        builder.setPositiveButton("Löschen", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                mWeatherList.remove(position);
                mRecyclerAdapter.notifyItemRemoved(position);

                if (mWeatherList.size() == 0) {
                    getActivity().findViewById(R.id.weatherEmptyTextView).setVisibility(View.VISIBLE);
                }
            }
        });

        builder.setNegativeButton("Abbrechen", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.cancel();
            }
        });

        AlertDialog dialog = builder.create();
        dialog.show();
        Button deletebutton = dialog.getButton(DialogInterface.BUTTON_POSITIVE);
        deletebutton.setTextColor(getResources().getColor(R.color.danger));
    }

    public void onCityAddClick() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setTitle("Name der Stadt");
        LinearLayout container = new LinearLayout(getActivity());
        container.setOrientation(LinearLayout.VERTICAL);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        lp.setMargins(66,25,60,25);
        final EditText input = new EditText(getActivity());
        container.addView(input, lp);

        builder.setView(container);
        builder.setPositiveButton("Hinzufügen", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int whichButton) {
                String city = input.getText().toString();
                List<String> cityList = new ArrayList<>();
                cityList.add(city);
                getRequest(false, null, cityList);
            }
        });
        builder.setNegativeButton("Abbrechen", new DialogInterface.OnClickListener() {
           public void onClick(DialogInterface dialog, int which) {}
        });

        AlertDialog dialog = builder.create();
        dialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);
        dialog.show();
    }
}
