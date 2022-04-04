/* eslint-disable max-classes-per-file */
export class LoginError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'LoginError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, LoginError.prototype);
    }
}
export class TokenContractInitialisationError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'TokenContractInitialisationError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, TokenContractInitialisationError.prototype);
    }
}
export class TokenPurchaseError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'TokenPurchaseError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, TokenPurchaseError.prototype);
    }
}
export class RecordNotFoundError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'RecordNotFoundError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, RecordNotFoundError.prototype);
    }
}
export class FileTooLargeError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'FileTooLargeError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, FileTooLargeError.prototype);
    }
}
