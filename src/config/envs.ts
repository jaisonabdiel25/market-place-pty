
import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    FIREBASE_AUTH_USER: get('FIREBASE_AUTH_USER').required().asString(),
    FIREBASE_AUTH_PASSWORD: get('FIREBASE_AUTH_PASSWORD').required().asString(),
    WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
}