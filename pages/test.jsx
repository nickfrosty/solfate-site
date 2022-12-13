/* eslint-disable @next/next/no-img-element */
import DefaultLayout from "~/layouts/default";

export default function Page() {
  const size = 75;

  const colors = {
    red: {
      100: "#FFF5F5",
      200: "#FFE8E8",
      300: "#FFD3D3",
      400: "#FFC1C1",
      500: "#FFA4A4",
      600: "#FF8D8D",
      700: "#FF7676",
      800: "#FF5C5C",
      900: "#FF3E3E",
    },
    blue: {
      100: "#E6F4FF",
      200: "#BFE8FF",
      300: "#99D1FF",
      400: "#4CB8FF",
      500: "#00A4FF",
      600: "#0090E6",
      700: "#007DCC",
      800: "#0068B2",
      900: "#004E8C",
    },
    green: {
      100: "#E6FFF4",
      200: "#C1FFE8",
      300: "#99FFD1",
      400: "#4DFFB8",
      500: "#00FFA3",
      600: "#00E68F",
      700: "#00CC7A",
      800: "#00B266",
      900: "#00993F",
    },
    purple: {
      100: "#F4E6FF",
      200: "#E8C1FF",
      300: "#D199FF",
      400: "#B84DFF",
      500: "#A300FF",
      600: "#8F00E6",
      700: "#7A00CC",
      800: "#6600B2",
      900: "#3F0099",
    },
    orange: {
      100: "#FFF2D9",
      200: "#FFE2A8",
      300: "#FFD077",
      400: "#FFC04E",
      500: "#FFAF00",
      600: "#E69E00",
      700: "#CC8C00",
      800: "#B27B00",
      900: "#995900",
    },
    yellow: {
      100: "#FFFFD9",
      200: "#FFFFA8",
      300: "#FFFF77",
      400: "#FFFF4E",
      500: "#FFFF00",
      600: "#E6E600",
      700: "#CCCC00",
      800: "#B2B200",
      900: "#999900",
    },
    pink: {
      100: "#FFD9EB",
      200: "#FFA8D0",
      300: "#FF77B4",
      400: "#FF4E98",
      500: "#FF0075",
      600: "#E60068",
      700: "#CC005C",
      800: "#B2004F",
      900: "#990033",
    },
    brown: {
      100: "#E2D9CF",
      200: "#A8B4A1",
      300: "#779075",
      400: "#4E6B49",
      500: "#004720",
      600: "#003F1C",
      700: "#00371A",
      800: "#002F16",
      900: "#00270F",
    },
    primary: {
      1: "#6e61ff",
      2: "#5c53e8",
      3: "#4b45d1",
      4: "#3a37bb",
      5: "#292aa4",
      6: "#181c8d",
      7: "#070e76",
      8: "#000000",
    },
    secondary: {
      1: "#dcf7e7",
      2: "#c9ecdc",
      3: "#b6e1d1",
      4: "#a3d6c6",
      5: "#90cbbb",
      6: "#7dc0b0",
      7: "#6ab5a5",
      8: "#57aaa9",
    },
    tertiary: {
      1: "#ff611e",
      2: "#e85719",
      3: "#d14d14",
      4: "#bb430f",
      5: "#a4390a",
      6: "#8d2f05",
      7: "#762500",
      8: "#5d1b00",
    },
  };

  return (
    <div className="flex">
      {Object.entries(colors).map(([item]) => {
        return (
          <div>
            <p>{item}:</p>
            {Object.entries(colors[item]).map(([shade, color]) => {
              return (
                <div
                  key={shade}
                  style={{
                    backgroundColor: color,
                    width: size,
                    height: size,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
