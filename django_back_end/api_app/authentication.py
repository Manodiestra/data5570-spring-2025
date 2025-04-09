import json
import requests
from jose import jwt
from jose.exceptions import JWTError, ExpiredSignatureError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import os

COGNITO_REGION = os.environ.get('COGNITO_REGION')
USER_POOL_ID = os.environ.get('COGNITO_USER_POOL_ID')
APP_CLIENT_ID = os.environ.get('COGNITO_APP_CLIENT_ID')

JWKS_URL = f'https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{USER_POOL_ID}/.well-known/jwks.json'


class CognitoUser:
    def __init__(self, claims):
        self.claims = claims
        self.username = claims.get("email") or claims.get("cognito:username")
        self.sub = claims.get("sub")

    @property
    def is_authenticated(self):
        return True

    def __str__(self):
        return self.username or self.sub or "CognitoUser"

class CognitoJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        print('ENV VARS', COGNITO_REGION, USER_POOL_ID, APP_CLIENT_ID)
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token = auth_header.split(' ')[1]

        try:
            jwks = requests.get(JWKS_URL).json()
            headers = jwt.get_unverified_header(token)
            key = next((k for k in jwks['keys'] if k['kid'] == headers['kid']), None)
            if not key:
                raise AuthenticationFailed('Public key not found.')

            payload = jwt.decode(
                token,
                key,
                algorithms=['RS256'],
                audience=APP_CLIENT_ID,
                issuer=f'https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{USER_POOL_ID}',
            )

            return (CognitoUser(payload), None)

        except ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except JWTError as e:
            raise AuthenticationFailed(f'JWT error: {str(e)}')
