package maxeh.androidsdk.masternews;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import java.util.ArrayList;
import java.util.List;

import static android.app.Activity.RESULT_OK;


public class NotesTab extends Fragment {
    static final int ADD_NOTE = 1;
    static final int EDIT_NOTE = 2;

    private NotesTabRecyclerAdapter mRecyclerAdapter;
    private List<NotesTabItem> mNotesList = new ArrayList<>();
    private String[] mStartNotes = {
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor " +
            "invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. \n\nAt vero " +
            "eos et accusam et justo duo dolores et ea rebum. \uD83D\uDE04\uD83D\uDE01",

            "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim " +
            "placerat facer possim assum. \n\nLorem ipsum dolor sit amet, consectetuer adipiscing elit, " +
            "sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
    };
    private View mView;

    public NotesTab() {}

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_notes_tab, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        mView = view;
        for (String note: mStartNotes) {
            mNotesList.add(new NotesTabItem(note));
        }
        mView.findViewById(R.id.notesEmptyTextView).setVisibility(View.INVISIBLE);

        RecyclerView recyclerView = mView.findViewById(R.id.recyclerViewNotes);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mRecyclerAdapter = new NotesTabRecyclerAdapter(getActivity(), mNotesList);
        mRecyclerAdapter.setClickListener(this);
        recyclerView.setAdapter(mRecyclerAdapter);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == ADD_NOTE && resultCode == RESULT_OK) {
            mNotesList.add(new NotesTabItem(data.getStringExtra("text")));
            mRecyclerAdapter.notifyItemInserted(mNotesList.size() - 1);
            mView.findViewById(R.id.notesEmptyTextView).setVisibility(View.INVISIBLE);
        } else if (requestCode == EDIT_NOTE && resultCode == RESULT_OK) {
            int index = data.getIntExtra("index", -1);
            if (index > -1) {
                String text = data.getStringExtra("text");
                mNotesList.get(index).setText(text);
                mRecyclerAdapter.notifyItemChanged(index);
            }
        }
    }

    public void onNoteAddClick() {
        Intent intent = new Intent(getActivity(), NotesTabDetail.class);
        intent.putExtra("requestCode", ADD_NOTE);
        startActivityForResult(intent, ADD_NOTE);
    }

    public void onEditNoteClick(View view, int position) {
        NotesTabItem note = mRecyclerAdapter.getNote(position);
        Intent intent = new Intent(getActivity(), NotesTabDetail.class);
        intent.putExtra("index", position);
        intent.putExtra("text", note.getText());
        intent.putExtra("requestCode", EDIT_NOTE);
        startActivityForResult(intent, EDIT_NOTE);
    }

    public void onDeleteNoteClick(View view, final int position) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setMessage("Wirklich löschen?");
        builder.setCancelable(true);

        builder.setPositiveButton("Löschen", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                mNotesList.remove(position);
                mRecyclerAdapter.notifyItemRemoved(position);

                if (mNotesList.size() == 0) {
                    mView.findViewById(R.id.notesEmptyTextView).setVisibility(View.VISIBLE);
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
}

