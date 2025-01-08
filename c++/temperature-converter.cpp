#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <ctime>
using namespace std;

class TemperatureConverter {
private:
    vector<pair<string, string>> conversionHistory;
    const int MAX_HISTORY = 10;

    // Conversion functions
    double celsiusToFahrenheit(double celsius) {
        return (celsius * 9.0/5.0) + 32;
    }

    double celsiusToKelvin(double celsius) {
        return celsius + 273.15;
    }

    double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - 32) * 5.0/9.0;
    }

    double fahrenheitToKelvin(double fahrenheit) {
        return (fahrenheit - 32) * 5.0/9.0 + 273.15;
    }

    double kelvinToCelsius(double kelvin) {
        return kelvin - 273.15;
    }

    double kelvinToFahrenheit(double kelvin) {
        return (kelvin - 273.15) * 9.0/5.0 + 32;
    }

    // Validation function
    bool isValidTemperature(double temp, char unit) {
        switch(unit) {
            case 'K': return temp >= 0; // Kelvin can't be negative
            case 'C': return temp >= -273.15; // Lowest possible Celsius
            case 'F': return temp >= -459.67; // Lowest possible Fahrenheit
            default: return false;
        }
    }

    void displayResult(double value, char fromUnit, char toUnit, double result) {
        cout << fixed << setprecision(2);
        cout << "\nResult: " << value << "° " << fromUnit << " = " 
             << result << "° " << toUnit << endl;
    }

    string getWeatherDescription(double celsius) {
        if (celsius < 0) return "Freezing cold";
        else if (celsius < 10) return "Very cold";
        else if (celsius < 20) return "Cool";
        else if (celsius < 25) return "Comfortable";
        else if (celsius < 30) return "Warm";
        else if (celsius < 35) return "Hot";
        else return "Very hot";
    }

    void addToHistory(string conversion) {
        if (conversionHistory.size() >= MAX_HISTORY) {
            conversionHistory.erase(conversionHistory.begin());
        }
        time_t now = time(0);
        string timestamp = ctime(&now);
        timestamp = timestamp.substr(0, timestamp.length() - 1); // Remove newline
        
        conversionHistory.push_back(make_pair(timestamp, conversion));
    }

