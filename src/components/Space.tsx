/**
 * Utility to provide spce between cmoponents (vertical or horizontal)
 */
export const Space = ({ width, height }: { width?: string; height?: string }): JSX.Element => (
    <div style={{ width, height }} />
);
