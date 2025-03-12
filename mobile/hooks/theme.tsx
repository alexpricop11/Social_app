import {useTheme} from "@/hooks/UseColorScheme";

export const useThemeStyles = () => {
    const {isDarkMode} = useTheme();

    return {
        isDarkMode,
        colors: {
            background: isDarkMode ? "#000" : "#fff",
            text: isDarkMode ? "#fff" : "#000",
            tabBarBackground: isDarkMode ? "black" : "white",
            tabBarActive: isDarkMode ? "white" : "black",
            placeholderTextColor: isDarkMode ? "white" : "black",
            borderColor: isDarkMode ? "white" : "black",
            tabText: isDarkMode ? "white" : "black",
            tabBarInactive: isDarkMode ? "#ccc" : "#666",
        },
    };
};
