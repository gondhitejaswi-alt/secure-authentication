"""
Backend Module 3: Secure Password Generator
Generates cryptographically secure passwords using Python's secrets module.
"""

import secrets
import string
from password_strength import check_password_strength


def generate_secure_password(length: int, use_upper: bool, use_lower: bool, use_digits: bool, use_special: bool) -> tuple:
    """
    Generates a password using secrets module, ensuring inclusion of all selected pools.
    Returns (password, error_message, strength_info).
    """
    categories = []

    if use_upper:
        categories.append(string.ascii_uppercase)
    if use_lower:
        categories.append(string.ascii_lowercase)
    if use_digits:
        categories.append(string.digits)
    if use_special:
        categories.append(string.punctuation)

    # 1. Validation: No category selected
    if not categories:
        return None, "You must select at least one character type.", None

    # 2. Validation: Length smaller than number of selected pools
    num_selected = len(categories)
    if length < num_selected:
        return None, f"Password length ({length}) is too short for the {num_selected} selected character categories. Minimum length required is {num_selected}.", None

    # Guarantee at least one character from every selected category
    password_chars = []
    for pool in categories:
        password_chars.append(secrets.choice(pool))

    # Combine pools to fill remaining slots
    combined_pool = "".join(categories)
    remaining_length = length - len(password_chars)

    for _ in range(remaining_length):
        password_chars.append(secrets.choice(combined_pool))

    # Cryptographically secure random shuffle
    secrets.SystemRandom().shuffle(password_chars)

    generated_password = "".join(password_chars)
    strength_info = check_password_strength(generated_password)

    return generated_password, None, strength_info
