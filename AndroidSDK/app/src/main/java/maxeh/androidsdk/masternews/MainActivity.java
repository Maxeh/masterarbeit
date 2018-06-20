package maxeh.androidsdk.masternews;

import android.content.Intent;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.view.ViewPager;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.design.widget.TabLayout;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;


public class MainActivity extends AppCompatActivity {
    private PagerAdapter mPagerAdapter;
    private ViewPager mViewPager;
    private DrawerLayout mDrawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ActionBar actionbar = getSupportActionBar();
        if (actionbar != null) {
            actionbar.setElevation(0);
            actionbar.setDisplayHomeAsUpEnabled(true);
            actionbar.setHomeAsUpIndicator(R.drawable.ic_menu);
        }

        mDrawerLayout = findViewById(R.id.drawer_layout);
        final NavigationView navigationView = findViewById(R.id.nav_view);
        navigationView.setCheckedItem(R.id.menu_news);
        navigationView.setNavigationItemSelectedListener(
                new NavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(MenuItem menuItem) {
                        switch (menuItem.getItemId()) {
                            case R.id.menu_news:
                                mViewPager.setCurrentItem(0);
                                break;
                            case R.id.menu_weather:
                                mViewPager.setCurrentItem(1);
                                break;
                            case R.id.menu_notes:
                                mViewPager.setCurrentItem(2);
                                break;
                            case R.id.menu_settings:
                                Intent myIntent = new Intent(MainActivity.this, SettingsActivity.class);
                                startActivity(myIntent);
                                break;
                            case R.id.menu_info:
                                Intent myIntent2 = new Intent(MainActivity.this, InfoActivity.class);
                                startActivity(myIntent2);
                                break;
                        }
                        mDrawerLayout.closeDrawers();
                        return true;
                    }
                }
        );

        mPagerAdapter = new PagerAdapter(getSupportFragmentManager(), 3);
        mViewPager = findViewById(R.id.pager);
        mViewPager.setAdapter(mPagerAdapter);
        mViewPager.setOffscreenPageLimit(3);

        TabLayout tabLayout = findViewById(R.id.tabLayout);
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                switch(tab.getPosition()) {
                    case 0:
                        navigationView.setCheckedItem(R.id.menu_news);
                        break;
                    case 1:
                        navigationView.setCheckedItem(R.id.menu_weather);
                        break;
                    case 2:
                        navigationView.setCheckedItem(R.id.menu_notes);
                        break;
                }
            }
            @Override
            public void onTabUnselected(TabLayout.Tab tab) {}
            @Override
            public void onTabReselected(TabLayout.Tab tab) {}
        });

        tabLayout.addTab(tabLayout.newTab());
        tabLayout.addTab(tabLayout.newTab());
        tabLayout.addTab(tabLayout.newTab());
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                mDrawerLayout.openDrawer(GravityCompat.START);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}