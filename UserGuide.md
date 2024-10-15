## User Guide for Race Car Data Processing App

This app helps you analyze race car sensor data and identify specific conditions based on Channel values. Follow these instructions to navigate the app efficiently.

### Landing Page: Upload Menu

#### Upload Data Files

- When you first open the app, you’ll land on the Upload Menu.
- Click the “Upload File” button.
- Select either `practice.dat` or `qualifying.dat` from your local storage.
- A success message will appear once the file is uploaded.
- **Note:** Make sure to use the “Clear Data” button on the Dashboard Menu before uploading a new data file. This ensures that time and channel data, which are used as primary keys, are cleared.

### Dashboard Menu: Data Visualization and Analysis

#### View and Analyze Data

- Navigate to the Dashboard Menu.
- You will see three different charts representing the following conditions:
  - **Condition 1:** Channel 2 < -0.5
  - **Condition 2:** Channel 7 < 0
  - **Condition 3:** Both conditions are satisfied simultaneously.

#### Chart Interactions

- Each chart visually represents the data points where the conditions are met.
- Hover over the points to see exact times and values.
- Use the charts to understand trends and critical data points.

#### Clear Data

- At the bottom of the Dashboard Menu, you will find the “Clear Data” button.
- Click this button to clear the current data before uploading a new data file.
- This is important because the time and channel are used as primary keys in the application.

### Timing Menu: Condition Satisfaction Times

#### Determine Condition Satisfaction Times

- Navigate to the Timing Menu.
- The app analyzes when the following conditions are first satisfied:
  - **Condition 1:** Channel 2 < -0.5
  - **Condition 2:** Channel 7 < 0
  - **Condition 3:** Both conditions are satisfied at the same time.
- The exact times these conditions are met will be displayed.
