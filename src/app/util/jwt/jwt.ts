import jwt from 'jwt-decode';
import {TokenBody} from './TokenBody';

export async function decode(token: string): Promise<TokenBody | null> {
    try {
        const decoded: TokenBody = await jwt(token);
        return {
            exp: decoded.exp,
            // @ts-ignore
            username: decoded.sub
        };
    } catch (e) {
        return null;
    }
}
