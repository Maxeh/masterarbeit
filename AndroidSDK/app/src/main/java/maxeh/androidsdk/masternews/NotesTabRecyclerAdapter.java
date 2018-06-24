package maxeh.androidsdk.masternews;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import java.util.List;

public class NotesTabRecyclerAdapter extends RecyclerView.Adapter<NotesTabRecyclerAdapter.ViewHolder> {
    private List<NotesTabItem> mNotesList;
    private LayoutInflater mInflater;
    private NotesTab mNotesTab;

    public NotesTabRecyclerAdapter(Context context, List<NotesTabItem> notesList) {
        this.mInflater = LayoutInflater.from(context);
        this.mNotesList = notesList;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.fragment_notes_tab_recycler_row, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        holder.noteTextView.setText(mNotesList.get(position).getText());
        holder.dateTextView.setText(mNotesList.get(position).getDate());
    }

    @Override
    public int getItemCount() {
        return mNotesList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView noteTextView, dateTextView;
        ImageButton deleteNoteButton, editNoteButton;

        ViewHolder(View itemView) {
            super(itemView);
            noteTextView = itemView.findViewById(R.id.noteTextView);
            dateTextView = itemView.findViewById(R.id.dateTextView);
            deleteNoteButton = itemView.findViewById(R.id.deleteNoteButton);
            editNoteButton = itemView.findViewById(R.id.editNoteButton);

            deleteNoteButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mNotesTab.onDeleteNoteClick(view, getAdapterPosition());
                }
            });
            editNoteButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mNotesTab.onEditNoteClick(view, getAdapterPosition());
                }
            });
        }
    }

    public NotesTabItem getNote(int id) {
        return mNotesList.get(id);
    }

    public void setClickListener(NotesTab notesTab) {
        this.mNotesTab = notesTab;
    }
}
