"""
Backend Module 1: Password Strength Checker
Evaluates password strength based on length, character complexity, and security rules.
"""

import string


def check_password_strength(password: str) -> dict:
    """
    Evaluates password strength and returns a detailed analysis dictionary.
    """
    score = 0
    checks = {
        "length": False,
        "uppercase": False,
        "lowercase": False,
        "number": False,
        "special": False
    }

    # 1. Check length (>= 8 characters)
    if len(password) >= 8:
        checks["length"] = True
        score += 1

    # 2. Check for uppercase letters
    for char in password:
        if char.isupper():
            checks["uppercase"] = True
            score += 1
            break

    # 3. Check for lowercase letters
    for char in password:
        if char.islower():
            checks["lowercase"] = True
            score += 1
            break

    # 4. Check for numbers
    for char in password:
        if char.isdigit():
            checks["number"] = True
            score += 1
            break

    # 5. Check for special characters
    special_characters = string.punctuation
    for char in password:
        if char in special_characters:
            checks["special"] = True
            score += 1
            break

    # Determine rating
    if score <= 2:
        rating = "Weak"
    elif score <= 4:
        rating = "Medium"
    else:
        rating = "Strong"

    # Build recommendations
    suggestions = []
    if not checks["length"]:
        suggestions.append("Make the password at least 8 characters long.")
    if not checks["uppercase"]:
        suggestions.append("Add uppercase letters (A-Z).")
    if not checks["lowercase"]:
        suggestions.append("Add lowercase letters (a-z).")
    if not checks["number"]:
        suggestions.append("Add numbers (0-9).")
    if not checks["special"]:
        suggestions.append("Add special characters (!@#$%^&* etc.).")

    return {
        "score": score,
        "rating": rating,
        "checks": checks,
        "suggestions": suggestions
    }
