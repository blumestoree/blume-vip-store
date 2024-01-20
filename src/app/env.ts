import { z } from 'zod'
// import * as z from 'zod';

const envSchema = z.object({
	SERVER_PORT: z.string(),
	AWS_DEFAULT_REGION: z.string(),
	AWS_ACCESSKEY: z.string(),
	AWS_SECRETKEY: z.string(),
	AWS_BUCKETNAME: z.string(),
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_DB: z.string(),
	POSTGRES_PORT: z.string(),
	DATABASE_URL: z.string().url(),
	GAME_URL: z.string().url(),
	API_PAGARME_ENDPOINT: z.string().url(),
	API_KEY_PAGARME: z.string(),
	EMAIL_HOST: z.string(),
	EMAIL_USER: z.string(),
	EMAIL_PASS: z.string(),
	JWT_TOKEN: z.string(),
	TOKEN_EXPIRE_TIME: z.string(),
	REFRESH_TOKEN_EXPIRE_TIME_MINUTES: z.string(),
})

export const env = envSchema.parse(process.env)