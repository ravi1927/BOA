const CONFIG = {
    API_URL: process.env.REACT_APP_API_URL || "api",
    CONTEXT_ROOT: process.env.REACT_APP_CONTEXT_ROOT || undefined,
}

export const getConfig = (key) => CONFIG[key];
