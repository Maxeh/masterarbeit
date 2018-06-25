package maxeh.androidsdk.masternews;

import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class NotesTabDetail extends AppCompatActivity {
    static final int ADD_NOTE = 1;
    static final int EDIT_NOTE = 2;
    int mRequestCode;
    int mEditIndex;
    String mNoteText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notes_tab_detail);

        Intent intent = getIntent();
        mRequestCode = intent.getIntExtra("requestCode", -1);
        if (mRequestCode == EDIT_NOTE) {
            mNoteText = intent.getStringExtra("text");
            mEditIndex = intent.getIntExtra("index", -1);
            TextView noteEditText = findViewById(R.id.noteEditText);
            noteEditText.setText(mNoteText);
        }

        ImageButton noteCreateButtonAdd = findViewById(R.id.noteCreateButtonAdd);
        ImageButton noteCreateButtonEdit = findViewById(R.id.noteCreateButtonEdit);
        Toolbar toolbar = findViewById(R.id.toolbarTabNoteDetail);
        if (mRequestCode == ADD_NOTE) {
            toolbar.setTitle("Neue Notiz");
            noteCreateButtonAdd.setVisibility(View.VISIBLE);
        } else if (mRequestCode == EDIT_NOTE) {
            toolbar.setTitle("Notiz bearbeiten");
            noteCreateButtonEdit.setVisibility(View.VISIBLE);
        }
        toolbar.setTitleTextColor(Color.parseColor("#ffffff"));
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        TextView noteDateText = findViewById(R.id.noteDateText);
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy - HH:mm", Locale.GERMAN);
        noteDateText.setText(df.format(new Date()));
    }

    @Override
    public boolean onSupportNavigateUp() {
        finish();
        return true;
    }

    public void onCreateOrUpdateClick(View view) {
        EditText noteEditText = findViewById(R.id.noteEditText);
        mNoteText = noteEditText.getText().toString();

        if (!mNoteText.equals("")) {
            Intent data = new Intent();
            data.putExtra("text", mNoteText);
            data.putExtra("index", mEditIndex);
            setResult(RESULT_OK, data);
            finish();
        } else finish();
    }
}
