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


public class NotesTab extends Fragment {
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

    public void onNoteAddClick() {
        Intent intent = new Intent(getActivity(), NotesTabDetail.class);
        intent.putExtra("type", "add");
        startActivity(intent);
    }

    public void onEditNoteClick(View view, int position) {
        NotesTabItem note = mRecyclerAdapter.getNote(position);
        Intent intent = new Intent(getActivity(), NotesTabDetail.class);
        intent.putExtra("text", note.getText());
        intent.putExtra("type", "edit");
        startActivity(intent);
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

