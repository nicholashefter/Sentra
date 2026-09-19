import re

# ============================================================
# KEYWORD BANKS
# ============================================================

URGENCY_KEYWORDS = [
    "urgent", "immediately", "action required", "verify your account",
    "suspended", "expire", "right away", "asap", "final notice",
    "your account will be closed", "act now"
]

CREDENTIAL_KEYWORDS = [
    "password", "login", "log in", "username", "ssn", "social security",
    "credit card", "bank account", "pin number", "verify your identity",
    "confirm your password"
]

IMPERSONATION_KEYWORDS = [
    "paypal", "microsoft", "apple support", "amazon", "irs",
    "bank of america", "wells fargo", "netflix", "google security"
]

SUSPICIOUS_TLDS = [".ru", ".tk", ".xyz", ".top", ".click", ".info", ".zip"]

URL_REGEX = re.compile(r"https?://[^\s]+", re.IGNORECASE)


def find_urls(message: str):
    return URL_REGEX.findall(message)


def check_suspicious_urls(urls):
    flagged = []
    ip_pattern = re.compile(r"https?://\d{1,3}(\.\d{1,3}){3}")
    for url in urls:
        lowered = url.lower()
        if any(lowered.rstrip("/").endswith(tld) or tld + "/" in lowered for tld in SUSPICIOUS_TLDS):
            flagged.append(url)
        elif ip_pattern.match(url):
            flagged.append(url)
    return flagged


def check_keywords(message: str, keyword_list):
    lowered = message.lower()
    return [kw for kw in keyword_list if kw in lowered]


def check_typosquatting(message: str):
    typo_pattern = re.compile(
        r"\b(?:paypa1|micros0ft|amaz0n|g00gle|app1e|netfl1x|bankofamerica-secure)\b",
        re.IGNORECASE
    )
    return typo_pattern.findall(message)


def calculate_risk_score(findings: dict) -> int:
    score = 0
    score += min(len(findings["suspicious_urls"]), 3) * 15
    score += min(len(findings["urgency_flags"]), 3) * 10
    score += min(len(findings["credential_flags"]), 3) * 15
    score += min(len(findings["impersonation_flags"]), 3) * 10
    score += min(len(findings["typosquatting_flags"]), 3) * 20
    return min(score, 100)


def score_to_label(score: int) -> str:
    if score >= 60:
        return "HIGH"
    elif score >= 30:
        return "MEDIUM"
    elif score > 0:
        return "LOW"
    return "SAFE"


def analyze_message(message: str) -> dict:
    urls = find_urls(message)

    findings = {
        "urls_found": urls,
        "suspicious_urls": check_suspicious_urls(urls),
        "urgency_flags": check_keywords(message, URGENCY_KEYWORDS),
        "credential_flags": check_keywords(message, CREDENTIAL_KEYWORDS),
        "impersonation_flags": check_keywords(message, IMPERSONATION_KEYWORDS),
        "typosquatting_flags": check_typosquatting(message),
    }

    risk_score = calculate_risk_score(findings)
    risk_label = score_to_label(risk_score)

    return {
        "risk_score": risk_score,
        "risk_label": risk_label,
        "details": findings,
    }