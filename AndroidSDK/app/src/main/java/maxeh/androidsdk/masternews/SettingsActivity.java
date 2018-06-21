package maxeh.androidsdk.masternews;

import android.support.v7.app.AppCompatActivity;
import android.os.Handler;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.RadioButton;

public class SettingsActivity extends AppCompatActivity {
    CheckBox mRadioButton1, mRadioButton2, mRadioButton3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // delayed handler reduces lag when called from drawer
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                setContentView(R.layout.activity_settings);
/*
                mRadioButton1 = findViewById(R.id.radioCheckBox1);
                mRadioButton2 = findViewById(R.id.radioCheckBox2);
                mRadioButton3 = findViewById(R.id.radioCheckBox3);

                mRadioButton1.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        mRadioButton1.setChecked(true);
                        mRadioButton2.setChecked(false);
                        mRadioButton3.setChecked(false);
                    }
                });

                mRadioButton2.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        mRadioButton1.setChecked(false);
                        mRadioButton2.setChecked(true);
                        mRadioButton3.setChecked(false);
                    }
                });

                mRadioButton3.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        mRadioButton1.setChecked(false);
                        mRadioButton2.setChecked(false);
                        mRadioButton3.setChecked(true);
                    }
                });*/
            }
        }, 80);
    }

    @Override
    public boolean onSupportNavigateUp() {
        finish();
        return true;
    }
}
