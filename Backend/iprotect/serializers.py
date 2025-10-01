from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

User = get_user_model()

class SecurityCompanyLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user and user.is_active and user.is_security_company:
            data['user'] = user
            return data
        raise serializers.ValidationError("Invalid login credentials or not a security company.")
