package maxeh.androidsdk.masternews;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class NotesTabItem {
    private String text;
    private String date;

    public NotesTabItem(String text) {
        this.text = text;
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy - HH:mm", Locale.GERMAN);
        this.date = df.format(new Date());
    }

    public String getText() {
        return text;
    }

    public String getDate() {
        return date;
    }
}
