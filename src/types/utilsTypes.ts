export interface DecodeTokenReturn {
	email: string;
	roles: string[];
	userId: number;
	exp: number;
}

export interface JWTDecodePayload {
	email: string;
	exp: number;
	iat: number;
	id: number;
	roles: {
		id: number;
		value: string;
		description: string;
		createdAt: string;
		updatedAt: string;
	}[];
}
