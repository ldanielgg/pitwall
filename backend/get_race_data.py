import fastf1
import json

fastf1.Cache.enable_cache(".fastf1_cache")

session = fastf1.get_session(2026, "Mexico City Grand Prix", "R")
session.load()

laps = session.laps

top_drivers = ["ANT", "HAM", "VER"]

chart_data = {}

for driver in top_drivers:
    driver_laps = laps.pick_drivers(driver)
    driver_laps["LapTime"] = driver_laps["LapTime"].dt.total_seconds()
    driver_laps["LapTime"] = driver_laps["LapTime"].astype(object).where(
        driver_laps["LapTime"].notna(), None
    )

    lap_numbers = driver_laps["LapNumber"].tolist()
    lap_times = driver_laps["LapTime"].tolist()

    chart_data[driver] = {
        "lapNumbers": lap_numbers,
        "lapTimes": lap_times
    }
    # print(driver_laps[["Driver", "LapNumber", "LapTime"]].head())

with open("race_data.json", "w") as file:
    json.dump(chart_data, file, indent=4, allow_nan=False)