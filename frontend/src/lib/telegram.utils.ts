import { ITelegramUser, IWebApp } from './telegram.types';

// Преобразование строки в ArrayBuffer
const stringToBuffer = (str: string): ArrayBuffer => {
    return new TextEncoder().encode(str);
};

// Создание HMAC-SHA256 с помощью Web Crypto API
const createHmacSha256 = async (key: string, data: string): Promise<string> => {
    const keyBuffer = stringToBuffer(key);
    const dataBuffer = stringToBuffer(data);

    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
    return Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
};

// Проверка подписи Telegram
export const checkSignature = async (initData: string, botToken: string): Promise<boolean> => {
    const searchParams = new URLSearchParams(initData);
    const hashFromTelegram = searchParams.get('hash');

    if (!hashFromTelegram) return false;

    searchParams.delete('hash');
    const searchParamsEntries = Array.from(searchParams.entries()).sort((a, b) =>
        a[0].localeCompare(b[0])
    );

    const dataCheckString = searchParamsEntries
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    const secretKey = await createHmacSha256('WebAppData', botToken);
    const computedHash = await createHmacSha256(secretKey, dataCheckString);

    return computedHash === hashFromTelegram;
};

// Получение данных пользователя
export const getUserData = async (webApp: IWebApp, botToken: string): Promise<ITelegramUser> => {
    const isValid = await checkSignature(webApp.initData, botToken);
    if (!isValid) throw new Error('Ошибка аутентификации Telegram');
    return webApp.initDataUnsafe.user;
};