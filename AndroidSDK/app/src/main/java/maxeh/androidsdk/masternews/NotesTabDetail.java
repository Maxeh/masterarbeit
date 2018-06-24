package maxeh.androidsdk.masternews;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class NotesTabDetail extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notes_tab_detail);
    }

    @Override
    public boolean onSupportNavigateUp() {
        finish();
        return true;
    }
}
