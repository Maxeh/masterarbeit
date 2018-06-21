package maxeh.androidsdk.masternews;

import android.support.v7.app.AppCompatActivity;
import android.os.Handler;
import android.os.Bundle;

public class SettingsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // delayed handler reduces lag when called from drawer
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                setContentView(R.layout.activity_settings);
            }
        }, 80);
    }

    @Override
    public boolean onSupportNavigateUp() {
        finish();
        return true;
    }
}
