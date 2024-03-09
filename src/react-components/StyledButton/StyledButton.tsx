import React from "react";
import styled from "styled-components";

const Button = styled.button<ButtonProps>`
    font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 700;
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    color: ${({ $primary }) => ($primary ? "white" : "#333")};
    background-color: ${({ $primary }) => ($primary ? "#1ea7fd" : "transparent")};
    box-shadow: ${({ $primary }) => ($primary ? undefined : "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset")};
    font-size: ${({ $size }) => ($size === "small" ? "12px" : $size === "medium" ? "14px" : "16px")};
    padding: ${({ $size }) => ($size === "small" ? "10px 16px" : $size === "medium" ? "11px 20px" : "12px 24px")};
`;

export const StyledButton = ({ $primary, $backgroundColor, $size, $label, ...props }: ButtonProps) => {
    return (
        <Button $primary={$primary} $backgroundColor={$backgroundColor} $size={$size} {...props}>
            {$label}
        </Button>
    );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Is this the principal call to action on the page?
     */
    $primary: boolean;
    /**
     * What background color to use
     */
    $backgroundColor?: string;
    /**
     * How large should the button be?
     */
    $size: "small" | "medium" | "large";
    /**
     * Button contents
     */
    $label?: string;
    /**
     * Optional click handler
     */
    onClick: () => void;
}

StyledButton.defaultProps = {
    $primary: false,
    $size: "medium",
    onClick: undefined,
};
