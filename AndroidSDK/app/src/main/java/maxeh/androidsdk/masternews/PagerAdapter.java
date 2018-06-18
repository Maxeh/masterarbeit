package maxeh.androidsdk.masternews;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;


public class PagerAdapter extends FragmentStatePagerAdapter {
    private int mCount;

    public PagerAdapter(FragmentManager fm, int count) {
        super(fm);
        this.mCount = count;
    }

    @Override
    public Fragment getItem(int i) {
        Fragment fragment = null;
        switch (i) {
            case 0: fragment = new NewsTab(); break;
            case 1: fragment = new WeatherTab(); break;
            case 2: fragment = new NotesTab(); break;
        }
        return fragment;
    }

    @Override
    public int getCount() {
        return mCount;
    }

    @Override
    public CharSequence getPageTitle(int i) {
        String title = "";
        switch (i) {
            case 0: title = "News"; break;
            case 1: title = "Wetter"; break;
            case 2: title = "Notizen"; break;
        }
        return title;
    }
}