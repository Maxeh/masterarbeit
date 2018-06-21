package maxeh.androidsdk.masternews;

import android.support.v7.app.AppCompatActivity;
import android.os.Handler;
import android.os.Bundle;
import android.view.View;
import android.widget.RadioButton;

public class SettingsActivity extends AppCompatActivity {
    RadioButton mRadioButton1, mRadioButton2, mRadioButton3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // delayed handler reduces lag when called from drawer
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                setContentView(R.layout.activity_settings);

                mRadioButton1 = findViewById(R.id.radioButton1);
                mRadioButton2 = findViewById(R.id.radioButton2);
                mRadioButton3 = findViewById(R.id.radioButton3);

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
                });
            }
        }, 80);
    }

    @Override
    public boolean onSupportNavigateUp() {
        finish();
        return true;
    }

    public void setRadiobutton(View view) {
        switch(view.getId()) {
            case R.id.constraintLayout1:
                if (!mRadioButton1.isChecked()) {
                    mRadioButton1.setChecked(true);
                    mRadioButton2.setChecked(false);
                    mRadioButton3.setChecked(false);
                }
                break;
            case R.id.constraintLayout2:
                if (!mRadioButton2.isChecked()) {
                    mRadioButton1.setChecked(false);
                    mRadioButton2.setChecked(true);
                    mRadioButton3.setChecked(false);
                }
                break;
            case R.id.constraintLayout3:
                if (!mRadioButton3.isChecked()) {
                    mRadioButton1.setChecked(false);
                    mRadioButton2.setChecked(false);
                    mRadioButton3.setChecked(true);
                    break;
                }
        }
    }
}
