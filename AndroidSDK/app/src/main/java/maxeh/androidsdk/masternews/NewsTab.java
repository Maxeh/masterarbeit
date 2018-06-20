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

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class NewsTab extends Fragment {
    private OkHttpClient mClient = new OkHttpClient();
    private NewsTabRecyclerAdapter mAdapter;
    private JSONArray mArticles;
    private View mView;

    public NewsTab() {}

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_news_tab, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        mView = view;
        getRequest(this, "https://maxeh.de/masternews.php?type=news");
    }

    public void onItemClick(View view, int position) {
        NewsTabArticle article = mAdapter.getArticle(position);

        Intent myIntent = new Intent(getActivity(), NewsTabDetail.class);
        myIntent.putExtra("description", article.getDescription());
        myIntent.putExtra("urlToImage", article.getUrlToImage());
        startActivity(myIntent);
    }

    public void getRequest(final NewsTab newsTab, String url) {
        Request request = new Request.Builder().url(url).build();

        mClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(final Call call, IOException e) {
                Log.e("error", e.getMessage());
            }

            @Override
            public void onResponse(Call call, final Response response) {
                try {
                    String res = response.body().string();
                    JSONObject rootObj = new JSONObject(res);
                    mArticles = rootObj.getJSONArray("articles");
                    final ArrayList<NewsTabArticle> articlesList = new ArrayList<>();
                    for (int i = 0; i < mArticles.length(); i++) {
                        NewsTabArticle article = new NewsTabArticle(
                                mArticles.getJSONObject(i).getString("title"),
                                mArticles.getJSONObject(i).getString("description"),
                                mArticles.getJSONObject(i).getString("urlToImage")
                        );
                        articlesList.add(article);
                    }

                    getActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            RecyclerView recyclerView = mView.findViewById(R.id.recyclerView);
                            recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
                            mAdapter = new NewsTabRecyclerAdapter(getActivity(), articlesList);
                            mAdapter.setClickListener(newsTab);
                            recyclerView.setAdapter(mAdapter);

                            ProgressBar progressBar = mView.findViewById(R.id.progressBar);
                            progressBar.setVisibility(View.INVISIBLE);
                        }
                    });
                } catch (Exception e) {
                    Log.e("error", e.getMessage());
                }
            }
        });
    }
}
