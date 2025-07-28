import React from "react";
import DefaultText from "./DefaultText";
import { colors } from "../../../assets/colors";

export default function FredokaText({
    color = colors.text,
    size = 14,
    fontFamily = 'Fredoka',
    fontWeight = 400,
    style,
    children,
    ...restProps
}) {

    const textStyle = {
        color,
        fontSize: size,
        fontFamily,
        fontWeight,
        alignItems: 'flex-end',
        display: 'flex',
        ...style,
    };

    return (
        <DefaultText style={textStyle} size={size} {...restProps}>
            {children}
        </DefaultText>
    );
}
