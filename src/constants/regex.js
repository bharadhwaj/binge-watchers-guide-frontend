export const USERNAME = /^[a-z][a-z'-_.]{2,}$/i;
export const USERNAME_TYPING = /^[a-z][a-z'-_.]*$/i;

// eslint-disable-next-line  no-useless-escape
export const URL = /((?:https?:\/\/)?(?:(?:\w|\d)+(?:\.(?:\w|\d){2,})+)+(?:(?:\/(?!.+))|(?:\/[a-zA-Z0-9?+#&=\.\-%_]+))*)/gi;
// eslint-disable-next-line  no-useless-escape
export const URL_WITH_HTTP = /((?:https?:\/\/)(?:(?:\w|\d)+(?:\.(?:\w|\d){2,})+)+(?:(?:\/(?!.+))|(?:\/[a-zA-Z0-9?+#&=\.\-%_]+))*)/gi;
