import jwt
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.settings import api_settings


def decode_jwt_token(token):
    try:
        UntypedToken(token)        
        decoded_token = jwt.decode(token, api_settings.SIGNING_KEY, algorithms=[api_settings.ALGORITHM])
        return decoded_token
    except (InvalidToken, TokenError) as e:
        raise InvalidToken(f"Invalid token: {e}")