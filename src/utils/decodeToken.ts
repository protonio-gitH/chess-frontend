import { jwtDecode } from 'jwt-decode';
import { DecodeTokenReturn, JWTDecodePayload } from '../types';

export function decodeToken(token: string): DecodeTokenReturn | null {
	try {
		const decoded = jwtDecode<JWTDecodePayload>(token);
		return {
			email: decoded.email,
			roles: decoded.roles.map(role => role.description),
			userId: decoded.id,
			exp: decoded.exp,
		};
	} catch (e) {
		console.error('Failed to decode token:', e);
		return null;
	}
}
