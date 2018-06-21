package maxeh.androidsdk.masternews;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.util.SparseArray;
import android.view.ViewGroup;


public class MainActivityPagerAdapter extends FragmentStatePagerAdapter {
    private SparseArray<Fragment> registeredFragments = new SparseArray<Fragment>();
    private int mCount;

    public MainActivityPagerAdapter(FragmentManager fm, int count) {
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

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        Fragment fragment = (Fragment) super.instantiateItem(container, position);
        registeredFragments.put(position, fragment);
        return fragment;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        registeredFragments.remove(position);
        super.destroyItem(container, position, object);
    }

    public Fragment getRegisteredFragment(int position) {
        return registeredFragments.get(position);
    }
}