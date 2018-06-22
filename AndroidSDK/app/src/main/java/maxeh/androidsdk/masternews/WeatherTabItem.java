package maxeh.androidsdk.masternews;

import java.util.ArrayList;
import java.util.List;

public class WeatherTabItem {
    public class WeatherDetails {
        private String dateText;
        private String temp;
        private String icon;

        public WeatherDetails(String dateText, String temp, String icon) {
            this.dateText = dateText;
            this.temp = temp;
            this.icon = icon;
        }

        public String getDateText() {
            return dateText;
        }

        public String getTemp() {
            return temp;
        }

        public String getIcon() {
            return icon;
        }
    }

    private String cityName;
    private List<WeatherDetails> weatherDetailList = new ArrayList<>();

    public WeatherTabItem(String cityName) {
        this.cityName = cityName;
    }

    public void addWeatherDetails(String dateText, String temp, String icon) {
        WeatherDetails weatherDetails = new WeatherDetails(dateText, temp, icon);
        weatherDetailList.add(weatherDetails);
    }

    public String getCityName() {
        return cityName;
    }

    public WeatherDetails getWeatherDetails(int index) {
        return weatherDetailList.get(index);
    }
}
