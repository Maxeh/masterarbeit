package maxeh.androidsdk.masternews;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

public class NewsTabDetail extends AppCompatActivity {
    private String mUrlToImage;
    private String mDescription;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news_tab_detail);

        Intent intent = getIntent();
        mUrlToImage = intent.getStringExtra("urlToImage");
        mDescription = intent.getStringExtra("description");

        TextView newsDetailTextView = findViewById(R.id.newsDetailTextView);
        newsDetailTextView.setText(mDescription);

        getImage();
    }

    @Override
    public boolean onSupportNavigateUp() {
        finish();
        return true;
    }

    public void getImage() {
        new Thread(new Runnable() {
            public void run() {
                try {
                    final Bitmap bitmap = BitmapFactory.decodeStream(
                            (InputStream) new URL(mUrlToImage).getContent()
                    );
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            ImageView newsDetailImageView = findViewById(R.id.newsDetailImageView);
                            newsDetailImageView.setImageBitmap(bitmap);
                        }
                    });
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
