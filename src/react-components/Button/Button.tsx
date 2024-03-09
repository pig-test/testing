import React from "react";
import classes from  "./button.module.css";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }: ButtonProps) => {
    const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
    return (
        <button
            type="button"
            className={[classes["storybook-button"], classes[`storybook-button--${size}`], classes[mode]].join(" ")}
            style={backgroundColor ? { backgroundColor } : undefined}
            {...props}
        >
            {label}
        </button>
    );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Is this the principal call to action on the page?
     */
    primary: boolean;
    /**
     * What background color to use
     */
    backgroundColor: string;
    /**
     * How large should the button be?
     */
    size: "small" | "medium" | "large";
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick: () => void;
}

Button.defaultProps = {
    backgroundColor: null,
    primary: false,
    size: "medium",
    onClick: undefined,
};
