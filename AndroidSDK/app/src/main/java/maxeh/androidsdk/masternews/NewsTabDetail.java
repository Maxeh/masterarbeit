package maxeh.androidsdk.masternews;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

public class NewsTabDetail extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news_tab_detail);

        Intent intent = getIntent();
        String urlToImage = intent.getStringExtra("urlToImage");
        String description = intent.getStringExtra("description");

        TextView newsDetailTextView = findViewById(R.id.newsDetailTextView);
        newsDetailTextView.setText(description);

        ImageView newsDetailImageView = findViewById(R.id.newsDetailImageView);
        Picasso.get().cancelRequest(newsDetailImageView);
        Picasso.get().load(urlToImage).into(newsDetailImageView);
    }

    @Override
    public boolean onSupportNavigateUp() {
        finish();
        return true;
    }
}
