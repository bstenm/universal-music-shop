import { getErrorMessage } from 'libs/getErrorMessage';
import { DEV_MODE, PROD_MODE, SHOW_RENDERED } from 'config/constants';

/* eslint no-console: 0 */
export const log = {
    info(...args: unknown[]): void {
        console.info('[INFO] >', ...args);
    },
    error(e: unknown): void {
        const { message, code } = getErrorMessage(e);
        console.error('[ERROR] >', message, code);
    },
    rawError(...args: unknown[]): void {
        console.error('[ERROR] >', ...args);
    },
    debug(...args: unknown[]): void {
        if (DEV_MODE) {
            console.debug('[DEBUG] >', ...args);
        }
    },
    render(...args: unknown[]): void {
        if (!PROD_MODE && SHOW_RENDERED) {
            console.debug('[RENDERED] >', ...args);
        }
    }
};
