# Auto-fill Verification Field

This is a simple script that auto-fills the verification field.

## Supported Sites

- [x] [GitHub](https://github.com) - delete repository

## Installation

1. Install a user script manager like [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).
2. Click [here](https://github.com/DeepChirp/Auto-fill-Verification-Field/raw/main/index.user.js) to install the script directly from the web.

## Usage

1. Open a supported site (e.g., GitHub repository settings page).
2. The script will automatically detect and fill the verification field.

## Configuration

You can add more supported sites and field selectors by modifying the `loadConfig` function in [index.user.js](index.user.js).

```js
async function loadConfig() {
    const localConfig = {
        "github.com": {
            "paths": [/\/.*\/.*\/settings/],
            "fields": [
                {
                    "selector": "#verification_field",
                    "value": () => {
                        const el = document.querySelector("#verification_field");
                        return el?.dataset.repoNwo || '';
                    }
                }
            ]
        },
    };

    return localConfig;
}
```

## Screenshots

![GitHub](https://github.com/user-attachments/assets/50c3f9d7-ae39-49f4-ac8f-81308631aac7)
