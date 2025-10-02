import math
import tkinter as tk
from tkinter import filedialog

import fiona
from shapely.geometry import shape


def compute_angle(line):
    """Compute rotation angle in degrees for a line geometry."""
    if line.geom_type == "LineString":
        coords = list(line.coords)
    elif line.geom_type == "MultiLineString":
        coords = list(line.geoms[0].coords)
    else:
        return None

    x1, y1 = coords[0]
    x2, y2 = coords[-1]
    angle_rad = math.atan2(y2 - y1, x2 - x1)
    angle_deg = math.degrees(angle_rad)
    return angle_deg


def main():
    root = tk.Tk()
    root.withdraw()
    file_path = filedialog.askopenfilename(
        title="Select line layer",
        filetypes=[("Shapefile", "*.shp"), ("All files", "*.*")],
    )

    if not file_path:
        print("No file selected.")
        return

    print(f"Selected file: {file_path}")

    with fiona.open(file_path) as src:
        for feature in src:
            geom = shape(feature["geometry"])
            angle = compute_angle(geom)
            if angle is not None:
                print(f"Feature {feature['id']} angle: {angle:.2f} degrees")
            else:
                print(f"Feature {feature['id']} is not a line geometry")


if __name__ == "__main__":
    main()
