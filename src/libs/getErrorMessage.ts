type ErrorWithMessage = {
    code?: number;
    message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    );
}

export const getErrorMessage = (maybeError: unknown): ErrorWithMessage => {
    // if (typeof maybeError === 'object' && maybeError !== null) {
    //     // eslint-disable-next-line no-restricted-syntax
    //     for (const [key, value] of Object.entries(maybeError)) {
    //         console.log(`${key}: ${value}`);
    //     }
    // }

    if (isErrorWithMessage(maybeError)) return maybeError;

    try {
        const parsedError = JSON.parse(maybeError as string);
        if (isErrorWithMessage(parsedError)) return parsedError;
    } catch (e) {
        // silent error
    }

    try {
        return new Error(JSON.stringify(maybeError));
    } catch {
        // fallback in case there's an error stringifying the maybeError
        // like with circular references for example.
        return new Error(String(maybeError));
    }
};