public:
    void showAbout() {
        cout << "\n=== About Temperature Converter v1.1 ===" << endl;
        cout << "Developed by: [Cherinet ]" << endl;
        cout << "Last Updated: 2024" << endl;
        cout << "\nFeatures:" << endl;
        cout << "- Convert between Celsius, Fahrenheit, and Kelvin" << endl;
        cout << "- Temperature validation and error checking" << endl;
        cout << "- Common temperature references" << endl;
        cout << "- Weather description" << endl;
        cout << "- Conversion history" << endl;
        cout << "- Temperature analysis" << endl;
        cout << "\nUsage Tips:" << endl;
        cout << "- Use 'C' for Celsius" << endl;
        cout << "- Use 'F' for Fahrenheit" << endl;
        cout << "- Use 'K' for Kelvin" << endl;
        cout << "- Values below absolute zero are not allowed" << endl;
        cout << "\nScientific Facts:" << endl;
        cout << "- Absolute Zero: -273.15°C (-459.67°F, 0K)" << endl;
        cout << "- Water Freezing: 0°C (32°F, 273.15K)" << endl;
        cout << "- Water Boiling: 100°C (212°F, 373.15K)" << endl;
        cout << "================================" << endl;
    }

    void analyzeTemperature() {
        double celsius;
        cout << "\nEnter temperature in Celsius for analysis: ";
        cin >> celsius;

        if (!isValidTemperature(celsius, 'C')) {
            cout << "Invalid temperature!" << endl;
            return;
        }

        cout << "\n=== Temperature Analysis ===" << endl;
        cout << fixed << setprecision(2);
        cout << "Temperature: " << celsius << "°C" << endl;
        cout << "In Fahrenheit: " << celsiusToFahrenheit(celsius) << "°F" << endl;
        cout << "In Kelvin: " << celsiusToKelvin(celsius) << "K" << endl;
        cout << "Weather Description: " << getWeatherDescription(celsius) << endl;

        // Compare with common references
        cout << "\nComparison:" << endl;
        if (celsius <= 0) cout << "- At or below freezing point of water" << endl;
        if (celsius >= 100) cout << "- At or above boiling point of water" << endl;
        if (celsius >= 37 && celsius <= 37.5) cout << "- Close to human body temperature" << endl;
        if (celsius >= 19 && celsius <= 21) cout << "- Around room temperature" << endl;

        // Add to history
        string conversion = to_string(celsius) + "°C Analysis";
        addToHistory(conversion);
    }

    void showConversionHistory() {
        if (conversionHistory.empty()) {
            cout << "\nNo conversion history available." << endl;
            return;
        }

        cout << "\n=== Conversion History ===" << endl;
        for (const auto& entry : conversionHistory) {
            cout << "Time: " << entry.first << endl;
            cout << "Conversion: " << entry.second << endl;
            cout << "-------------------------" << endl;
        }
    }

    void convert() {
        char fromUnit, toUnit;
        double temperature;

        cout << "\nAvailable Temperature Units:" << endl;
        cout << "C - Celsius" << endl;
        cout << "F - Fahrenheit" << endl;
        cout << "K - Kelvin" << endl;

        cout << "\nEnter the unit to convert from (C/F/K): ";
        cin >> fromUnit;
        fromUnit = toupper(fromUnit);

        cout << "Enter the unit to convert to (C/F/K): ";
        cin >> toUnit;
        toUnit = toupper(toUnit);

        cout << "Enter the temperature value: ";
        cin >> temperature;

        // Validate input
        if (!isValidTemperature(temperature, fromUnit)) {
            cout << "\nError: Invalid temperature for the given unit!" << endl;
            cout << "Minimum values: Kelvin: 0K, Celsius: -273.15°C, Fahrenheit: -459.67°F" << endl;
            return;
        }

        // Perform conversion
        double result;
        if (fromUnit == toUnit) {
            result = temperature; // Same unit, no conversion needed
        } else {
            switch (fromUnit) {
                case 'C':
                    result = (toUnit == 'F') ? celsiusToFahrenheit(temperature) 
                                           : celsiusToKelvin(temperature);
                    break;
                case 'F':
                    result = (toUnit == 'C') ? fahrenheitToCelsius(temperature)
                                           : fahrenheitToKelvin(temperature);
                    break;
                case 'K':
                    result = (toUnit == 'C') ? kelvinToCelsius(temperature)
                                           : kelvinToFahrenheit(temperature);
                    break;
                default:
                    cout << "\nError: Invalid unit!" << endl;
                    return;
            }
        }

        // After successful conversion, add to history
        string conversionStr = to_string(temperature) + "° " + fromUnit + 
                             " to " + to_string(result) + "° " + toUnit;
        addToHistory(conversionStr);

        displayResult(temperature, fromUnit, toUnit, result);
        
        // Add weather description for Celsius temperatures
        if (fromUnit == 'C') {
            cout << "Weather: " << getWeatherDescription(temperature) << endl;
        } else if (toUnit == 'C') {
            cout << "Weather: " << getWeatherDescription(result) << endl;
        }

        // Additional information
        if (temperature == 0 && fromUnit == 'C')
            cout << "Note: 0°C is the freezing point of water" << endl;
        else if (temperature == 100 && fromUnit == 'C')
            cout << "Note: 100°C is the boiling point of water at sea level" << endl;
        else if (temperature == 273.15 && fromUnit == 'K')
            cout << "Note: 273.15K is equal to 0°C (freezing point of water)" << endl;
    }

    void showCommonTemperatures() {
        cout << "\n=== Common Temperature References ===" << endl;
        cout << fixed << setprecision(2);
        cout << "Water Freezing Point: 0°C = " << celsiusToFahrenheit(0) << "°F = 273.15K" << endl;
        cout << "Room Temperature: 20°C = " << celsiusToFahrenheit(20) << "°F = " << celsiusToKelvin(20) << "K" << endl;
        cout << "Body Temperature: 37°C = " << celsiusToFahrenheit(37) << "°F = " << celsiusToKelvin(37) << "K" << endl;
        cout << "Water Boiling Point: 100°C = " << celsiusToFahrenheit(100) << "°F = " << celsiusToKelvin(100) << "K" << endl;
        cout << "Absolute Zero: -273.15°C = -459.67°F = 0K" << endl;
    }
};

int main() {
    TemperatureConverter converter;
    int choice;

    cout << "Welcome to Temperature Converter" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Convert Temperature" << endl;
        cout << "2. Show Common Temperature References" << endl;
        cout << "3. Analyze Temperature" << endl;
        cout << "4. View Conversion History" << endl;
        cout << "5. About" << endl;
        cout << "6. Exit" << endl;
        cout << "Enter your choice (1-6): ";
        cin >> choice;

        switch (choice) {
            case 1:
                converter.convert();
                break;
            case 2:
                converter.showCommonTemperatures();
                break;
            case 3:
                converter.analyzeTemperature();
                break;
            case 4:
                converter.showConversionHistory();
                break;
            case 5:
                converter.showAbout();
                break;
            case 6:
                cout << "\nThank you for using Temperature Converter!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
} 