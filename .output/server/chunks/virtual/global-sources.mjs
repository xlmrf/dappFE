const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/analytics/all",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/analytics/all"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/analytics/all"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/analytics/all"
                    }
                ]
            },
            {
                "loc": "/ru/analytics/all",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/analytics/all"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/analytics/all"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/analytics/all"
                    }
                ]
            },
            {
                "loc": "/analytics",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/analytics"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/analytics"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/analytics"
                    }
                ]
            },
            {
                "loc": "/ru/analytics",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/analytics"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/analytics"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/analytics"
                    }
                ]
            },
            {
                "loc": "/analytics/recommended",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/analytics/recommended"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/analytics/recommended"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/analytics/recommended"
                    }
                ]
            },
            {
                "loc": "/ru/analytics/recommended",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/analytics/recommended"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/analytics/recommended"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/analytics/recommended"
                    }
                ]
            },
            {
                "loc": "/dashboard",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/dashboard"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/dashboard"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/dashboard"
                    }
                ]
            },
            {
                "loc": "/ru/dashboard",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/dashboard"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/dashboard"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/dashboard"
                    }
                ]
            },
            {
                "loc": "/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/ru",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/news",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/news"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/news"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/news"
                    }
                ]
            },
            {
                "loc": "/ru/news",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/news"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/news"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/news"
                    }
                ]
            },
            {
                "loc": "/privacy-policy",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/privacy-policy"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/privacy-policy"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/privacy-policy"
                    }
                ]
            },
            {
                "loc": "/ru/privacy-policy",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/privacy-policy"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/privacy-policy"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/privacy-policy"
                    }
                ]
            },
            {
                "loc": "/ranking",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/ranking"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/ranking"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/ranking"
                    }
                ]
            },
            {
                "loc": "/ru/ranking",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/ranking"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/ranking"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/ranking"
                    }
                ]
            },
            {
                "loc": "/settings/account-security",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/settings/account-security"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/settings/account-security"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/settings/account-security"
                    }
                ]
            },
            {
                "loc": "/ru/settings/account-security",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/settings/account-security"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/settings/account-security"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/settings/account-security"
                    }
                ]
            },
            {
                "loc": "/settings",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/settings"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/settings"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/settings"
                    }
                ]
            },
            {
                "loc": "/ru/settings",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/settings"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/settings"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/settings"
                    }
                ]
            },
            {
                "loc": "/terms-conditions",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/terms-conditions"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/terms-conditions"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/terms-conditions"
                    }
                ]
            },
            {
                "loc": "/ru/terms-conditions",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/terms-conditions"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/terms-conditions"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/terms-conditions"
                    }
                ]
            },
            {
                "loc": "/sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/index-sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/en-sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/ru-sitemap.xml",
                "_sitemap": "en"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
