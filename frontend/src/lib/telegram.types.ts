export interface ITelegramUser {
    id: number;
    first_name: string;
    last_name?: string; // Опционально, не у всех есть фамилия
    username?: string;
    language_code?: string;
}

export interface IWebApp {
    initData: string;
    initDataUnsafe: {
        query_id: string;
        user: ITelegramUser;
        auth_date: string;
        hash: string;
    };
    version: string;
    platform: string;
    colorScheme: string;
    themeParams: {
        link_color: string;
        button_color: string;
        button_text_color: string;
        secondary_bg_color: string;
        hint_color: string;
        bg_color: string;
        text_color: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    isClosingConfirmationEnabled: boolean;
    headerColor: string;
    backgroundColor: string;
    BackButton: {
        isVisible: boolean;
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
    };
    MainButton: {
        text: string;
        color: string;
        textColor: string;
        isVisible: boolean;
        isProgressVisible: boolean;
        isActive: boolean;
        setText: (text: string) => void;
        show: () => void;
        hide: () => void;
        enable: () => void;
        disable: () => void;
        onClick: (callback: () => void) => void;
    };
    HapticFeedback: any;
    openTelegramLink: (url: string) => void;
    ready: () => void;
    expand: () => void;
    close: () => void;
    showAlert: (message: string) => void;
}

declare global {
    interface Window {
        Telegram: {
            WebApp: IWebApp;
        };
    }
}