package maxeh.androidsdk.masternews;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.util.List;

public class NewsTabRecyclerAdapter extends RecyclerView.Adapter<NewsTabRecyclerAdapter.ViewHolder> {
    private List<NewsTabArticle> mArticleList;
    private LayoutInflater mInflater;
    private Context mContext;
    private NewsTab mNewsTab;

    public NewsTabRecyclerAdapter(Context context, List<NewsTabArticle> articleList) {
        this.mContext = context;
        this.mInflater = LayoutInflater.from(context);
        this.mArticleList = articleList;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.fragment_news_tab_recycler_row, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        holder.newsTextView.setText(mArticleList.get(position).getTitle());

        new Thread(new Runnable() {
            public void run() {
                ((AppCompatActivity) mContext).runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Picasso.get().cancelRequest(holder.newsImageView);
                        Picasso.get().load(mArticleList.get(position).getUrlToImage()).into(holder.newsImageView);
                    }
                });
            }
        }).start();
    }

    @Override
    public int getItemCount() {
        return mArticleList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView newsTextView;
        ImageView newsImageView;

        ViewHolder(View itemView) {
            super(itemView);
            newsTextView = itemView.findViewById(R.id.newsTextView);
            newsImageView = itemView.findViewById(R.id.newsImageView);
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            if (mNewsTab != null) {
                mNewsTab.onNewsCardClick(view, getAdapterPosition());
            }
        }
    }

    public NewsTabArticle getArticle(int id) {
        return mArticleList.get(id);
    }

    public void setClickListener(NewsTab newsTab) {
        this.mNewsTab = newsTab;
    }
}
